import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  template: `
    <footer class="bg-dark-900 text-white border-t border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <!-- Main Footer Content -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <!-- Brand Section -->
          <div class="md:col-span-2">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mr-4">
                <mat-icon class="text-white">smart_toy</mat-icon>
              </div>
              <h3 class="text-2xl font-bold text-gradient">swbox</h3>
            </div>
            
            <p class="text-gray-400 text-lg mb-6 max-w-md leading-relaxed">
              The most advanced Summoners War Discord bot for competitive RTA players. 
              Get real-time analytics, strategic insights, and dominate the arena.
            </p>
            
            <div class="flex gap-4">
              <a 
                href="https://github.com/B4tiste/bot-swbox" 
                class="w-12 h-12 glass rounded-xl flex items-center justify-center hover:bg-primary-500/20 transition-colors group"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Repository"
              >
                <mat-icon class="text-gray-400 group-hover:text-primary-400 transition-colors">code</mat-icon>
              </a>
              
              <a 
                href="https://www.youtube.com/playlist?list=PLNbJfH5FAP7pwUqqash7xEYUyRpgmoclQ" 
                class="w-12 h-12 glass rounded-xl flex items-center justify-center hover:bg-secondary-500/20 transition-colors group"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube Tutorials"
              >
                <mat-icon class="text-gray-400 group-hover:text-secondary-400 transition-colors">play_circle</mat-icon>
              </a>
              
              <a 
                href="https://discord.com/oauth2/authorize?client_id=1280887110546620426" 
                class="w-12 h-12 glass rounded-xl flex items-center justify-center hover:bg-accent-500/20 transition-colors group"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Add to Discord"
              >
                <mat-icon class="text-gray-400 group-hover:text-accent-400 transition-colors">add</mat-icon>
              </a>
            </div>
          </div>
          
          <!-- Quick Links -->
          <div>
            <h4 class="text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <ul class="space-y-3">
              <li *ngFor="let link of quickLinks">
                <a 
                  [href]="link.url" 
                  class="text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2 group"
                  [target]="link.external ? '_blank' : '_self'"
                  [rel]="link.external ? 'noopener noreferrer' : ''"
                >
                  <mat-icon class="text-sm group-hover:translate-x-1 transition-transform">{{ link.icon }}</mat-icon>
                  {{ link.name }}
                </a>
              </li>
            </ul>
          </div>
          
          <!-- Support -->
          <div>
            <h4 class="text-lg font-semibold mb-6 text-white">Support</h4>
            <ul class="space-y-3">
              <li *ngFor="let support of supportLinks">
                <a 
                  [href]="support.url" 
                  class="text-gray-400 hover:text-secondary-400 transition-colors flex items-center gap-2 group"
                  [target]="support.external ? '_blank' : '_self'"
                  [rel]="support.external ? 'noopener noreferrer' : ''"
                >
                  <mat-icon class="text-sm group-hover:translate-x-1 transition-transform">{{ support.icon }}</mat-icon>
                  {{ support.name }}
                </a>
              </li>
            </ul>
          </div>
        </div>
               
        <!-- Bottom Bar -->
        <div class="border-t border-gray-800 pt-8">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <div class="text-gray-400 text-center md:text-left">
              <p>© 2025 <span class="font-bold text-gradient">swbox</span>. All rights reserved.</p>
              <p class="text-sm mt-1">
                Made with ❤️ by 
                <a 
                  href="https://github.com/shvvkz" 
                  class="text-blue-400 underline hover:text-blue-500 hover:cursor-pointer transition-colors"
                >shvvkz</a>
                & <a 
                  href="https://github.com/B4tiste" 
                  class="text-blue-400 underline hover:text-blue-500 hover:cursor-pointer transition-colors"
                >B4tiste</a> 
                for the Summoners War community
              </p>
            </div>
            
            <div class="flex items-center gap-6 text-sm text-gray-400">
              <a href="#" class="hover:text-primary-400 transition-colors">Privacy Policy</a>
              <a href="#" class="hover:text-primary-400 transition-colors">Terms of Service</a>
              <a href="#" class="hover:text-primary-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class FooterComponent {
  quickLinks = [
    { name: 'Add to Discord', url: 'https://discord.com/oauth2/authorize?client_id=1280887110546620426', icon: 'add', external: true },
    { name: 'Commands List', url: '#', icon: 'list', external: false },
    { name: 'Documentation', url: '#', icon: 'description', external: false },
    { name: 'Changelog', url: '#', icon: 'update', external: false }
  ];

  supportLinks = [
    { name: 'Help Center', url: '#', icon: 'help', external: false },
    { name: 'Discord Server', url: '#', icon: 'forum', external: true },
    { name: 'Bug Reports', url: 'https://github.com/B4tiste/bot-swbox/issues', icon: 'bug_report', external: true },
    { name: 'Feature Requests', url: '#', icon: 'lightbulb', external: false }
  ];
}