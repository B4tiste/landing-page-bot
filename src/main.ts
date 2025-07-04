import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HeroComponent } from './app/components/hero/hero.component';
import { FeaturesComponent } from './app/components/features/features.component';
import { CtaComponent } from './app/components/cta/cta.component';
import { FooterComponent } from './app/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeroComponent, FeaturesComponent, CtaComponent, FooterComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-dark-900 to-dark-800">
      <app-hero></app-hero>
      <app-features></app-features>
      <app-cta></app-cta>
      <app-footer></app-footer>
    </div>
  `
})
export class App {}

bootstrapApplication(App, {
  providers: [
    provideAnimations()
  ]
});