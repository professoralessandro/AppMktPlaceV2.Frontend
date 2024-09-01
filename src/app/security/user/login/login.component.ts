import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

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
    private commonService: CommonService
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
    if (this.validateLogin(this.email, this.password)) {
      this.auth.login({ email: this.email, password: this.password})
      .subscribe({
        next:(res)=>{
          this.email = null;
          this.password = null;
          this.auth.storeToken(res.accessToken);
          this.auth.storeRefreshToken(res.refreshToken);
          const tokenPayload = this.auth.decodeToken();
          // this.userStore.setFullNameFromStore(tokenPayload.unique_name);
          // this.userStore.setRoleFormStore(tokenPayload.role);
          alert(res.message);
          this.router.navigate(['dashboard']);
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })
    }else{
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
    var isValid = true;

    if(!this.commonService.validatedEmail(email)) {
      isValid = false;
      this.commonService.ReturnModalMessagErrorSuccess("Erro na validação do email.", false);
    }

    if(password.length < 7) {
      isValid = false;
      this.commonService.ReturnModalMessagErrorSuccess("Erro na validação da senha.", false);
    }

    return isValid;
  }

  /**
   * PRIVATE MEHTHOD END
   */

}
