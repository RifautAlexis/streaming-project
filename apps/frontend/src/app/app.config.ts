import {
  ApplicationConfig,
  provideZoneChangeDetection,
  APP_INITIALIZER,
  FactoryProvider,
} from '@angular/core';
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { ThemeService } from './services/theme.service';
import { provideNzIcons } from "ng-zorro-antd/icon";
import { IconDefinition } from "@ant-design/icons-angular";
import { UserOutline, SunOutline, MoonOutline } from "@ant-design/icons-angular/icons";
import { ThemeType } from './models/theme-type';

const AppInitializersProvider: FactoryProvider[] = [
  {
    provide: APP_INITIALIZER,
    useFactory: (themeService: ThemeService) => async () => {
      return await themeService.loadTheme(ThemeType.default);
    },
    deps: [ThemeService],
    multi: true,
  },
];

const icons: IconDefinition[] = [
  UserOutline,
  SunOutline,
  MoonOutline,
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideRouter(appRoutes),
    provideNzIcons(icons),
    ...AppInitializersProvider,
  ],
};
