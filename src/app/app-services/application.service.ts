import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Application } from "../models/applicatiom.model";
import { apiURLs } from "../app.settings";


@Injectable({
    providedIn: 'root',
})
export class ApplicationService {
    constructor(private httpClient: HttpClient) { }
    async SaveApplication(jobApplication: Application) {
        return await this.httpClient
            .post<any>(
                apiURLs.application.createApplication, jobApplication,
            ).toPromise();
    }
}