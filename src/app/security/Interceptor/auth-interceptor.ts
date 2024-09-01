import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
 
  constructor(private injector: Injector) { }
 
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loginService = this.injector.get(AuthService);
 
    if (loginService.isLoggedIn()) {
      const authRequest = request.clone(
        { setHeaders:{'Authorization': `Bearer ${loginService.getToken()}`}});
 
      return next.handle(authRequest);
    } else {
      return next.handle(request);
    }
  }
}