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
    const headers = new HttpHeaders({ 'Accept':'*/*' , 'grant_type' : 'authorization_code','redirect_uri':redirectUrl, 'client_id': this.clientId , 'client_secret': this.clientSecret ,'code': code  });
    return this.http.get(url,{headers} ).pipe(map(res => console.log(res)));
  }
}