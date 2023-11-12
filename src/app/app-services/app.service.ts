import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { jobsQueryParameters } from "../models/get-jobs-parameters.model";
import { apiURLs } from "../app.settings";
import { LookupParameters } from "../models/look-up.model";

@Injectable({
    providedIn: 'root',
})
export class LookUpService {
    constructor(private httpClient: HttpClient) { }

    async GetRecruitmentLookup(
        params: LookupParameters
    ) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('dataAreaId', params.dataAreaId).
        set('languageId', params.languageId)
        return await this.httpClient
            .get<any>(
                apiURLs.lookUps.getRecruitmentLookup,
                { params: queryParams }
            ).toPromise();
    }

    async GetCountryRegionLookup(
        params: LookupParameters
    ) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('dataAreaId', params.dataAreaId).
        set('languageId', params.languageId);
        return await this.httpClient
            .get<any>(
                apiURLs.lookUps.getCountryRegionLookup,
                { params: queryParams }
            ).toPromise();
    }

}