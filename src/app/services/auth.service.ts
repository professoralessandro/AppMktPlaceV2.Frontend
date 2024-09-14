import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenApiModel } from '../models/token-api-model';
import { AuthenticatedUser } from '../security/user/login/authenticated.user';
import { CommonService } from './common.service';
import { UserGroupEnum } from '../Enums/user-group.enum';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    // ATRIBUTTES
    private baseUrl: string = "http://localhost:5030/api/User/"
    private userPayload: any;

    constructor(
        private commonService: CommonService,
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

    public logOut() {
        return this.http.post<any>(`${this.baseUrl}logout`, null)
    }
    public signOut() {
        this.logOut()
        .toPromise()
        .then(() => {
            localStorage.clear();
            this.router.navigate(['login'])
        })
        .catch(c => {
            this.commonService.ReturnModalMessagErrorSuccess("Houve um erro ao fazer o logout:" + c.message, false);
        });
    }

    public storeToken(tokenValue: string) {
        localStorage.setItem('token', tokenValue);
    }

    public storeRefreshToken(tokenValue: string) {
        localStorage.setItem('refreshToken', tokenValue);
    }

    public storeUser(authUser: any) {
        localStorage.clear();
        authUser.profileImage = this.returnImageProfile(authUser);
        this.storeToken(authUser.accessToken);
        this.storeRefreshToken(authUser.refreshToken);
        localStorage.setItem('user', JSON.stringify(authUser));
    }

    public getToken() {
        return localStorage.getItem('token');
    }

    public getUser(): AuthenticatedUser {
        return JSON.parse(localStorage.getItem('user'));
    }

    public getRefreshToken() {
        return localStorage.getItem('refreshToken');
    }

    public isLoggedIn(): boolean {
        return !!localStorage.getItem('user');
    }

    public isAdminUser(): boolean {
        try
        {
            var claim = this.decodeToken();
            return claim.groupsid === new UserGroupEnum().Master ? true : false;
        }
        catch
        {
            return false;
        }
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

    private decodeToken() {
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
    private returnImageProfile(user) {
        try {
            return this.commonService.isNullOrUndefined(user.profileImage) ? './assets/img/user.jpg' : user.profileImage;
        }
        catch {
            return './assets/img/user.jpg';
        }
    }
    /*
    * PRIVATE METHODS END
    */
}