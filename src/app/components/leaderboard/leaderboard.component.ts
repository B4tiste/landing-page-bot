import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { NumberSpacePipe } from "../hero/hero.component";

type LeaderboardTab = "users" | "servers" | "commands";

interface UserEntry {
  username: string;
  command_count: number;
}

interface ServerEntry {
  server_name: string;
  command_count: number;
}

interface CommandEntry {
  command_name: string;
  usage_count: number;
}

@Component({
  selector: "app-leaderboard",
  standalone: true,
  imports: [CommonModule, MatIconModule, NumberSpacePipe],
  template: `
    <section class="section bg-gradient-to-b from-dark-800 to-dark-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <!-- Header -->
        <div class="text-center mb-16 animate-fade-in-down">
          <h2 class="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
            Live
            <span class="text-gradient">Leaderboards</span>
          </h2>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Real-time rankings powered by live data from the SWbox API
          </p>
        </div>

        <!-- Tabs -->
        <div class="flex justify-center mb-10">
          <div class="glass-dark rounded-2xl p-1 flex gap-1 flex-wrap justify-center">
            <button
              *ngFor="let tab of tabs"
              (click)="activeTab = tab.key"
              class="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300"
              [ngClass]="activeTab === tab.key
                ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'"
            >
              <mat-icon class="text-base leading-none" style="font-size:18px;width:18px;height:18px;">{{ tab.icon }}</mat-icon>
              {{ tab.label }}
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
          <p class="text-lg">Failed to load leaderboard data. Please try again later.</p>
        </div>

        <!-- Users Leaderboard -->
        <div *ngIf="!loading && !error && activeTab === 'users'" class="animate-fade-in-up">
          <div class="card overflow-hidden">
            <div class="flex items-center gap-3 mb-6">
              <mat-icon class="text-primary-400" style="font-size:24px;width:24px;height:24px;">person</mat-icon>
              <h3 class="text-xl font-display font-bold">Top Users</h3>
              <span class="ml-auto text-xs text-gray-500 italic">by command usage</span>
            </div>
            <div *ngIf="users.length === 0" class="text-center text-gray-500 py-8">No data available.</div>
            <ol class="space-y-3">
              <li
                *ngFor="let entry of users; let i = index"
                class="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:bg-white/5"
                [ngClass]="rankClass(i)"
              >
                <span class="rank-badge" [ngClass]="rankBadgeClass(i)">{{ i + 1 }}</span>
                <div class="flex-1 min-w-0">
                  <div class="font-semibold text-white truncate">{{ entry.username }}</div>
                </div>
                <div class="flex items-center gap-1 text-right">
                  <span class="font-bold text-lg" [ngClass]="rankValueClass(i)">{{ entry.command_count | numberSpace }}</span>
                  <span class="text-xs text-gray-400 hidden sm:inline">cmds</span>
                </div>
              </li>
            </ol>
          </div>
        </div>

        <!-- Servers Leaderboard -->
        <div *ngIf="!loading && !error && activeTab === 'servers'" class="animate-fade-in-up">
          <div class="card overflow-hidden">
            <div class="flex items-center gap-3 mb-6">
              <mat-icon class="text-secondary-400" style="font-size:24px;width:24px;height:24px;">dns</mat-icon>
              <h3 class="text-xl font-display font-bold">Top Servers</h3>
              <span class="ml-auto text-xs text-gray-500 italic">by command usage</span>
            </div>
            <div *ngIf="servers.length === 0" class="text-center text-gray-500 py-8">No data available.</div>
            <ol class="space-y-3">
              <li
                *ngFor="let entry of servers; let i = index"
                class="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:bg-white/5"
                [ngClass]="rankClass(i)"
              >
                <span class="rank-badge" [ngClass]="rankBadgeClass(i)">{{ i + 1 }}</span>
                <div class="flex-1 min-w-0">
                  <div class="font-semibold text-white truncate">{{ entry.server_name }}</div>
                  <div *ngIf="isDm(entry.server_name)" class="text-xs text-gray-500">Direct messages</div>
                </div>
                <div class="flex items-center gap-1 text-right">
                  <span class="font-bold text-lg" [ngClass]="rankValueClass(i)">{{ entry.command_count | numberSpace }}</span>
                  <span class="text-xs text-gray-400 hidden sm:inline">cmds</span>
                </div>
              </li>
            </ol>
          </div>
        </div>

        <!-- Commands Leaderboard -->
        <div *ngIf="!loading && !error && activeTab === 'commands'" class="animate-fade-in-up">
          <div class="card overflow-hidden">
            <div class="flex items-center gap-3 mb-6">
              <mat-icon class="text-accent-400" style="font-size:24px;width:24px;height:24px;">terminal</mat-icon>
              <h3 class="text-xl font-display font-bold">Most Used Commands</h3>
              <span class="ml-auto text-xs text-gray-500 italic">by usage frequency</span>
            </div>
            <div *ngIf="commands.length === 0" class="text-center text-gray-500 py-8">No data available.</div>
            <ol class="space-y-3">
              <li
                *ngFor="let entry of commands; let i = index"
                class="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:bg-white/5"
                [ngClass]="rankClass(i)"
              >
                <span class="rank-badge" [ngClass]="rankBadgeClass(i)">{{ i + 1 }}</span>
                <div class="flex-1 min-w-0">
                  <code class="font-bold text-primary-300 text-base">{{ entry.command_name }}</code>
                </div>
                <div class="flex items-center gap-1 text-right">
                  <span class="font-bold text-lg" [ngClass]="rankValueClass(i)">{{ entry.usage_count | numberSpace }}</span>
                  <span class="text-xs text-gray-400 hidden sm:inline">uses</span>
                </div>
              </li>
            </ol>
          </div>
        </div>

        <!-- Refresh notice -->
        <p class="text-center text-xs text-gray-600 mt-8">Data refreshes every 60 seconds</p>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }

    .rank-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      font-size: 0.85rem;
      font-weight: 700;
      flex-shrink: 0;
      background: rgba(255,255,255,0.07);
      color: #94a3b8;
    }
  `],
})
export class LeaderboardComponent implements OnInit, OnDestroy {
  activeTab: LeaderboardTab = "users";
  loading = false;
  error = false;

