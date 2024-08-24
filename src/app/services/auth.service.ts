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
    
    public storeToken(tokenValue: string) {
        localStorage.setItem('token', tokenValue);
    }

    public storeRefreshToken(tokenValue: string) {
        localStorage.setItem('refreshToken', tokenValue);
    }

    public getToken() {
        return localStorage.getItem('token');
    }

    public getRefreshToken() {
        return localStorage.getItem('refreshToken');
    }

    public isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
    }

    public getFullNameFromToken() {
        if (this.userPayload)
            return this.userPayload.unique_name;
    }
    public getRoleFromToken() {
        if (this.userPayload)
            return this.userPayload.role;
    }
    private renewToken(tokenApi: TokenApiModel) {
        return this.http.post<any>(`${this.baseUrl}refresh`, tokenApi)
    }

    public decodeToken() {
        const jwtHelper = new JwtHelperService();
        const token = this.getToken()!;
        console.log(jwtHelper.decodeToken(token));

        return jwtHelper.decodeToken(token);
    }
    /*
    * PUBLIC METHODS END
    */


    
    /*
    * PRIVATE METHODS BEGIN
    */


    /*
    * PRIVATE METHODS END
    */
}