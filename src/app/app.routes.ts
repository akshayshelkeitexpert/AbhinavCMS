import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { CrmLayoutComponent } from './layouts/crm-layout/crm-layout.component';
import { crmAuthGuard, crmGuestGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  // CRM routes first so /crm is not caught by the main layout's ** wildcard
  {
    path: 'crm',
    component: CrmLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', loadComponent: () => import('./pages/crm/crm-redirect/crm-redirect.component').then(m => m.CrmRedirectComponent) },
      { path: 'signin', loadComponent: () => import('./pages/crm/crm-signin/crm-signin.component').then(m => m.CrmSigninComponent), canActivate: [crmGuestGuard] },
      { path: 'dashboard', loadComponent: () => import('./pages/crm/crm-dashboard/crm-dashboard.component').then(m => m.CrmDashboardComponent), canActivate: [crmAuthGuard] },
      { path: 'contacted-list', loadComponent: () => import('./pages/crm/crm-contacted-list/crm-contacted-list.component').then(m => m.CrmContactedListComponent), canActivate: [crmAuthGuard] },
      { path: 'quotes-request', loadComponent: () => import('./pages/crm/crm-quotes-request/crm-quotes-request.component').then(m => m.CrmQuotesRequestComponent), canActivate: [crmAuthGuard] },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
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
      { path: 'project/1', loadComponent: () => import('./pages/projects-details/project-1/project-1.component').then(m => m.Project1Component) },
      { path: 'project/2', loadComponent: () => import('./pages/projects-details/project-2/project-2.component').then(m => m.Project2Component) },
      { path: 'project/3', loadComponent: () => import('./pages/projects-details/project-3/project-3.component').then(m => m.Project3Component) },
      { path: 'project/4', loadComponent: () => import('./pages/projects-details/project-4/project-4.component').then(m => m.Project4Component) },
      { path: 'project/5', loadComponent: () => import('./pages/projects-details/project-5/project-5.component').then(m => m.Project5Component) },
      { path: 'project/6', loadComponent: () => import('./pages/projects-details/project-6/project-6.component').then(m => m.Project6Component) },
      { path: 'project/7', loadComponent: () => import('./pages/projects-details/project-7/project-7.component').then(m => m.Project7Component) },
      { path: 'project/8', loadComponent: () => import('./pages/projects-details/project-8/project-8.component').then(m => m.Project8Component) },
      { path: 'project/9', loadComponent: () => import('./pages/projects-details/project-9/project-9.component').then(m => m.Project9Component) },
      { path: 'project/10', loadComponent: () => import('./pages/projects-details/project-10/project-10.component').then(m => m.Project10Component) },
      { path: 'starter-page', loadComponent: () => import('./pages/starter-page/starter-page.component').then(m => m.StarterPageComponent) },
      { path: '404', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent) },
      { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent) },
    ],
  },
];
