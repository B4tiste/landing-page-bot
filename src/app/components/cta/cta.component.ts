import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: "app-cta",
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule],
    template: `
        <section
            class="section bg-gradient-to-r from-primary-900 via-secondary-900 to-primary-900 text-white relative overflow-hidden"
        >
            <!-- Background Pattern -->
            <div class="absolute inset-0 opacity-10">
                <div
                    class="absolute inset-0"
                    style="background-image: radial-gradient(circle at 25% 25%, #0ea5e9 0%, transparent 50%), radial-gradient(circle at 75% 75%, #d946ef 0%, transparent 50%);"
                ></div>
            </div>

            <div
                class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
            >
                <!-- Main CTA Content -->
                <div class="animate-scale-in">
                    <h2
                        class="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-8"
                    >
                        Ready to Dominate
                        <span class="block text-gradient"
                            >Real Time Arena?</span
                        >
                    </h2>

                    <p
                        class="text-xl sm:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed"
                    >
                        Add
                        <span class="font-bold text-gradient">swbox</span> to
                        your Discord server and unlock powerful tools to enhance
                        your RTA experience. From real-time stats to advanced
                        team analysis, swbox is your ultimate companion for
                        climbing the ranks in Summoners War RTA.
                    </p>
                </div>

                <!-- CTA Buttons -->
                <div
                    class="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in-up"
                >
                    <a
                        href="https://discord.com/oauth2/authorize?client_id=1280887110546620426"
                        class="btn-primary inline-flex items-center justify-center gap-4 text-xl py-6 px-10 group transform hover:scale-105"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <mat-icon
                            class="group-hover:rotate-12 transition-transform"
                            >rocket_launch</mat-icon
                        >
                        Add swbox to Discord
                    </a>

                    <a
                        href="https://github.com/B4tiste/bot-swbox/blob/main/README.md"
                        class="btn-secondary inline-flex items-center justify-center gap-3 text-lg group"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span class="flex items-center justify-center">
                            <mat-icon
                                class="group-hover:scale-110 transition-transform"
                                >help_outline</mat-icon
                            >
                        </span>
                        View Documentation
                    </a>
                </div>

                <!-- Trust Indicators -->
                <div
                    class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-fade-in-up"
                    style="animation-delay: 0.3s;"
                >
                    <div class="glass rounded-2xl p-6 text-center">
                        <div class="text-4xl font-bold text-gradient mb-2">
                            2000+
                        </div>
                        <div class="text-gray-300">Active Users</div>
                    </div>

                    <div class="glass rounded-2xl p-6 text-center">
                        <div class="text-4xl font-bold text-gradient mb-2">
                            100K+
                        </div>
                        <div class="text-gray-300">Command used</div>
                    </div>

                    <div class="glass rounded-2xl p-6 text-center">
                        <div class="text-4xl font-bold text-gradient mb-2">
                            150+
                        </div>
                        <div class="text-gray-300">Discord Servers</div>
                    </div>
                </div>

                <!-- Social Proof -->
                <div class="animate-fade-in-up" style="animation-delay: 0.6s;">
                    <p class="text-gray-300 mb-8">
                        Trusted and used by the biggest Summoners War Discord
                        servers and content creators :
                    </p>

                    <div
                        class="flex flex-wrap justify-center items-center gap-8 opacity-60"
                    >
                        <div
                            class="flex items-center gap-2"
                            *ngFor="let entity of trustedEntities"
                        >
                            <div
                                class="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center"
                            >
                                <mat-icon class="text-white">check</mat-icon>
                            </div>
                            <span class="text-sm font-medium">{{
                                entity.name
                            }}</span>
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
        `,
    ],
})
export class CtaComponent {
    trustedEntities = [
        { name: "Sheisou" },
        { name: "Guts" },
        { name: "Videokilled" },
        { name: "Tito Goflette" },
        { name: "Seiishizo" },
        { name: "Official Summoners War : Sky Arena" },
        { name: "Summoners War FR 🥖" },
        { name: "^[O.O]^" },
    ];
}
