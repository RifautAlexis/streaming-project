import {
  ApplicationConfig,
  provideZoneChangeDetection,
  APP_INITIALIZER,
  FactoryProvider,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { ThemeService } from './services/theme.service';

export const AppInitializersProvider: FactoryProvider[] = [
  {
    provide: APP_INITIALIZER,
    useFactory: (themeService: ThemeService) => async () => {
      return await themeService.loadTheme();
    },
    deps: [ThemeService],
    multi: true,
  },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    ...AppInitializersProvider,
  ],
};
