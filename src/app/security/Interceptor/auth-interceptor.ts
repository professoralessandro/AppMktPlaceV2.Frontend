import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
 
  constructor(
    private auth: AuthService
  ) { }
 
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isLoggedIn()) {
      const authRequest = request.clone(
        { setHeaders:{"Authorization": "Bearer " + this.auth.getUser().accessToken}});
      return next.handle(authRequest);
    } else {
      return next.handle(request);
    }
  }
}