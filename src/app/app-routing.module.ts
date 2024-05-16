import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TablesComponent } from './pages/tables/tables.component';
import { FormsComponent } from './pages/forms/forms.component';
import { TypographyComponent } from './pages/typography/typography.component';
import { MapsComponent } from './pages/maps/maps.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';

const routes: Routes = [
  {path: '',   redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'forms', component: FormsComponent},
  {path: 'tables', component: TablesComponent},
  {path: 'typography', component: TypographyComponent},
  {path: 'maps', component: MapsComponent},
  {path: 'notifications', component: NotificationsComponent},

  { path: 'cadastros', loadChildren: () => import('./cadastros/cadastros.module').then(m => m.CadastrosModule) },
  { path: 'store', loadChildren: () => import('./store/store.module').then(m => m.StoreModule) },
  // {path: 'buscateste', component: TiposTelefonesComponent},
  // {path: 'cadastroteste', component: CadastrosTiposTelefonesComponent},
  // {path: 'buscateste/edicaoteste/:id', component: CadastrosTiposTelefonesComponent}
];

@NgModule({
  // ERROR
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
