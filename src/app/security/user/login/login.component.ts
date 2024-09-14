import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { QueryParameter } from 'src/app/models/query-parameter';
import { HttpCommonService } from 'src/app/services/app-http-service';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { AuthenticatedUser } from './authenticated.user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // ATRIBUTTES
  public title: string = '';
  public email: string = '';
  public password: string = '';
  public storeRoute: string = '';

  // QUERY PARAMETER
  public parameters: QueryParameter[];

  //AuthenticatedUser
  public authUser: AuthenticatedUser = new AuthenticatedUser();

  constructor(
    private auth: AuthService,
    private router: Router,
    private commonService: CommonService,
    private loaderService: LoaderService,
    private service: HttpCommonService
  ) { }

  /**
   * PUBLIC MEHTHOD BEGIN
   */
  ngOnInit(): void {
    // IF IF LOGGED IN RETUN TO STORE
    if(this.auth.isLoggedIn()) this.router.navigate([this.storeRoute]);

    this.loaderService.SetLoaderState(true);
    this.initComponent();
    this.loaderService.SetLoaderState(false);
  }

  public initComponent(): void {
    this.title = "Login";
    this.password = '';
    this.email = '';
    this.storeRoute = 'store';
    this.parameters = [];
    this.authUser = new AuthenticatedUser();
  }

  onSubmit() {
    this.loaderService.SetLoaderState(true);
    if (this.validateLogin(this.email, this.password)) {
      this.auth.login({ email: this.email, password: this.password })
        .toPromise()
        .then(user => {
          if (user.isSuccess) {
            debugger;
            this.email = null;
            this.password = null;
            let authUser = user.jsonObject;
            //QUERY PARAMETERS
            this.parameters = [
              { parameter: 'externalReferenceId', value: authUser.identifier },
              { parameter: 'isDownloaFile', value: true }
            ];
            this.service.getAllNew('storage_url', 'storagefile/getall', this.parameters)
              .toPromise()
              .then(image => {
                debugger;
                let profileImage: any;
                if (image.isSuccess) {
                  profileImage = image.jsonObject.find(c => c.description.toString().includes('PROFILE IMAGE'));
                }
                const usr = this.setUserAuthenticated(authUser, 'data:image/jpeg;base64,' + profileImage.file);
                this.auth.storeUser(usr);
                this.router.navigate([this.storeRoute]);
              })
              .catch(e => {
                debugger;
                this.loaderService.SetLoaderState(false);
                this.commonService.ReturnModalMessagErrorSuccess("Houve um erro ao fazer o login.", false);
              });
          }
          else
          {
            this.loaderService.SetLoaderState(false);
            this.commonService.ReturnModalMessagErrorSuccess("O usuário não foi encontrado.", false);
          }
        })
        .catch(error => {
          this.loaderService.SetLoaderState(false);
          this.commonService.ReturnModalMessagErrorSuccess("Houve um erro ao efetivar o login: " + error, false);
        });
    } else {
      this.loaderService.SetLoaderState(false);
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

    if (this.commonService.validatedEmail(email)) {
      isValid = false;
      this.commonService.ReturnModalMessagErrorSuccess("Erro na validação do email.", false);
    }

    if (password.length < 7) {
      isValid = false;
      this.commonService.ReturnModalMessagErrorSuccess("Erro na validação da senha.", false);
    }

    return isValid;
  }

  private setUserAuthenticated(user: any, image: string): AuthenticatedUser
  {
    try
    {
      // SET ATRIBITTES
      const authUser = new AuthenticatedUser();
      authUser.identifier = user.identifier;
      authUser.profileImage = image;
      authUser.accessToken = user.accessToken;
      authUser.refreshToken = user.refreshToken;
      authUser.email = user.email;
      authUser.nome = user.nome;
      authUser.userName = user.userName;
      authUser.groupName = user.groupName;
      return authUser;
    }
    catch
    {
      return null;
    }
  }

  /**
   * PRIVATE MEHTHOD END
   */

}
