import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { HttpCommonService } from 'src/app/services/app-http-service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-active-account',
  templateUrl: './active-account.component.html',
  styleUrls: ['./active-account.component.scss']
})
export class ActiveAccountComponent implements OnInit {

 /**
     * ATRIBUTTES
     */
 public title: string;
 public loginRoute: string;
 public userId: any;
 public token: any;

 /**
  * CONSTRUCTOR
  */
 constructor(
   private service: HttpCommonService,
   private router: ActivatedRoute,
   private commonService: CommonService,
   private loaderService: LoaderService,
 ) { }

 /**
  * ONINIT
  */
 ngOnInit(): void {
  this.loaderService.SetLoaderState(true);
   // INITIALIZE COMPONENT
   this.initializeComponent();
 }

 /**
  * PRIVATE METHODS
  */
 private initializeComponent(): void {
   this.title = 'Forgot Password';
   this.loginRoute = 'login';
   this.userId = '';
   this.token = '';
   // GET PARAMS
   this.userId = this.router.snapshot.queryParamMap.get('b');
   this.token = this.router.snapshot.queryParamMap.get('a');

   this.service.insert('security_url', 'user/active-account', { a: this.token, b: this.userId })
   .toPromise()
   .then(c => {
     this.commonService.responseActionWithNavigation
       (this.loginRoute, `sua conta foi ativada com sucesso.`, true);
   })
   .catch(e => {
    this.commonService.responseActionWithNavigation
       (this.loginRoute, `Houve um erro na ativação da sua conta.`, false);
   });
 }

}
