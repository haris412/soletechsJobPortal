import { environment } from './../environments/environment';
export const apiURLs = {
    recrutmentProjects: {
        GetRecruitmentInformationListAsync: `${environment.apiUrl}/ERPAuthentication/GetRecruitmentInformationList`,
        getRecruitmentProjectsList: `${environment.apiUrl}/ERPAuthentication/getRecruitmentProjectsList`,
        authenticationByCompanyIdAsync:`${environment.apiUrl}/ERPAuthentication/AuthenticationByCompanyId`,
        getJobDetails:`${environment.apiUrl}/ERPAuthentication/GetJobDetails`,
        myApplicationJobList:`${environment.apiUrl}/ERPAuthentication/MyApplicationJobList`,
        getStartedRecruitingList:`${environment.apiUrl}/ERPAuthentication/GetStartedRecruitingList`,
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
        myApplicationJobList:`${environment.apiUrl}/ERPApplication/MyApplicationJobList`,
        jobOfferDetails:`${environment.apiUrl}/ERPApplication/JobOfferDetails`,
        getApplicationDetails:`${environment.apiUrl}/ERPApplication/GetApplicationDetails`,
        getApplicationOnBoardingList:`${environment.apiUrl}/ERPApplication/GetApplicationOnBoardingList`
    },
    applicant:{
        createApplicant: `${environment.apiUrl}/ERPApplicant/CreateApplicant`,
        login:`${environment.apiUrl}/ERPApplicant/Login`,
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
        getCertificateList:`${environment.apiUrl}/ERPApplicant/GetCertificateList`,  
        getEducationList:`${environment.apiUrl}/ERPApplicant/GetEducationList`,  
        getCourseList:`${environment.apiUrl}/ERPApplicant/GetCourseList`,  
        myApplicationJobList:`${environment.apiUrl}/ERPAuthentication/MyApplicationJobList`,
        getTrustedPositionList:`${environment.apiUrl}/ERPApplicant/GetTrustedPoaitionList`,  
        editEducation:`${environment.apiUrl}/ERPApplicant/EditEducation`,  
        editCertificate:`${environment.apiUrl}/ERPApplicant/EditCertificate`,  
        editCourse:`${environment.apiUrl}/ERPApplicant/EditCourse`,  
        editTrustedPosition:`${environment.apiUrl}/ERPApplicant/EditTrustedPosition`,  
        editSkill:`${environment.apiUrl}/ERPApplicant/EditSkill`,  
        getApplicantProfile:`${environment.apiUrl}/ERPApplicant/GetApplicantProfile`,
        updateApplicantProfileGeneral:`${environment.apiUrl}/ERPApplicant/UpdateApplicantProfileGeneral`,
        getPersonalSuffixLookup:`${environment.apiUrl}/ERPApplicant/GetPersonalSuffixLookup`,
        getPersonalTitleLookup:`${environment.apiUrl}/ERPApplicant/GetPersonalTitleLookup`,
        getUpdateApplicantProfileContact:`${environment.apiUrl}/ERPApplicant/GetUpdateApplicantProfileContact`,
        udateApplicantProfileGeneral:`${environment.apiUrl}/ERPApplicant/UdateApplicantProfileGeneral`,
        getUpdateApplicantProfileAddress:`${environment.apiUrl}/ERPApplicant/GetUpdateApplicantProfileAddress`,
        updateApplicantProfileIdentification:`${environment.apiUrl}/ERPApplicant/updateApplicantProfileIdentification`,
        createSkill:`${environment.apiUrl}/ERPApplicant/CreateSkill`, 
        createProfessionalExperience:`${environment.apiUrl}/ERPApplicant/CreateProfessionalExperience`, 
        createEducation:`${environment.apiUrl}/ERPApplicant/CreateEducation`, 
        createCertificate:`${environment.apiUrl}/ERPApplicant/CreateCertificate`, 
        createCourse:`${environment.apiUrl}/ERPApplicant/CreateCourse`, 
        createTrustedPosition:`${environment.apiUrl}/ERPApplicant/createTrustedPosition`,
        editProfessional:`${environment.apiUrl}/ERPApplicant/EditProfessional`,
        editExperience:`${environment.apiUrl}/ERPApplicant/EditExperience`,
        deleteSkill:`${environment.apiUrl}/ERPApplicant/DeleteSkill`,
        deleteEducation:`${environment.apiUrl}/ERPApplicant/DeleteEducation`,
        deleteCertificate:`${environment.apiUrl}/ERPApplicant/DeleteCertificate`,
        professionalDelete:`${environment.apiUrl}/ERPApplicant/ProfessionalDelete`,
        courseDelete:`${environment.apiUrl}/ERPApplicant/CourseDelete`,
        deleteTrustedPosition:`${environment.apiUrl}/ERPApplicant/DeleteTrustedPosition`,
        deleteAddress:`${environment.apiUrl}/ERPApplicant/DeleteAddress`,
        deleteContact:`${environment.apiUrl}/ERPApplicant/DeleteContact`,
        deleteIdentification:`${environment.apiUrl}/ERPApplicant/DeleteIdentification`,
        validateEmail:`${environment.apiUrl}/ERPApplicant/ValidateEmail`,  
        savedApplicantJobs:`${environment.apiUrl}/ERPApplicant/SavedApplicantJobs`,
        getApplicantSavedJobsList:`${environment.apiUrl}/ERPApplicant/GetApplicantSavedJobsList`,
        changePassword:`${environment.apiUrl}/ERPApplicant/ChangePassword`,
        resetPassword:`${environment.apiUrl}/ERPApplicant/ResetPassword`,
        verifyOTP:`${environment.apiUrl}/ERPApplicant/VerifyOTP`,
        getUserDetails:`${environment.apiUrl}/ERPApplicant/GetUserDetails`,
        resendOtp:`${environment.apiUrl}/ERPApplicant/ResendOTP`,
        uploadApplicantImage:`${environment.apiUrl}/ERPApplicant/UploadApplicantImage`,
        updateAboutme:`${environment.apiUrl}/ERPApplicant/UpdateAboutme`,
        getIpAddress:`${environment.apiUrl}/Application/GetIpAddress`,
        uploadCvs:`${environment.apiUrl}/ERPApplicant/UploadCvAttachments`
    }
}