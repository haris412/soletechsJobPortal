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

    async GetHighestDegreeLookUp(
        params: LookupParameters
    ) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('dataAreaId', params.dataAreaId).
        set('languageId', params.languageId);
        return await this.httpClient
            .get<any>(
                apiURLs.lookUps.getHighestDegreeLookUp,
                { params: queryParams }
            ).toPromise();
    }

    async GetEthnicOriginLookup(
        params: LookupParameters
    ) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('dataAreaId', params.dataAreaId).
            set('languageId', params.languageId);
        return await this.httpClient
            .get<any>(
                apiURLs.lookUps.GetEthnicOriginLookup,
                { params: queryParams }
            ).toPromise();
    }

    async GetNativeLanguageCodeLookup(
        params: LookupParameters
    ) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('dataAreaId', params.dataAreaId).
            set('languageId', params.languageId);
        return await this.httpClient
            .get<any>(
                apiURLs.lookUps.GetNativeLanguageCodeLookup,
                { params: queryParams }
            ).toPromise();
    }

    async GetHighestDegreeLookups(
        params: LookupParameters
    ) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('dataAreaId', params.dataAreaId).
            set('languageId', params.languageId);
        return await this.httpClient
            .get<any>(
                apiURLs.lookUps.GetHighestDegreeLookups,
                { params: queryParams }
            ).toPromise();
    }

    async GetReasonCodeLookups(
        params: LookupParameters
    ) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('dataAreaId', params.dataAreaId).
            set('languageId', params.languageId);
        return await this.httpClient
            .get<any>(
                apiURLs.lookUps.GetReasonCodeLookups,
                { params: queryParams }
            ).toPromise();
    }

    async GetIdentificationTypeLookup(
        params: LookupParameters
    ) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('dataAreaId', params.dataAreaId).
            set('languageId', params.languageId);
        return await this.httpClient
            .get<any>(
                apiURLs.lookUps.GetIdentificationTypeLookup,
                { params: queryParams }
            ).toPromise();
    }

    async GetCityLookup(
        params: LookupParameters, countryId: string
    ) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('countryId', countryId).set('dataAreaId', params.dataAreaId).
            set('languageId', params.languageId);
        return await this.httpClient
            .get<any>(
                apiURLs.lookUps.GetCityLookup,
                { params: queryParams }
            ).toPromise();
    }
}