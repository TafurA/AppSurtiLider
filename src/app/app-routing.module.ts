import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SessionGuard } from './guard/session.guard';

const routes: Routes = [

  // TODO: review this path 
  {
    path: 'styleguide',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },

  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterPageModule),
    // canActivate: [SessionGuard]
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomePageModule)
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'updated-password',
    loadChildren: () => import('./pages/auth/updated-password/updated-password.module').then(m => m.UpdatedPasswordPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'sidebar-menu',
    loadChildren: () => import('./pages/sidebar-menu/sidebar-menu.module').then(m => m.SidebarMenuPageModule)
  },
  {
    path: 'favorite',
    loadChildren: () => import('./pages/auth/favorite/favorite.module').then(m => m.FavoritePageModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryPageModule)
  },
  {
    path: 'categoria/detail-category/:nameCategory/:idCategory',
    loadChildren: () => import('./pages/detail-category/detail-category.module').then(m => m.DetailCategoryPageModule)
  },
  {
    path: 'offert',
    loadChildren: () => import('./pages/offert/offert/offert.module').then( m => m.OffertPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/auth/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'order-history',
    loadChildren: () => import('./pages/auth/order-history/order-history.module').then( m => m.OrderHistoryPageModule)
  },
  {
    path: 'providers',
    loadChildren: () => import('./pages/providers/providers.module').then( m => m.ProvidersPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
