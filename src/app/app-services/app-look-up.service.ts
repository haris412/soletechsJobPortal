import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { jobsQueryParameters } from "../models/get-jobs-parameters.model";
import { apiURLs } from "../app.settings";
import { LookupParameters } from "../models/look-up.model";
import { Applicant } from "../models/applicant";

@Injectable({
    providedIn: 'root',
})
export class AppLookUpService {
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
                apiURLs.applicant.getHighestDegreeLookUp,
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
    async GetSkillLookup(
        params: LookupParameters
    ) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('dataAreaId', params.dataAreaId).
            set('languageId', params.languageId);
        return await this.httpClient
            .get<any>(
                apiURLs.applicant.getSkillLookupList,
                { params: queryParams }
            ).toPromise();
    }

    async GetRatingLevelLookupList(
        params: LookupParameters
    ) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('dataAreaId', params.dataAreaId).
            set('languageId', params.languageId);
        return await this.httpClient
            .get<any>(
                apiURLs.applicant.getRatingLevelLookupList,
                { params: queryParams }
            ).toPromise();
    }

    async GetEducationDisciplineLookupList(
        params: LookupParameters
    ) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('dataAreaId', params.dataAreaId).
            set('languageId', params.languageId);
        return await this.httpClient
            .get<any>(
                apiURLs.applicant.getEducationDisciplineLookupList,
                { params: queryParams }
            ).toPromise();
    }

    async GetEducationLevelLookupList(
        params: LookupParameters
    ) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('dataAreaId', params.dataAreaId).
            set('languageId', params.languageId);
        return await this.httpClient
            .get<any>(
                apiURLs.applicant.getEducationLevelLookupList,
                { params: queryParams }
            ).toPromise();
    }

    async getCertificateTypeLookUpList(
        params: LookupParameters
    ) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('dataAreaId', params.dataAreaId).
            set('languageId', params.languageId);
        return await this.httpClient
            .get<any>(
                apiURLs.applicant.getCertificateTypeLookUpList,
                { params: queryParams }
            ).toPromise();
    }
    
    async GetPersonalTitleLookupList(
        params: LookupParameters
    ) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('dataAreaId', params.dataAreaId).
            set('languageId', params.languageId);
        return await this.httpClient
            .get<any>(
                apiURLs.applicant.getPersonalTitleLookupList,
                { params: queryParams }
            ).toPromise();
    }
    //// Application Services

    async CreateApplicant(
        applicant: Applicant
    ) {
        return await this.httpClient
            .post<any>(
                apiURLs.applicant.createApplicant,
                applicant
            ).toPromise();
    }

    async CreateSkill(
        params: LookupParameters
    ) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('dataAreaId', params.dataAreaId).
            set('languageId', params.languageId);
        return await this.httpClient
            .get<any>(
                apiURLs.applicant.createSkill,
                { params: queryParams }
            ).toPromise();
    }

    async CreateProfessionalExperience(
        params: LookupParameters
    ) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('dataAreaId', params.dataAreaId).
            set('languageId', params.languageId);
        return await this.httpClient
            .get<any>(
                apiURLs.applicant.createProfessionalExperience,
                { params: queryParams }
            ).toPromise();
    }

    async CreateEducation(
        params: LookupParameters
    ) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('dataAreaId', params.dataAreaId).
            set('languageId', params.languageId);
        return await this.httpClient
            .get<any>(
                apiURLs.applicant.createEducation,
                { params: queryParams }
            ).toPromise();
    }

    async CreateCertificate(
        params: LookupParameters
    ) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('dataAreaId', params.dataAreaId).
            set('languageId', params.languageId);
        return await this.httpClient
            .get<any>(
                apiURLs.applicant.createCertificate,
                { params: queryParams }
            ).toPromise();
    }

    async CreateCourse(
        params: LookupParameters
    ) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('dataAreaId', params.dataAreaId).
            set('languageId', params.languageId);
        return await this.httpClient
            .get<any>(
                apiURLs.applicant.createCourse,
                { params: queryParams }
            ).toPromise();
    }
    async CreateTrustedPosition(
        params: LookupParameters
    ) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('dataAreaId', params.dataAreaId).
            set('languageId', params.languageId);
        return await this.httpClient
            .get<any>(
                apiURLs.applicant.createTrustedPosition,
                { params: queryParams }
            ).toPromise();
    }
}