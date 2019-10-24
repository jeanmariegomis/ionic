import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransService {

  private headers= new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));

  private token=localStorage.getItem('token');

  constructor(private httpClient: HttpClient) { }
  envoiArgent(user){
    return this.httpClient.post<any>("http://127.0.0.1:8000/api/envoi", user,{headers:this.headers,observe:'response'});
  }

  retraitArgent(user){
    return this.httpClient.post<any>("http://127.0.0.1:8000/api/retrait", user,{headers:this.headers,observe:'response'});
  }
}
