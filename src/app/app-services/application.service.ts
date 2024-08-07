import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Application } from "../models/applicatiom.model";
import { apiURLs } from "../app.settings";
import { AppInitiatorService } from "./app-initiator-service";


@Injectable({
    providedIn: 'root',
})
export class ApplicationService {
    apiUrl: string | undefined = "";
  constructor(private httpClient: HttpClient, public appInitiatorService: AppInitiatorService) {
    this.apiUrl = this.appInitiatorService.appConfiguration?.apiUrl;
  }
    async SaveApplication(application: Application) {
        return await this.httpClient
            .post<any>(
                this.appInitiatorService.appConfiguration?.apiUrl + apiURLs.application.createApplication, application,
            ).toPromise();
    }
}