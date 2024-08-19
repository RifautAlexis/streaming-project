import { ThemeService } from './services/theme.service';
import { NgOptimizedImage } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ThemeType } from './models/theme-type';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  imports: [
    NzLayoutModule,
    RouterModule,
    NzMenuModule,
    NgOptimizedImage,
    NzAvatarModule,
    NzButtonModule,
    NzDropDownModule,
    NzSwitchModule,
    FormsModule,
    NzIconModule,
  ],
})
export class AppComponent {
  router = inject(RouterModule);
  themeService = inject(ThemeService);

  isDarkTheme = computed(() => this.themeService.isDarkTheme());
  isLoggedIn = signal(false);

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  logout() {
    console.log('Click to logout');
  }
}
