import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        loadComponent: () => import('./features/home-page/home-page.component').then(m => m.HomePageComponent)
    }
];