  tabs: { key: LeaderboardTab; label: string; icon: string }[] = [
    { key: "users", label: "Top Users", icon: "person" },
    { key: "servers", label: "Top Servers", icon: "dns" },
    { key: "commands", label: "Top Commands", icon: "terminal" },
  ];

  users: UserEntry[] = [];
  servers: ServerEntry[] = [];
  commands: CommandEntry[] = [];

  private intervalId?: number;

  ngOnInit(): void {
    this.fetchAll();
    this.intervalId = window.setInterval(() => this.fetchAll(), 60000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  private async fetchAll(): Promise<void> {
    this.loading = this.users.length === 0 && this.servers.length === 0 && this.commands.length === 0;
    this.error = false;
    try {
      const [usersRes, serversRes, commandsRes] = await Promise.all([
        fetch("https://api-mongo-swbox.fly.dev/logs/leaderboard/users?limit=10"),
        fetch("https://api-mongo-swbox.fly.dev/logs/leaderboard/servers?limit=10"),
        fetch("https://api-mongo-swbox.fly.dev/logs/leaderboard/commands?limit=10"),
      ]);

      if (!usersRes.ok || !serversRes.ok || !commandsRes.ok) {
        this.error = true;
        return;
      }

      const [usersData, serversData, commandsData] = await Promise.all([
        usersRes.json(),
        serversRes.json(),
        commandsRes.json(),
      ]);

      this.users = (usersData as any)?.data ?? [];
      this.servers = (serversData as any)?.data ?? [];
      this.commands = (commandsData as any)?.data ?? [];
    } catch {
      this.error = true;
    } finally {
      this.loading = false;
    }
  }

  isDm(name: string): boolean {
    return name.startsWith("DM -");
  }

  rankClass(index: number): string {
    if (index === 0) return "bg-yellow-500/10";
    if (index === 1) return "bg-gray-400/10";
    if (index === 2) return "bg-amber-700/10";
    return "";
  }

  rankBadgeClass(index: number): string {
    if (index === 0) return "!bg-yellow-500/20 !text-yellow-400";
    if (index === 1) return "!bg-gray-400/20 !text-gray-300";
    if (index === 2) return "!bg-amber-700/20 !text-amber-600";
    return "";
  }

  rankValueClass(index: number): string {
    if (index === 0) return "text-yellow-400";
    if (index === 1) return "text-gray-300";
    if (index === 2) return "text-amber-600";
    return "text-white";
  }
}
