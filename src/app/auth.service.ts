import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loginUrl = 'http://localhost:8000/api/login_check'
  private headers = {headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token')) };
  constructor(private http: HttpClient, private _router: Router) { }

  jwt: string;
  username: string;
  roles: Array<string>;

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user, this.headers)
  }

  saveToken(jwt:string){
    localStorage.setItem('acces_token', jwt);
    this.jwt=jwt;
    this.parseJWT();
  }

  loggedIn() {
return !!localStorage.getItem('token')
  }

 

  getToken() {
    return localStorage.getItem('token')
  }

  parseJWT() {
    let jwtHelper = new JwtHelperService();
    let objJWT = jwtHelper.decodeToken(this.jwt);
    this.username = objJWT.obj;
    this.roles = objJWT.roles;
    console.log(this.roles);
  }
  isSUPERADMIN(){ //Methode qui permet de verifier si c un super_admin ou pas
    if(this.roles.indexOf('ROLE_SUPERADMIN')>=0){
      return true;
    }
    return false;
  }

  isADMINPRINCIPALE(){
    return this.roles.indexOf('ROLE_ADMINPRINCIPALE')>=0;{
      return true;
    }
    return false;
  }
  isADMIN(){
    return this.roles.indexOf('ROLE_ADMIN')>=0;{
      return true;
    }
    return false;
  }

  isCAISSIER(){
    return this.roles.indexOf('ROLE_CAISSIER')>=0;{
      return true;
    }
    return false;
  }

  isAuthenticated(){
    return this.roles && (this.isSUPERADMIN() || this.isADMINPRINCIPALE() || this.isADMINPRINCIPALE() || this.isCAISSIER());

    }

  

    logOut(){
      localStorage.removeItem('token');
      localStorage.removeItem('roles');
      localStorage.removeItem('username');
      this.initParams();
      return this._router.navigate(['/login']);
    }
    
  initParams() {
    this.jwt = undefined;
    this.username = undefined;
    this.roles = undefined;
  }
}
