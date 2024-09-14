import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/components/loader/loader.service';
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
    private commonService: CommonService,
    private loaderService: LoaderService,) { }

  /**
   * ONINIT
   */
  ngOnInit(): void {
    this.loaderService.SetLoaderState(true);
    this.initializeComponent();
    this.loaderService.SetLoaderState(false);
  }

  /**
   * PUBLIC METHODS
   */

  public onSubmit(): void {
    this.loaderService.SetLoaderState(true);
    if(this.validateEmail(this.email)){
      this.service.insert('security_url', `user/send-forgot-password-email?email=${this.email}`, null)
      .toPromise()
      .then(c => {
        this.commonService.responseActionWithNavigation
          (this.loginRoute, `Caso seu email esteja cadastrado na base de dados<br>você receberá um email na sua caixa de mensagem<br>com as instruções para resetar a sua senha.`, true);
      })
      .catch(e => {
        this.commonService.responseActionWithNavigation
          (this.loginRoute, `Houve um erro no reset da senha.`, false);
      });
    }
  }

  /**
   * PRIVATE METHODS
   */
  private initializeComponent(): void {
    this.title = 'Forgot Password';
    this.loginRoute = 'login';
    this.email = '';
  }

  private validateEmail(email: string): boolean {
    var isValid = true;

    if(this.commonService.validatedEmail(email)) {
      isValid = false;
      this.commonService.ReturnModalMessagErrorSuccess("Erro na validação do email.", false);
    }

    return isValid;
  }
}
