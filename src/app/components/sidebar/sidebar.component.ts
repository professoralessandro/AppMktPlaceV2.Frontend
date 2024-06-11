import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isSysAdmin: boolean;

  constructor() { }

  ngOnInit() {
    this.initializeComponent();
  }

  /**
   * PRIVATE METHOD
   */
  private initializeComponent(): void {
    this.isSysAdmin = false;
    // this.isSysAdmin = this.validateIsSysAdmin();
  }

  private validateIsSysAdmin(): boolean {
    return true;
  }
}
