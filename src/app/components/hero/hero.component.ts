import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { Pipe, PipeTransform } from '@angular/core';

type StatKey = "users" | "commands" | "servers";

interface Stat {
  key: StatKey;
  value: number;
  label: string;
}

@Pipe({
  name: 'numberSpace',
  standalone: true,
})
export class NumberSpacePipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value == null) return '';
    return value
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
}

@Component({
  selector: "app-hero",
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, NumberSpacePipe],
  template: `
    <section
      class="section-hero bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white relative overflow-hidden"
    >
      <!-- Animated background particles -->
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="particle"
          *ngFor="let particle of particles; let i = index"
          [style.top.%]="particle.top"
          [style.left.%]="particle.left"
          [style.animation-delay.s]="particle.delay"
        ></div>
      </div>

      <!-- Gradient overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-primary-900/20 to-secondary-900/20"
      ></div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          <!-- Content -->
          <div class="text-center lg:text-left space-y-8 animate-fade-in-left">
            <div class="space-y-4">
              <h1
                class="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-tight"
              >
                Meet
                <span class="text-gradient block">SWbox</span>
              </h1>
              <p class="text-xl sm:text-2xl text-gray-300 font-light max-w-2xl">
                The most advanced Summoners War Discord bot designed for
                competitive RTA players
              </p>
            </div>

            <div class="space-y-6">
              <p class="text-lg text-gray-400 max-w-xl">
                Access realtime player statistics, monster analytics,
                leaderboard tracking, and strategic insights to dominate the
                Real Time Arena.
              </p>

              <p class="text-lg text-gray-400 max-w-xl">
                Data is provided by <a href="https://m.swranking.com" target="_blank" rel="noopener noreferrer" class="underline text-orange-600">swranking</a>.
              </p>

              <div
                class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <a
                  href="https://discord.com/oauth2/authorize?client_id=1280887110546620426"
                  class="btn-primary inline-flex items-center justify-center gap-3 text-lg group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span class="flex items-center justify-center">
                    <mat-icon class="group-hover:scale-110 transition-transform"
                      >add</mat-icon
                    >
                  </span>
                  Add to your Discord Servers !
                </a>

                <a
                  href="https://discord.gg/AfANrTVaDJ"
                  class="btn-secondary inline-flex items-center justify-center gap-3 text-lg group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span class="flex items-center justify-center">
                    <mat-icon class="group-hover:scale-110 transition-transform"
                      >discord</mat-icon
                    >
                  </span>
                  Join the Discord Community
                </a>
              </div>

              <div
                class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <a
                  href="https://youtu.be/U6CxFH6WFKU"
                  class="btn-accent bg-gradient-accent inline-flex items-center justify-center gap-3 text-lg group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span class="flex items-center justify-center">
                    <mat-icon class="group-hover:scale-110 transition-transform"
                      >ondemand_video</mat-icon
                    >
                  </span>
                  Watch on YouTube
                </a>
                <!-- Add Ko-Fi link button -->
                <a
                  href="https://ko-fi.com/swbox"
                  class="btn-kofi inline-flex items-center justify-center gap-3 text-lg group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span class="flex items-center justify-center">
                    <mat-icon class="group-hover:scale-110 transition-transform"
                      >favorite</mat-icon
                    >
                  </span>
                  Support us on Ko-Fi
                </a>
              </div>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-8 pt-8 border-t border-gray-700">
              <div class="text-center" *ngFor="let stat of stats">
                <div class="text-3xl font-bold text-gradient">
                  {{ stat.value | numberSpace }}
                </div>
                <div class="text-sm text-gray-400 mt-1">
                  {{ stat.label }}
                </div>
              </div>
            </div>
          </div>

          <!-- Hero Image -->
          <div class="relative animate-fade-in-right">
            <div class="relative z-10 animate-float">
              <img
                src="assets/images/new_bot_logo.gif"
                alt="swbox Discord Bot Interface"
                class="w-2/3 max-w-lg mx-auto rounded-3xl shadow-2xl animate-glow ring-1 ring-white/10"
              />

              <!-- Credit to Aumission -->
              <div
                class="absolute bottom-2 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-md"
              >
                Animation & 3D Model by
                <a
                  href="https://www.instagram.com/aumission/"
                  target="_blank"
                  class="underline"
                  >Aumission</a
                >
              </div>

              <!-- Floating elements -->
              <div
                class="absolute -top-4 right-8 glass rounded-2xl p-4 animate-glow flex items-center justify-center"
              >
                <mat-icon class="text-primary-400">trending_up</mat-icon>
              </div>

              <div
                class="absolute -bottom-4 left-8 glass rounded-2xl p-4 animate-glow flex items-center justify-center"
              >
                <mat-icon class="text-secondary-400">leaderboard</mat-icon>
              </div>
            </div>

            <!-- Glow effect -->
            <div
              class="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-3xl blur-3xl animate-glow"
            ></div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div
        class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce flex items-center justify-center"
      >
        <mat-icon class="text-white/60">keyboard_arrow_down</mat-icon>
      </div>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class HeroComponent implements OnInit, OnDestroy {
  particles = Array.from({ length: 20 }, () => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: Math.random() * 8,
  }));

  private intervalId?: number;

  stats: Stat[] = [
    { key: "users", value: 0, label: "Users" },
    { key: "commands", value: 0, label: "Commands used" },
    { key: "servers", value: 0, label: "Discord server joined" },
  ];

  constructor() {}

  ngOnInit(): void {
    this.fetchCommandsCount();
    this.fetchUniqueUsersCount();
    this.fetchServersCount();

    this.intervalId = window.setInterval(() => {
      this.fetchCommandsCount();
      this.fetchUniqueUsersCount();
      this.fetchServersCount();
    }, 60000); // every 60 seconds
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private async fetchCommandsCount(): Promise<void> {
    try {
      const res = await fetch(
        "https://api-mongo-swbox.fly.dev/logs/commands"
      );
      if (!res.ok) return;

      const data = await res.json();
      console.log("Fetched command count data:", data);
      const nb = Number((data as any)?.nb);

      if (!Number.isNaN(nb)) {
        this.animateStat("commands", nb);
      }
    } catch (err) {
      console.error("Error fetching command count:", err);
    }
  }

  private async fetchUniqueUsersCount(): Promise<void> {
    try {
      const res = await fetch(
        "https://api-mongo-swbox.fly.dev/logs/users?timestamp="
      );
      if (!res.ok) return;

      const data = await res.json();
      console.log("Fetched users data:", data);
      const nb = Number((data as any)?.nb);

      if (!Number.isNaN(nb)) {
        this.animateStat("users", nb);
      }
    } catch (err) {
      console.error("Error fetching users count:", err);
    }
  }

  private async fetchServersCount(): Promise<void> {
    try {
      const res = await fetch(
        "https://api-mongo-swbox.fly.dev/logs/servers"
      );
      if (!res.ok) return;

      const data = await res.json();
      console.log("Fetched servers count data:", data);
      const nb = Number((data as any)?.nb);

      if (!Number.isNaN(nb)) {
        this.animateStat("servers", nb);
      }
    } catch (err) {
      console.error("Error fetching servers count:", err);
    }
  }

  private animateStat(key: StatKey, target: number, duration = 3000): void {
    const stat = this.stats.find((s) => s.key === key);
    if (!stat) return;

    const start = stat.value || 0;
    const diff = target - start;
    if (diff === 0) return;

    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1); // 0 → 1

      // Ease-out (facultatif pour une anim plus smooth)
      const eased = 1 - Math.pow(1 - progress, 3);

      stat.value = Math.round(start + diff * eased);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }
}
