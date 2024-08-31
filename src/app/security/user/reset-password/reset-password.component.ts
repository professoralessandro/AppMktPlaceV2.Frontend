import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpCommonService } from 'src/app/services/app-http-service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  /**
     * ATRIBUTTES
     */
  public title: string;
  public loginRoute: string;
  public userId: any;
  public token: any;
  public password: string;
  public repeatPassword: string;

  /**
   * CONSTRUCTOR
   */
  constructor(
    private service: HttpCommonService,
    private router: ActivatedRoute,
    private commonService: CommonService
  ) { }

  /**
   * ONINIT
   */
  ngOnInit(): void {
    // INITIALIZE COMPONENT
    this.initializeComponent();
  }

  /**
   * PUBLIC METHODS
   */
  public onSubmit(): void {
    if(this.validateRequest(this.password, this.repeatPassword)) {
      debugger;
      this.service.insert('security_url', 'user/reset-password', { a: this.token, b: this.userId, password: this.password })
      .toPromise()
      .then(c => {
        this.commonService.responseActionWithNavigation
          (this.loginRoute, `Caso seu email esteja cadastrado na base de dados<br>você receberá um email na sua caixa de mensagem<br>com as instruções para resetar a sua senha.`, true);
      })
      .catch(e => {
        this.commonService.responseActionWithNavigation(this.loginRoute, e.error, false);
      });
    }
  }

  /**
   * PRIVATE METHODS
   */
  private initializeComponent(): void {
    this.title = 'Forgot Password';
    this.loginRoute = '../../security/login';
    this.userId = '';
    this.token = '';
    this.password = '';
    this.repeatPassword = '';

    // GET PARAMS
    this.userId = this.router.snapshot.queryParamMap.get('b');
    this.token = this.router.snapshot.queryParamMap.get('a');
  }

  private validateRequest(password: string, repeatPassword: string): boolean {
    if(password !== repeatPassword) {
      this.commonService.ReturnModalMessagErrorSuccess("As senhas devem ser iguais.", false);
      return false;
    }

    this.commonService.validatePassword(password);

    return true;
  }
}
