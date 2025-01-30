import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    title: 'Simulador de Convalidaciones | Convalida en la UPLA',
    loadComponent: () => import('./dashboard/dashboard.component'),
    children: [
      {
        path: 'forminit',
        loadComponent: () =>
          import(
            './dashboard/form/formulario-principal/formulario-principal.component'
          ),
      },
      {
        path: 'formsecu',
        loadComponent: () =>
          import(
            './dashboard/form/formulario-secundario/formulario-secundario.component'
          ),
      },
      {
        path: '',
        redirectTo: 'forminit',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'result',
    title: 'Simulador de Convalidaciones | Convalida en la UPLA',
    loadComponent: () => import('./dashboard/view/result/result.component'),
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
];
