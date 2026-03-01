import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
  { path: 'services', loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent) },
  { path: 'projects', loadComponent: () => import('./pages/projects/projects.component').then(m => m.ProjectsComponent) },
  { path: 'team', loadComponent: () => import('./pages/team/team.component').then(m => m.TeamComponent) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'quote', loadComponent: () => import('./pages/quote/quote.component').then(m => m.QuoteComponent) },
  { path: 'terms', loadComponent: () => import('./pages/terms/terms.component').then(m => m.TermsComponent) },
  { path: 'privacy', loadComponent: () => import('./pages/privacy/privacy.component').then(m => m.PrivacyComponent) },
  { path: 'service-details', loadComponent: () => import('./pages/service-details/service-details.component').then(m => m.ServiceDetailsComponent) },
  { path: 'services/hvac', loadComponent: () => import('./pages/all-services/hvac/hvac.component').then(m => m.HvacComponent) },
  { path: 'services/fire-fighting', loadComponent: () => import('./pages/all-services/fire-fighting/fire-fighting.component').then(m => m.FireFightingComponent) },
  { path: 'services/electrical', loadComponent: () => import('./pages/all-services/electrical/electrical.component').then(m => m.ElectricalComponent) },
  { path: 'services/plumbing', loadComponent: () => import('./pages/all-services/plumbing/plumbing.component').then(m => m.PlumbingComponent) },
  { path: 'project-details', loadComponent: () => import('./pages/project-details/project-details.component').then(m => m.ProjectDetailsComponent) },
  { path: 'starter-page', loadComponent: () => import('./pages/starter-page/starter-page.component').then(m => m.StarterPageComponent) },
  { path: '404', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent) },
  { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent) },
];
