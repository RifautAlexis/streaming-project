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
import { UserOutline } from "@ant-design/icons-angular/icons";

const AppInitializersProvider: FactoryProvider[] = [
  {
    provide: APP_INITIALIZER,
    useFactory: (themeService: ThemeService) => async () => {
      return await themeService.loadTheme();
    },
    deps: [ThemeService],
    multi: true,
  },
];

const icons: IconDefinition[] = [
  UserOutline
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
