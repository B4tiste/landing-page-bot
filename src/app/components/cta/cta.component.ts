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
                            >Real Time Arena ?</span
                        >
                    </h2>

                    <p
                        class="text-xl sm:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed"
                    >
                        Add
                        <span class="font-bold text-gradient">swbox</span> to
                        your Discord server and unlock powerful tools to enhance
                        your RTA experience. From real time stats to advanced
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

                <!-- Social Proof -->
                <div class="animate-fade-in-up" style="animation-delay: 0.6s;">
                    <div
                        class="max-w-4xl mx-auto bg-white bg-opacity-5 backdrop-blur-md rounded-2xl p-8 border border-white border-opacity-10 shadow-xl mb-8"
                    >
                        <h3
                            class="text-2xl sm:text-3xl font-bold text-white mb-4"
                        >
                            Trusted by the Best in the Summoners War Community
                        </h3>
                        <p class="text-lg text-gray-300 mb-8">
                            These top creators and communities use
                            <span class="font-bold text-gradient">swbox</span> :
                        </p>

                        <div class="flex flex-wrap justify-center gap-4">
                            <div
                                class="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4 border border-white border-opacity-10 shadow-md text-white text-center"
                                *ngFor="let entity of trustedEntities"
                            >
                                <div class="font-semibold text-lg">
                                    {{ entity.name }}
                                </div>
                                <div class="text-sm text-gray-300">
                                    {{ entity.description }}
                                </div>
                            </div>
                        </div>
                        <span class="block text-lg text-gray-300 mt-6">
                            Join the community and see why
                            <span class="font-bold text-gradient">swbox</span> is
                            the go-to bot for RTA players !
                        </span>
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
        {
            name: "SheisouTV",
            description: "Content creator and high ranked player",
        },
        {
            name: "GutsTheBERSERK",
            description: "EU SWC Contender and RTA/Siege content creator",
        },
        {
            name: "❃Video~ aka Videokilled",
            description: "Community guide writer and high ranked player",
        },
        {
            name: "TitoGoflette",
            description: "Content creator and high ranked player",
        },
        {
            name: "Official Summoners War : Sky Arena",
            description: "Official SW discord server",
        },
        {
            name: "Summoners War FR 🥖",
            description: "French community discord server",
        },
        {
            name: "^[O.O]^",
            description: "Discord server of the 'Hiboux' French guild",
        },
    ];
}
