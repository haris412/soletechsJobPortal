import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppInitiatorService } from "src/app/app-services/app-initiator-service";
import { apiURLs } from "src/app/app.settings";
import { Login } from "src/app/models/login.model";

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    
    apiUrl: string | undefined = "";

  constructor(private httpClient: HttpClient, public appInitiatorService: AppInitiatorService) {
    this.apiUrl = this.appInitiatorService.appConfiguration?.apiUrl;
  }
    
    async Login(
        usrInfo: Login
    ) {
        return await this.httpClient
            .post<any>(
                this.appInitiatorService.appConfiguration?.apiUrl + apiURLs.applicant.login,
                usrInfo
            ).toPromise();
    }
}