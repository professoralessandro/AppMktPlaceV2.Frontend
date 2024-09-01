import { AuthService } from 'src/app/services/auth.service';
import { AppService } from './../../services/app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private appService: AppService,
    private auth: AuthService
  ) { }

  public isCollapsed = true;
  public isSysAdmin: boolean;

  ngOnInit() {
    this.initializeComponent();
  }

  /**
   * PUBLIC METHOD
   */

  public toggleSidebarPin() {
    this.appService.toggleSidebarPin();
  }
  public toggleSidebar() {
    this.appService.toggleSidebar();
  }

  public _isLoggedIn(): boolean{
    return this.auth.isLoggedIn();
  }

  /**
   * PRIVATE METHOD
   */
  private initializeComponent(): void {
    this.isSysAdmin = false;
    this.isSysAdmin = this.validateIsSysAdmin();
  }

  private validateIsSysAdmin(): boolean {
    return true;
  }
}
