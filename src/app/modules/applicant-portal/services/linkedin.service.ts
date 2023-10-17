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
  public GetAccessToken(url:any, code:string): Observable<any> {
    const headers = new HttpHeaders({ 'code': code , 'clientId': this.clientId , 'clientSecret':this.clientSecret })
    return this.http.get(API_URL + '/api/' + url , {
        headers
    }).pipe(map(res => res));
  }
}