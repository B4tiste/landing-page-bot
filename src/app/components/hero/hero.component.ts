import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-hero",
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
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
                  href="https://www.youtube.com/playlist?list=PLNbJfH5FAP7pwUqqash7xEYUyRpgmoclQ"
                  class="btn-secondary inline-flex items-center justify-center gap-3 text-lg group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span class="flex items-center justify-center">
                    <mat-icon class="group-hover:scale-110 transition-transform"
                      >play_arrow</mat-icon
                    >
                  </span>
                  Watch Demo
                </a>
              </div>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-8 pt-8 border-t border-gray-700">
              <div class="text-center" *ngFor="let stat of stats">
                <div class="text-3xl font-bold text-gradient">
                  {{ stat.value }}
                </div>
                <div class="text-sm text-gray-400 mt-1">{{ stat.label }}</div>
              </div>
            </div>
          </div>

          <!-- Hero Image -->
          <div class="relative animate-fade-in-right">
            <div class="relative z-10 animate-float">
              <img
                src="assets/images/bot_logo.gif"
                alt="swbox Discord Bot Interface"
                class="w-2/3 max-w-lg mx-auto rounded-3xl shadow-2xl animate-glow ring-1 ring-white/10"
              />

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
export class HeroComponent implements OnInit {
  particles = Array.from({ length: 20 }, (_, i) => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: Math.random() * 8,
  }));

  stats = [
    { value: "2000+", label: "Active Users" },
    { value: "100K+", label: "Commands Used" },
    { value: "170+", label: "Discord Servers" },
  ];

  ngOnInit() {
    // Component initialization
  }
}
