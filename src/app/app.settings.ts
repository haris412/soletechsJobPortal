import { environment } from './../environments/environment';
export const apiURLs = {
    recrutmentProjects: {
        GetRecruitmentInformationListAsync: `${environment.apiUrl}/ERPAuthentication/GetRecruitmentInformationList`,
        getRecruitmentProjectsList: `${environment.apiUrl}/ERPAuthentication/getRecruitmentProjectsList`,
        authenticationByCompanyIdAsync:`${environment.apiUrl}/ERPAuthentication/AuthenticationByCompanyId`,
        getJobDetails:`${environment.apiUrl}/ERPAuthentication/GetJobDetails`
    },
    lookUps: {
        getDepartmentLookup: `${environment.apiUrl}/MPRecruitment_Projects/getDepartment_Lookup`,
        getJobLookup: `${environment.apiUrl}/MPRecruitment_Projects/getJob_Lookup`,
        getWorkerLookup: `${environment.apiUrl}/MPRecruitment_Projects/getWorker_Lookup`,
        getRecrutmentLookUp: `${environment.apiUrl}MPRecruitment_Projects/getRecruitment_Lookup`,
        getMediaLookUp: `${environment.apiUrl}/MPRecruitment_Projects/getMedia_Lookup`,
        getReasonCodeLookup: `${environment.apiUrl}/MPRecruitment_Projects/getReasonCode_Lookup`,
        getApplicantionLookup: `${environment.apiUrl}/MPRecruitment_Projects/getApplicantion_Lookup`,
        getContractWorkerLookup: `${environment.apiUrl}/MPRecruitment_Projects/getContractWorker_Lookup`,
        getRecruitmentLookup:`${environment.apiUrl}/ERPLookups/GetRecruitment_Lookup`,
        getCountryRegionLookup:`${environment.apiUrl}/ERPLookups/GetCountryRegion_Lookup`,
        getHighestDegreeLookUp:`${environment.apiUrl}/ERPApplicant/GetHighestDegreeLookUp`,
        GetAddressLookUp:`${environment.apiUrl}/ERPApplicant/GetAddressLookUp`
    },
    application: {
        createApplication: `${environment.apiUrl}MPRecruitment_Application/createApplication`,
    }

}