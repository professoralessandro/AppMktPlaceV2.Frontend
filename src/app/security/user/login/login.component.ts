import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public title: string;
  public email: string;
  public password: string;

  constructor(
    // private fb: FormBuilder ,
    private auth: AuthService,
    private router: Router,
    // private userStore : UserStoreService
  ) { }

  /**
   * PUBLIC MEHTHOD BEGIN
   */
  ngOnInit(): void {
    this.initComponent();
  }

  public initComponent(): void {
    this.title = "Login";
    this.password = '';
    this.email = '';
  }

  onSubmit() {
    debugger;
    if (this.validateLogin(this.email, this.password)) {
      this.auth.login({ email: this.email, password: this.password})
      .subscribe({
        next:(res)=>{
          debugger;
          this.email = null;
          this.password = null;
          debugger;
          this.auth.storeToken(res.accessToken);
          debugger;
          this.auth.storeRefreshToken(res.refreshToken);
          debugger;
          const tokenPayload = this.auth.decodeToken();
          debugger;
          // this.userStore.setFullNameFromStore(tokenPayload.unique_name);
          // this.userStore.setRoleFormStore(tokenPayload.role);
          alert(res.message);
          debugger;
          this.router.navigate(['dashboard']);
          debugger;
        },
        error:(err)=>{
          debugger;
          alert(err?.error.message)
        }
      })
    }else{
      debugger;
      alert("form is invalid");
    }
  }

  /**
   * PUBLIC MEHTHOD END
   */


  /**
   * PRIVATE MEHTHOD END
   */

  private validateLogin(email: string, password: string): boolean {
    
    return true;
  }

  /**
   * PRIVATE MEHTHOD END
   */

}
