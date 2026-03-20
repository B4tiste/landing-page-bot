import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  CategoryScale,
  Tooltip,
  Filler,
  Legend,
  ChartConfiguration,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  CategoryScale,
  Tooltip,
  Filler,
  Legend
);

type ChartMode = "weekly" | "overall";

interface DataPoint {
  date: string;
  count: number;
}

@Component({
  selector: "app-analytics",
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <section class="section bg-gradient-to-b from-dark-900 to-dark-800 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <!-- Header -->
        <div class="text-center mb-16 animate-fade-in-down">
          <h2 class="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
            Usage
            <span class="text-gradient">Analytics</span>
          </h2>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Command activity over time, powered by live API data
          </p>
        </div>

        <div class="card">
          <!-- Card header: mode toggle + meta -->
          <div class="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
            <div class="flex items-center gap-3">
              <mat-icon class="text-primary-400" style="font-size:24px;width:24px;height:24px;">insert_chart</mat-icon>
              <h3 class="text-xl font-display font-bold">Commands Over Time</h3>
            </div>
            <!-- Mode toggle -->
            <div class="sm:ml-auto glass-dark rounded-xl p-1 flex gap-1 self-start sm:self-auto">
              <button
                *ngFor="let m of modes"
                (click)="setMode(m.key)"
                class="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
                [ngClass]="mode === m.key
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'"
              >
                {{ m.label }}
              </button>
            </div>
          </div>

          <!-- Loading -->
          <div *ngIf="loading" class="flex justify-center items-center py-20">
            <div class="w-10 h-10 rounded-full border-4 border-primary-500 border-t-transparent animate-spin"></div>
          </div>

          <!-- Error -->
          <div *ngIf="error && !loading" class="text-center py-16 text-gray-400">
            <mat-icon class="text-5xl mb-4 text-red-400" style="font-size:48px;width:48px;height:48px;">error_outline</mat-icon>
            <p class="text-lg">Failed to load analytics data. Please try again later.</p>
          </div>

          <!-- Chart -->
          <div *ngIf="!loading && !error" class="relative" style="height: 360px;">
            <canvas #chartCanvas></canvas>
          </div>

          <!-- Legend row -->
          <div *ngIf="!loading && !error" class="flex flex-wrap gap-6 mt-6 pt-6 border-t border-white/10 text-sm text-gray-400">
            <div class="flex items-center gap-2">
              <span class="inline-block w-8 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded"></span>
              <span>{{ mode === 'weekly' ? 'Commands per week (all time)' : 'Cumulative total commands (daily)' }}</span>
            </div>
            <div *ngIf="peakLabel" class="ml-auto flex items-center gap-1">
              <mat-icon class="text-yellow-400" style="font-size:16px;width:16px;height:16px;">star</mat-icon>
              <span>Peak: <strong class="text-white">{{ peakLabel }}</strong></span>
            </div>
          </div>
        </div>

        <p class="text-center text-xs text-gray-600 mt-8">Data refreshes every 60 seconds</p>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
  `],
})
export class AnalyticsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("chartCanvas") chartCanvas!: ElementRef<HTMLCanvasElement>;

  mode: ChartMode = "weekly";
  loading = true;
  error = false;
  peakLabel = "";

  modes: { key: ChartMode; label: string }[] = [
    { key: "weekly", label: "Weekly" },
    { key: "overall", label: "Overall" },
  ];

  private rawDaily: DataPoint[] = [];
  private rawWeekly: DataPoint[] = [];
  private chart?: Chart;
  private intervalId?: number;

  ngOnInit(): void {
    this.fetchData();
    this.intervalId = window.setInterval(() => this.fetchData(), 60000);
  }

  ngAfterViewInit(): void {
    // chart is created after data loads
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
    this.chart?.destroy();
  }

  setMode(m: ChartMode): void {
    this.mode = m;
    this.renderChart();
  }

  private async fetchData(): Promise<void> {
    this.error = false;
    if (!this.rawDaily.length && !this.rawWeekly.length) this.loading = true;
    try {
      const [dayRes, weekRes] = await Promise.all([
        fetch("https://api-mongo-swbox.fly.dev/logs/stats/commands-over-time?granularity=day"),
        fetch("https://api-mongo-swbox.fly.dev/logs/stats/commands-over-time?granularity=week"),
      ]);
      if (!dayRes.ok || !weekRes.ok) { this.error = true; return; }
      const [dayJson, weekJson] = await Promise.all([dayRes.json(), weekRes.json()]);
      this.rawDaily = (dayJson as any)?.data ?? [];
      this.rawWeekly = (weekJson as any)?.data ?? [];
    } catch {
      this.error = true;
      return;
    } finally {
      this.loading = false;
    }
    this.renderChart();
  }

  private renderChart(): void {
    if (!this.chartCanvas?.nativeElement || !this.rawDaily.length) return;

    const { labels, values } = this.buildSeries();

    if (this.chart) {
      this.chart.data.labels = labels;
      this.chart.data.datasets[0].data = values;
      this.chart.update();
      this.computePeak(labels, values);
      return;
    }

    const ctx = this.chartCanvas.nativeElement.getContext("2d")!;

    // Gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, 360);
    gradient.addColorStop(0, "rgba(14,165,233,0.35)");
    gradient.addColorStop(1, "rgba(217,70,239,0.0)");

    const config: ChartConfiguration<"line"> = {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Commands",
            data: values,
            borderColor: "#0ea5e9",
            backgroundColor: gradient,
            borderWidth: 2.5,
            pointRadius: labels.length > 60 ? 0 : 3,
            pointHoverRadius: 6,
            pointBackgroundColor: "#d946ef",
            pointBorderColor: "#fff",
            pointBorderWidth: 1.5,
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false,
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "rgba(15,23,42,0.95)",
            borderColor: "rgba(14,165,233,0.4)",
            borderWidth: 1,
            titleColor: "#e2e8f0",
            bodyColor: "#94a3b8",
            padding: 12,
            callbacks: {
              label: (ctx) =>
                ` ${(ctx.parsed.y ?? 0).toLocaleString()} commands`,
            },
          },
        },
        scales: {
          x: {
            grid: { color: "rgba(255,255,255,0.05)" },
            ticks: {
              color: "#64748b",
              maxTicksLimit: 10,
              maxRotation: 0,
            },
            border: { color: "rgba(255,255,255,0.08)" },
          },
          y: {
            grid: { color: "rgba(255,255,255,0.05)" },
            ticks: {
              color: "#64748b",
              callback: (v) =>
                Number(v) >= 1000
                  ? `${(Number(v) / 1000).toFixed(1)}k`
                  : String(v),
            },
            border: { color: "rgba(255,255,255,0.08)" },
            beginAtZero: true,
          },
        },
      },
    };

    this.chart = new Chart(ctx, config);
    this.computePeak(labels, values);
  }

  private buildSeries(): { labels: string[]; values: number[] } {
    if (this.mode === "weekly") {
      // All weekly buckets from the API
      const points = [...this.rawWeekly].sort((a, b) => a.date.localeCompare(b.date));
      return {
        labels: points.map((p) => this.formatWeek(p.date)),
        values: points.map((p) => p.count),
      };
    }

    // Overall: cumulative sum of daily data
    const points = [...this.rawDaily].sort((a, b) => a.date.localeCompare(b.date));
    let cumulative = 0;
    const values: number[] = [];
    const labels: string[] = [];
    for (const p of points) {
      cumulative += p.count;
      values.push(cumulative);
      labels.push(this.formatDate(p.date));
    }
    return { labels, values };
  }

  private formatDate(date: string): string {
    // YYYY-MM-DD → "Mar 15"
    const d = new Date(date + "T00:00:00");
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  private formatWeek(date: string): string {
    // YYYY-W## → "W12 '26" or fallback to raw
    const match = date.match(/^(\d{4})-W(\d{2})$/);
    if (match) {
      return `W${match[2]} '${match[1].slice(2)}`;
    }
    // Fallback: treat as date
    return this.formatDate(date);
  }

  private computePeak(labels: string[], values: number[]): void {
    if (!values.length) { this.peakLabel = ""; return; }
    const max = Math.max(...values);
    const idx = values.indexOf(max);
    this.peakLabel = `${max.toLocaleString()} on ${labels[idx]}`;
  }
}
