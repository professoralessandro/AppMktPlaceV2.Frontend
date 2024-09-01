import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/dto/UserProfile';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public isSysAdmin: boolean;
  public imgError: string;

  // USER ATRIBUTTES
  public user: UserProfile;

  constructor(private auth: AuthService) { }

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
    this.isSysAdmin = false;
    this.isSysAdmin = this.validateIsSysAdmin();
    this.imgError = './assets/img/user.jpg';
    // LOAD PERSONAL PROFILE INFORMATION
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  private validateIsSysAdmin(): boolean {
    return true;
  }
}
