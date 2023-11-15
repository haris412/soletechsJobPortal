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
        GetEthnicOriginLookup:`${environment.apiUrl}/ERPLookups/GetEthnicOrigin_Lookup`,
        GetNativeLanguageCodeLookup:`${environment.apiUrl}/ERPLookups/GetNativeLanguageCode_Lookup`,
        GetHighestDegreeLookups:`${environment.apiUrl}/ERPLookups/GetHighestDegree_Lookup`,
        GetReasonCodeLookups:`${environment.apiUrl}/ERPLookups/GetReasonCode_Lookup`,
        GetIdentificationTypeLookup:`${environment.apiUrl}/ERPLookups/GetIdentificationType_Lookup`,
        GetCityLookup:`${environment.apiUrl}/ERPLookups/GetCity_Lookup`,
    },
    application: {
        createApplication: `${environment.apiUrl}/ERPApplication/CreateApplication`,
    },
    applicant:{
        createApplicant: `${environment.apiUrl}/ERPApplicant/CreateApplicant`,
        getHighestDegreeLookUp:`${environment.apiUrl}/ERPApplicant/GetHighestDegreeLookUpList`,
        GetAddressLookUp:`${environment.apiUrl}/ERPApplicant/GetAddressLookUp`,
        getSkillLookupList:`${environment.apiUrl}/ERPApplicant/GetSkillLookupList`,
        getRatingLevelLookupList:`${environment.apiUrl}/ERPApplicant/GetRatingLevelLookupList`,
        getEducationDisciplineLookupList:`${environment.apiUrl}/ERPApplicant/GetEducationDisciplineLookupList`,
        getEducationLevelLookupList:`${environment.apiUrl}/ERPApplicant/GetEducationLevelLookupList`,
        getEducationInstitutionLookupList:`${environment.apiUrl}/ERPApplicant/GetEducationInstitutionLookupList`,
        getCertificateTypeLookUpList:`${environment.apiUrl}/ERPApplicant/GetCertificateTypeLookUpList`,
        getSkillsList:`${environment.apiUrl}/ERPApplicant/GetSkillsList`,
        getProfessionalList:`${environment.apiUrl}/ERPApplicant/GetProfessionalList`,
        getPersonalTitleLookupList:`${environment.apiUrl}/ERPApplicant/GetPersonalTitleLookupList`,  
        createSkill:`${environment.apiUrl}/ERPApplicant/CreateSkill`, 
        createProfessionalExperience:`${environment.apiUrl}/ERPApplicant/CreateProfessionalExperience`, 
        createEducation:`${environment.apiUrl}/ERPApplicant/CreateEducation`, 
        createCertificate:`${environment.apiUrl}/ERPApplicant/CreateCertificate`, 
        createCourse:`${environment.apiUrl}/ERPApplicant/CreateCourse`, 
        createTrustedPosition:`${environment.apiUrl}/ERPApplicant/createTrustedPosition`,

    }
}