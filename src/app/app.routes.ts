import { Routes } from "@angular/router";


export const appRoutes: Routes = [
  {
    path: '', redirectTo: 'main-table', pathMatch: 'full',
  },
  {
    path: 'main-table',
    loadComponent: () => import('./components/main/main.component').then((c) => c.MainComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then((c) => c.NotFoundComponent)
  }
]