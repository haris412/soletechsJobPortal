import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConfigurations } from "../models/appConfigurations";


@Injectable({
    providedIn: 'root',
})
export class AppInitiatorService {
    
    appConfiguration: AppConfigurations | undefined;
    
    constructor(private httpClient: HttpClient) { }

    async GetCompanyConfiguration() {
        this.appConfiguration = await this.httpClient.get('./assets/config/env.json').toPromise() as AppConfigurations;
    }
}