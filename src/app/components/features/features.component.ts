import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

interface Feature {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  icon: string;
  color: string;
  benefits: string[];
}

@Component({
  selector: "app-features",
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  template: `
    <section
      class="section bg-gradient-to-b from-dark-900 to-dark-800 text-white"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-20 animate-fade-in-down">
          <h2
            class="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6"
          >
            Powerful Features for
            <span class="text-gradient">Competitive Players</span>
          </h2>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Unlock advanced analytics and insights that give you the competitive
            edge in RTA
          </p>
        </div>

        <!-- Features Grid -->
        <div class="features-masonry mb-16">
          <div
            *ngFor="let feature of features; let i = index"
            class="card group"
          >
            <!-- Feature Icon -->
            <div class="flex items-center mb-6">
              <div
                class="w-16 h-16 rounded-2xl flex items-center justify-center mr-4"
                [ngClass]="feature.color"
              >
                <mat-icon class="text-white">{{ feature.icon }}</mat-icon>
              </div>
              <h3 class="text-2xl font-bold text-white">
                {{ feature.title }}
              </h3>
            </div>

            <!-- Feature Description -->
            <p class="text-gray-300 text-lg mb-6 leading-relaxed">
              {{ feature.description }}
            </p>

            <!-- Benefits List -->
            <ul class="space-y-2 mb-6">
              <li
                *ngFor="let benefit of feature.benefits"
                class="flex items-center text-gray-400"
              >
                <mat-icon class="text-primary-400 mr-1"
                  >arrow_right</mat-icon
                >
                {{ benefit }}
              </li>
            </ul>

            <!-- Feature Image -->
            <div
              class="relative overflow-hidden rounded-xl flex items-center justify-center bg-dark-900 p-2"
            >
              <img
                [src]="feature.image"
                [alt]="feature.imageAlt"
                class="object-contain w-full rounded-xl"
                style="height: auto;"
              />
            </div>
          </div>
        </div>

        <!-- Additional Features -->
        <div class="text-center animate-fade-in-up">
          <div class="glass-dark rounded-3xl p-8 max-w-4xl mx-auto">
            <h3 class="text-3xl font-bold mb-6">And Much More !</h3>
            <p class="text-gray-300 text-lg mb-8">
              Discover all available commands and features using the
              <code class="bg-primary-500/20 text-primary-300 px-2 py-1 rounded"
                >/help</code
              >
              command in your Discord server.
            </p>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div *ngFor="let extra of extraFeatures" class="text-center">
                <div
                  class="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center mx-auto mb-3"
                >
                  <mat-icon class="text-white">{{ extra.icon }}</mat-icon>
                </div>
                <p class="text-sm text-gray-400">{{ extra.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      code {
        font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
      }
    `,
  ],
})
export class FeaturesComponent implements OnInit {
  features: Feature[] = [
    {
      title: "Player Analytics",
      description:
        "Retrieve detailed stats of any RTA player using their in-game name. Stats contain information such as rank, win rate, most played monsters, LD5 and more. Only players above C1 can be searched.",
      image: "assets/images/get_player_stats.png",
      imageAlt: "Player Statistics Dashboard",
      icon: "person_search",
      color: "bg-gradient-primary",
      benefits: [
        "Real time rank tracking",
        "Win rate analysis",
        "Most played monsters",
        "LD5 collection overview",
        "6 most recent matches",
      ],
    },
    {
      title: "Monster Analytics",
      description:
        "Retrieve detailed stats of any RTA monster using its name. Stats contain information such as win rate, pick rate, ban rate, and more. You can also see which monsters are the most played with/against this monster.",
      image: "assets/images/get_mob_stats.png",
      imageAlt: "Monster Analytics Interface",
      icon: "query_stats",
      color: "bg-gradient-secondary",
      benefits: [
        "Pick & ban rate tracking",
        "Win rate by rank",
        "Synergy recommendations",
        "Counter strategies",
      ],
    },
    {
      title: "Rank Thresholds",
      description:
        "Retrieve the current RTA elo thresholds for each rank. This allows you to know how many elo points you need to reach a specific rank.",
      image: "assets/images/get_ranks.png",
      imageAlt: "RTA Rank System",
      icon: "grade",
      color: "bg-gradient-accent",
      benefits: ["Live threshold updates"],
    },
    {
      title: "Don't know what to play ?",
      description:
        "Using an account JSON File, the bot uses SWRT current meta tier list to determine which RTA core team you can play with your account.",
      image: "assets/images/get_rta_core.png",
      imageAlt: "Team Building Interface",
      icon: "groups",
      color: "bg-gradient-primary",
      benefits: [
        "Meta-based suggestions",
        "Account optimization",
        "Core team analysis",
      ],
    },
    {
      title: "Live Leaderboard",
      description:
        "Track the top RTA players in real time with comprehensive leaderboard statistics and rankings.",
      image: "assets/images/get_rta_leaderboard.png",
      imageAlt: "RTA Leaderboard",
      icon: "leaderboard",
      color: "bg-gradient-accent",
      benefits: ["Real time updates"],
    },
  ];

  extraFeatures = [
    { name: "Up-To-Date Stats", icon: "update" },
    { name: "No Data Collection", icon: "storage" },
    { name: "Easy to use", icon: "engineering" },
    { name: "Free to use", icon: "money_off" },
  ];

  ngOnInit() {
    // Component initialization
  }
}
