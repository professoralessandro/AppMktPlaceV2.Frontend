import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenApiModel } from '../models/token-api-model';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    // ATRIBUTTES
    private baseUrl: string = "https://localhost:7052/api/User/";
    private userPayload: any;

    constructor(
        private http: HttpClient,
        private router: Router) {
        this.userPayload = this.decodeToken();
    }
    /*
    * PUBLIC METHODS BEGIN
    */
    public signUp(userObj: any) {
        return this.http.post<any>(`${this.baseUrl}register`, userObj)
    }
    public login(loginObj: any) {
        return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj)
    }
    public signOut() {
        localStorage.clear();
        this.router.navigate(['login'])
    }
    /*
    * PUBLIC METHODS END
    */

    /*
    * PRIVATE METHODS BEGIN
    */
    private storeToken(tokenValue: string) {
        localStorage.setItem('token', tokenValue);
    }

    private storeRefreshToken(tokenValue: string) {
        localStorage.setItem('refreshToken', tokenValue);
    }

    private getToken() {
        return localStorage.getItem('token');
    }

    private getRefreshToken() {
        return localStorage.getItem('refreshToken');
    }

    private isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
    }

    private getFullNameFromToken() {
        if (this.userPayload)
            return this.userPayload.unique_name;
    }
    private getRoleFromToken() {
        if (this.userPayload)
            return this.userPayload.role;
    }
    private renewToken(tokenApi: TokenApiModel) {
        return this.http.post<any>(`${this.baseUrl}refresh`, tokenApi)
    }

    private decodeToken() {
        const jwtHelper = new JwtHelperService();
        const token = this.getToken()!;
        console.log(jwtHelper.decodeToken(token));

        return jwtHelper.decodeToken(token);
    }


    /*
    * PRIVATE METHODS END
    */
}