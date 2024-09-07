import { Component, OnInit } from '@angular/core';
import { AuthenticatedUser } from 'src/app/security/user/login/authenticated.user';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public imgError: string;

  constructor(
    private auth: AuthService,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.initializeComponent();
  }

  /**
   * PUBLIC METHOD
   */

  public _isLoggedIn(): boolean{
    return this.auth.isLoggedIn();
  }

  public handleMissingImage() {
    return this.imgError;
  }

  public signOut() {
    this.auth.signOut();
  }

  /**
   * PRIVATE METHOD
   */
  private initializeComponent(): void {
    this.imgError = './assets/img/user.jpg';
  }
}
