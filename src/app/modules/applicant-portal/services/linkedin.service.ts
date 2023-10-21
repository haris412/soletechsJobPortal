import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const API_URL = 'https://reqres.in';
@Injectable({
    providedIn: 'root'
})
export class LinkedInService {

  accessToken: string = '';
  userInfo: any;

  constructor(private http: HttpClient) { }

  public GetAccessToken(url: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/Lookup/GetAccessToken?${url}`);
  }

  public GetUserInfoLinkedIn(): Observable<any>  {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.accessToken });
    let url = `${environment.apiUrl}/Lookup/GetUserInfo?accessToken=${this.accessToken}`;
    return this.http.get(url, {headers: headers} );
  }
}