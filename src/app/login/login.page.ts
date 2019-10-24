import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginUserData = {}
  jwt = new JwtHelperService;


   role : any;
 
   constructor(private _auth: AuthService, private route:Router) { }

   loginUser() {
     this._auth.loginUser(this.loginUserData)
       .subscribe(
         res =>{
           console.log(res),
           localStorage.setItem('token', res.token)
             const Decode=this.jwt.decodeToken(res.token);
             const roles=Decode.roles[0];
           localStorage.setItem('username', Decode.username);
           localStorage.setItem('roles', Decode.roles);

           this.route.navigate(['/transaction'])
 
           // if(roles.indexOf('ROLE_Super_Admin')>=0){
           //   this.route.navigate(['/ajou'])
           // }
 
           // if(roles.indexOf('ROLE_Admin_Principal')>=0){
           //   alert("ok")
           //   this.route.navigate(['/ajouU'])
           // }
 
           // if(roles.indexOf('ROLE_Admin')>=0){
           //   this.route.navigate(['/envoi'])
           // }
         },
 
         err => console.log(err)
       );
   }
     
   ngOnInit(): void{
     this.getRole();
   }
 
   isSUPERADMIN(){
     return this._auth.isSUPERADMIN();
   }
 
   isAdMINPRINCIPALE(){
     return this._auth.isADMINPRINCIPALE();
   }
 
   isADMIN(){
     return this._auth.isADMIN();
   }

   isCAISSIER(){
     return this._auth.isCAISSIER();
   }

   isAuthenticated(){
     return this._auth.isAuthenticated();
   }
 
 
   logOut(){
     localStorage.removeItem('token')
     return this.route.navigate(['/login']);
   }
   getRole(){
     this.role = localStorage.getItem('roles');
     console.log(this.role);
     return this.role;
   
   }

}
