import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
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
  imports: [CommonModule, FormsModule, MatIconModule, NumberSpacePipe],
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
            Live stats on the most active users, busiest servers, and most popular commands.
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

            <!-- Controls -->
            <div class="flex flex-col sm:flex-row gap-3 mb-6">
              <!-- Search -->
              <div class="relative flex-1">
                <mat-icon class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" style="font-size:18px;width:18px;height:18px;">search</mat-icon>
                <input
                  type="text"
                  [(ngModel)]="userSearch"
                  placeholder="Search username… (top 100)"
                  class="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition"
                />
              </div>
              <!-- Limit selector -->
              <div class="flex items-center gap-2">
                <span class="text-xs text-gray-400 whitespace-nowrap">Show top</span>
                <select
                  [(ngModel)]="usersLimit"
                  class="limit-select"
                >
                  <option *ngFor="let n of limitOptions" [value]="n">{{ n }}</option>
                </select>
              </div>
              <!-- Hide dev -->
              <label class="flex items-center gap-2 cursor-pointer select-none whitespace-nowrap">
                <div
                  class="relative w-10 h-5 rounded-full transition-colors duration-300"
                  [ngClass]="hideDevUser ? 'bg-primary-500' : 'bg-white/10'"
                  (click)="hideDevUser = !hideDevUser"
                >
                  <div
                    class="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300"
                    [ngClass]="hideDevUser ? 'translate-x-5' : 'translate-x-0'"
                  ></div>
                </div>
                <span class="text-xs text-gray-400">Hide developer data</span>
              </label>
            </div>

            <div *ngIf="filteredUsers.length === 0" class="text-center text-gray-500 py-8">No users match your search.</div>
            <div class="leaderboard-scroll">
              <ol class="space-y-3">
                <li
                  *ngFor="let entry of filteredUsers; let i = index"
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
            <div class="leaderboard-scroll">
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
            <div class="leaderboard-scroll">
              <ol class="space-y-3">
                <li
                  *ngFor="let entry of commands; let i = index"
                  class="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:bg-white/5"
                  [ngClass]="rankClass(i)"
                >
                  <span class="rank-badge" [ngClass]="rankBadgeClass(i)">{{ i + 1 }}</span>
                  <div class="flex-1 min-w-0 flex items-center gap-2 flex-wrap">
                    <code class="font-bold text-primary-300 text-base">{{ entry.command_name }}</code>
                    <span
                      *ngIf="entry.command_name === 'get_duo_stats'"
                      class="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30"
                    >Deprecated</span>
                  </div>
                  <div class="flex items-center gap-1 text-right">
                    <span class="font-bold text-lg" [ngClass]="rankValueClass(i)">{{ entry.usage_count | numberSpace }}</span>
                    <span class="text-xs text-gray-400 hidden sm:inline">uses</span>
                  </div>
                </li>
              </ol>
            </div>
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

    .limit-select {
      appearance: none;
      -webkit-appearance: none;
      background-color: rgba(255,255,255,0.05);
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2394a3b8' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 0.6rem center;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 0.75rem;
      padding: 0.4rem 2rem 0.4rem 0.75rem;
      font-size: 0.875rem;
      font-weight: 600;
      color: #e2e8f0;
      cursor: pointer;
      transition: border-color 0.2s, box-shadow 0.2s;
      min-width: 4.5rem;
    }

    .limit-select:focus {
      outline: none;
      border-color: #0ea5e9;
      box-shadow: 0 0 0 2px rgba(14,165,233,0.25);
    }

    .limit-select:hover {
      border-color: rgba(255,255,255,0.25);
    }

    .limit-select option {
      background-color: #1e293b;
      color: #e2e8f0;
    }

    .leaderboard-scroll {
      max-height: 60vh;
      overflow-y: auto;
      overflow-x: hidden;
      padding-right: 4px;
    }

    .leaderboard-scroll::-webkit-scrollbar {
      width: 6px;
    }

    .leaderboard-scroll::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.03);
      border-radius: 999px;
    }

    .leaderboard-scroll::-webkit-scrollbar-thumb {
      background: linear-gradient(135deg, #0ea5e9, #d946ef);
      border-radius: 999px;
    }

    .leaderboard-scroll::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(135deg, #0284c7, #c026d3);
    }

    /* Firefox */
    .leaderboard-scroll {
      scrollbar-width: thin;
      scrollbar-color: #0ea5e9 rgba(255,255,255,0.03);
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

  userSearch = "";
  usersLimit = 10;
  hideDevUser = false;
  readonly limitOptions = [10, 25, 50, 100];
  readonly devUsername = "b4tiste";

  get filteredUsers(): UserEntry[] {
    let result = this.users;
    if (this.hideDevUser) {
      result = result.filter(u => u.username.toLowerCase() !== this.devUsername.toLowerCase());
    }
    if (this.userSearch.trim()) {
      const q = this.userSearch.trim().toLowerCase();
      result = result.filter(u => u.username.toLowerCase().includes(q));
    }
    return result.slice(0, this.usersLimit);
  }

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
        fetch("https://api-mongo-swbox.fly.dev/logs/leaderboard/users?limit=100"),
        fetch("https://api-mongo-swbox.fly.dev/logs/leaderboard/servers?limit=20"),
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
