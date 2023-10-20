import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL = 'https://reqres.in';
@Injectable({
    providedIn: 'root'
})
export class LinkedInService {

  constructor(private http: HttpClient) { }
  clientId:string = '86ykg7fe4magrl';
  clientSecret:string = '9WRk82y2qSNdOKej';
  public GetAccessToken(url:any, code:string,redirectUrl:string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Accept':'*/*' , 'grant_type' : 'client_credentials','redirect_uri':redirectUrl, 'client_id': this.clientId , 'client_secret': this.clientSecret ,'code': code  });
    return this.http.post(url,{headers} ).pipe(map(res => console.log(res)));
  }

  public GetUserInfoLinkedIn(accessToken:string){
    const headers = new HttpHeaders({ 'Accept':'*/*' , 'Bearer' : accessToken });
    let url ='https://api.linkedin.com/v2/userinfo';
    return this.http.get(url,{headers} ).pipe(map(res => console.log(res)));
  }
}