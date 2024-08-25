import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpCommonService } from 'src/app/services/app-http-service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  /**
   * ATRIBUTTES
   */
  public title: string;
  public loginRoute: string;
  public email: string;

  /**
   * CONSTRUCTOR
   */
  constructor(
    private service: HttpCommonService,
    private router: ActivatedRoute,
    private commonService: CommonService) { }

  /**
   * ONINIT
   */
  ngOnInit(): void {
    this.initializeComponent();
  }

  /**
   * PUBLIC METHODS
   */

  public onSubmit(): void {
    this.service.insert('security_url', `User/forgot-password?email=${this.email}`, null)
      .toPromise()
      .then(c => {
        this.commonService.responseActionWithNavigation
          (this.loginRoute, `Caso seu email esteja cadastrado na base de dados<br>você receberá um email na sua caixa de mensagem<br>com as instruções para resetar a sua senha.`, true);
      })
      .catch(e => {
        this.commonService.responseActionWithNavigation(this.loginRoute, e.error, false);
      });
  }

  /**
   * PRIVATE METHODS
   */
  private initializeComponent(): void {
    this.title = 'Forgot Password';
    this.loginRoute = '../../security/login';
    this.email = '';
  }
}
