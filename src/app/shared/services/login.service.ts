import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { apiURLs } from "src/app/app.settings";
import { Login } from "src/app/models/login.model";

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    constructor(private httpClient: HttpClient) { }

    
    async Login(
        usrInfo: Login
    ) {
        return await this.httpClient
            .post<any>(
                apiURLs.applicant.login,
                usrInfo
            ).toPromise();
    }
}