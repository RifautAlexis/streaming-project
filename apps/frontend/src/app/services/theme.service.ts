import { computed, Injectable, signal } from '@angular/core';
import { ThemeType } from '../models/theme-type';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  currentTheme = signal(ThemeType.default);

  isDarkTheme = computed(() => this.currentTheme() === ThemeType.dark);

  toggleTheme(): Promise<Event> {
    this.currentTheme.set(this.reverseTheme(this.currentTheme()));
    return this.loadTheme(this.currentTheme(), false);
  }

  loadTheme(themeToLoad: ThemeType, firstLoad = true): Promise<Event> {
    if (firstLoad) {
      document.documentElement.classList.add(themeToLoad);
    }
    return new Promise<Event>((resolve, reject) => {
      this.loadCss(`${themeToLoad}.css`, themeToLoad).then(
        (e) => {
          if (!firstLoad) {
            document.documentElement.classList.add(themeToLoad);
          }
          this.removeUnusedTheme(this.reverseTheme(themeToLoad));
          resolve(e);
        },
        (e) => reject(e)
      );
    });
  }

  private reverseTheme(theme: string): ThemeType {
    return theme === ThemeType.dark ? ThemeType.default : ThemeType.dark;
  }

  private removeUnusedTheme(theme: ThemeType): void {
    document.documentElement.classList.remove(theme);
    const removedThemeStyle = document.getElementById(theme);
    if (removedThemeStyle) {
      document.head.removeChild(removedThemeStyle);
    }
  }

  private loadCss(href: string, id: string): Promise<Event> {
    return new Promise((resolve, reject) => {
      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = href;
      style.id = id;
      style.onload = resolve;
      style.onerror = reject;
      document.head.append(style);
    });
  }
}