import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TablesComponent } from './pages/tables/tables.component';
import { FormsComponent } from './pages/forms/forms.component';
import { TypographyComponent } from './pages/typography/typography.component';
import { MapsComponent } from './pages/maps/maps.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './components/loader/loader.component';
import { NgxLoadingModule } from 'ngx-loading';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { ConfirmService } from './components/confirm/confirm.service';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './security/Interceptor/auth-interceptor';
import { HttpCommonService } from './services/app-http-service';
import { TooltipDirective } from './diretives/tooltip.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    TablesComponent,
    FormsComponent,
    TypographyComponent,
    MapsComponent,
    NotificationsComponent,
    LoaderComponent,
    AlertModalComponent,
    TooltipDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    ToastrModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    ModalModule.forRoot(),
  ],
  providers: [
    ConfirmService,
    BsModalRef,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    HttpCommonService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  entryComponents: [
    AlertModalComponent
  ],
  bootstrap: [AppComponent],
  exports: [
    AlertModalComponent,
  ]
})
export class AppModule { }
