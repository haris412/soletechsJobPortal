import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponse } from "../shared/models/api-response.model";
import { PagedResult } from "../shared/models/pages-result.model";
import { apiURLs } from "../app.settings";
import { jobsQueryParameters } from "../models/get-jobs-parameters.model";
import { JobDetailParameter } from "../models/job-detail-parameter";

@Injectable({
    providedIn: 'root',
})
export class RecruitmentService {
    constructor(private httpClient: HttpClient) { }

    async GetRecruitmentInformationList(
        token: string
    ) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('accessToken', token);
        return await this.httpClient
            .get<ApiResponse<PagedResult<any>>>(
                apiURLs.recrutmentProjects.GetRecruitmentInformationListAsync, {
                params: queryParams
            }
            ).toPromise();
    }

    async GetRecruitmentProjectsList(
        params: jobsQueryParameters,
        token: string
    ) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('companyId', 'a').
            set('accessToken', token).
            set('dataAreaId', params._dataAreaId).
            set('languageId', params._languageId)
        return await this.httpClient
            .get<any>(
                apiURLs.recrutmentProjects.getRecruitmentProjectsList,
                { params: queryParams }
            ).toPromise();
    }

    async AuthenticationByCompanyIdAsync(
        companyId: string
    ) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('companyId', 'a');
        return await this.httpClient
            .get<any>(
                apiURLs.recrutmentProjects.authenticationByCompanyIdAsync, { params: queryParams },
            ).toPromise();
    }

    async GetJobDetail(params: JobDetailParameter) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('jobId', params._jobRecid).
            set('dataAreaId', params._dataAreaId).
            set('languageId', params._languageId)
        return await this.httpClient
            .get<any>(
                apiURLs.recrutmentProjects.getJobDetails, { params: queryParams },
            ).toPromise();
    }

}