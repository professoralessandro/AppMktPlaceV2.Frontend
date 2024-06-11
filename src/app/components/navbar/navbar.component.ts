import { AppService } from './../../services/app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private appService: AppService) { }
  isCollapsed = true;
  isSysAdmin: boolean;
  ngOnInit() {
    this.initializeComponent();
  }

  toggleSidebarPin() {
    this.appService.toggleSidebarPin();
  }
  toggleSidebar() {
    this.appService.toggleSidebar();
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
