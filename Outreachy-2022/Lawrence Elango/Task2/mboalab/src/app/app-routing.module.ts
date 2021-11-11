import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // home
  { path: '', loadChildren: () => import('./components/pages/home/home.module').then(m => m.HomeModule), data: { breadcrumb: 'Homepage' } },
  // Auth
  { path: 'login', loadChildren: () => import('./components/pages/login/login.module').then(m => m.LoginModule) },
  { path: 'signup', loadChildren: () => import('./components/pages/signup/signup.module').then(m => m.SignupModule) },
  { path: 'password-reset', loadChildren: () => import('./components/pages/password-reset/password-reset.module').then(m => m.PasswordResetModule) },
  { path: 'password-reset/change/:id', loadChildren: () => import('./components/pages/password-reset/password-reset.module').then(m => m.PasswordResetModule) },
  { path: 'verification/:id', loadChildren: () => import('./components/pages/account-verification/account-verification.module').then(m => m.AccountVerificationModule) },
  { path: 'verify-email/:id', loadChildren: () => import('./components/pages/verify-email/verify-email.module').then(m => m.VerifyEmailModule) },

  //Dashboards
  { path: 'dashboard', loadChildren: () => import('./components/pages/user/user.module').then(m => m.UserModule), data: { breadcrumb: 'User' } },
  { path: 'console', loadChildren: () => import('./components/pages/console/console.module').then(m => m.ConsoleModule), data: { breadcrumb: 'Admin' } },

  // About
  { path: 'about', loadChildren: () => import('./components/pages/about/about.module').then(m => m.AboutModule), data: { breadcrumb: 'About Us' } },
  // Services
  { path: 'services', loadChildren: () => import('./components/pages/services/services.module').then(m => m.ServicesModule), data: { breadcrumb: 'Services' } },
  //{ path: 'service-details', loadChildren: () => import('./components/pages/service-details/service-details.module').then(m => m.ServiceDetailsModule), data: { breadcrumb: 'Service Details' } },
  // Pages
  { path: 'faq', loadChildren: () => import('./components/pages/faq/faq.module').then(m => m.FaqModule), data: { breadcrumb: "FAQ's" } },

  { path: 'privacy', loadChildren: () => import('./components/pages/privacy/privacy.module').then(m => m.PrivacyModule), data: { breadcrumb: 'Privacy' } },
  { path: 'team', loadChildren: () => import('./components/pages/team/team.module').then(m => m.TeamModule), data: { breadcrumb: 'Team' } },
  { path: 'team-details/:id', loadChildren: () => import('./components/pages/team-details/team-details.module').then(m => m.TeamDetailsModule), data: { breadcrumb: 'Team Details' } },
  // Blog
  //{ path: 'blog/cat/:catId', loadChildren: () => import('./components/pages/blog-grid/blog-grid.module').then(m => m.BlogGridModule), data: { breadcrumb: 'Blog Grid' } },
  //{ path: 'blog/tag/:tagId', loadChildren: () => import('./components/pages/blog-grid/blog-grid.module').then(m => m.BlogGridModule), data: { breadcrumb: 'Blog Grid' } },
  //{ path: 'blog/author/:authorId', loadChildren: () => import('./components/pages/blog-grid/blog-grid.module').then(m => m.BlogGridModule), data: { breadcrumb: 'Blog Grid' } },

  { path: 'blog-grid', loadChildren: () => import('./components/pages/blog-grid/blog-grid.module').then(m => m.BlogGridModule), data: { breadcrumb: 'Blog Grid' } },
  //{ path: 'blog-standard', loadChildren: () => import('./components/pages/blog-standard/blog-standard.module').then(m => m.BlogStandardModule), data: { breadcrumb: 'Blog Standard' } },
  { path: 'blog/:id', loadChildren: () => import('./components/pages/blog-details/blog-details.module').then(m => m.BlogDetailsModule), data: { breadcrumb: 'Blog Details' } },
  // Contact
  { path: 'contact', loadChildren: () => import('./components/pages/contact/contact.module').then(m => m.ContactModule), data: { breadcrumb: 'Contact Us' } },
  { path: '**', loadChildren: () => import('./components/pages/error/error.module').then(m => m.ErrorModule), data: { breadcrumb: 'Error 404' } },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
