import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TablesComponent } from './pages/tables/tables.component';
import { FormsComponent } from './pages/forms/forms.component';
import { TypographyComponent } from './pages/typography/typography.component';
import { MapsComponent } from './pages/maps/maps.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { LoginComponent } from './security/user/login/login.component';
import { ResetPasswordComponent } from './security/user/reset-password/reset-password.component';
import { ActiveAccountComponent } from './security/user/active-account/active-account.component';
import { ProductComponent } from './store/product/product.component';

const routes: Routes = [
  { path: '',   redirectTo: '/store', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'forms', component: FormsComponent},
  { path: 'tables', component: TablesComponent},
  { path: 'typography', component: TypographyComponent},
  { path: 'maps', component: MapsComponent},
  { path: 'notifications', component: NotificationsComponent},
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'active-account', component: ActiveAccountComponent },
  { path: 'login', component: LoginComponent },
  { path: 'store', component: ProductComponent },

  { path: 'cadastros', loadChildren: () => import('./cadastros/cadastros.module').then(m => m.CadastrosModule) },
  { path: 'store', loadChildren: () => import('./store/store.module').then(m => m.StoreModule) },
  { path: 'security', loadChildren: () => import('./security/security.module').then(m => m.SecurityModule) },
  // {path: 'buscateste', component: TiposTelefonesComponent},
  // {path: 'cadastroteste', component: CadastrosTiposTelefonesComponent},
  // {path: 'buscateste/edicaoteste/:id', component: CadastrosTiposTelefonesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
