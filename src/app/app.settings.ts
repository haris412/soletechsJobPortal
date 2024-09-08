
export const apiURLs = {
    recrutmentProjects: {
        GetRecruitmentInformationListAsync: `/ERPAuthentication/GetRecruitmentInformationList`,
        getRecruitmentProjectsList: `/ERPAuthentication/getRecruitmentProjectsList`,
        authenticationByCompanyIdAsync:`/ERPAuthentication/AuthenticationByCompanyId`,
        getJobDetails:`/ERPAuthentication/GetJobDetails`,
        myApplicationJobList:`/ERPAuthentication/MyApplicationJobList`,
        getStartedRecruitingList:`/ERPAuthentication/GetStartedRecruitingList`,
    },
    lookUps: {
        getDepartmentLookup: `/MPRecruitment_Projects/getDepartment_Lookup`,
        getJobLookup: `/MPRecruitment_Projects/getJob_Lookup`,
        getWorkerLookup: `/MPRecruitment_Projects/getWorker_Lookup`,
        getRecrutmentLookUp: `MPRecruitment_Projects/getRecruitment_Lookup`,
        getMediaLookUp: `/MPRecruitment_Projects/getMedia_Lookup`,
        getReasonCodeLookup: `/MPRecruitment_Projects/getReasonCode_Lookup`,
        getApplicantionLookup: `/MPRecruitment_Projects/getApplicantion_Lookup`,
        getContractWorkerLookup: `/MPRecruitment_Projects/getContractWorker_Lookup`,
        getRecruitmentLookup:`/ERPLookups/GetRecruitment_Lookup`,
        getCountryRegionLookup:`/ERPLookups/GetCountryRegion_Lookup`,
        GetEthnicOriginLookup:`/ERPLookups/GetEthnicOrigin_Lookup`,
        GetNativeLanguageCodeLookup:`/ERPLookups/GetNativeLanguageCode_Lookup`,
        GetHighestDegreeLookups:`/ERPLookups/GetHighestDegree_Lookup`,
        GetReasonCodeLookups:`/ERPLookups/GetReasonCode_Lookup`,
        GetIdentificationTypeLookup:`/ERPLookups/GetIdentificationType_Lookup`,
        GetCityLookup:`/ERPLookups/GetCity_Lookup`,
    },
    application: {
        createApplication: `/ERPApplication/CreateApplication`,
        myApplicationJobList:`/ERPApplication/MyApplicationJobList`,
        jobOfferDetails:`/ERPApplication/JobOfferDetails`,
        getApplicationDetails:`/ERPApplication/GetApplicationDetails`,
        getApplicationOnBoardingList:`/ERPApplication/GetApplicationOnBoardingList`,
        getApplicationInterviewerList:`/ERPApplication/GetApplicationInterviewerList`,
        getConfirmInterviewer:`/ERPApplication/GetConfirmInterviewer`,
        acceptAndRejectJobOffer:`/ERPApplication/AcceptAndRejectJobOffer`,
        performOfferActoin:`/ERPApplication/PerformOfferActoin`
    },
    applicant:{
        createApplicant: `/ERPApplicant/CreateApplicant`,
        login:`/ERPApplicant/Login`,
        getHighestDegreeLookUp:`/ERPApplicant/GetHighestDegreeLookUpList`,
        GetAddressLookUp:`/ERPApplicant/GetAddressLookUp`,
        getSkillLookupList:`/ERPApplicant/GetSkillLookupList`,
        getRatingLevelLookupList:`/ERPApplicant/GetRatingLevelLookupList`,
        getEducationDisciplineLookupList:`/ERPApplicant/GetEducationDisciplineLookupList`,
        getEducationLevelLookupList:`/ERPApplicant/GetEducationLevelLookupList`,
        getEducationInstitutionLookupList:`/ERPApplicant/GetEducationInstitutionLookupList`,
        getCertificateTypeLookUpList:`/ERPApplicant/GetCertificateTypeLookUpList`,
        getSkillsList:`/ERPApplicant/GetSkillsList`,
        getProfessionalList:`/ERPApplicant/GetProfessionalList`,
        getPersonalTitleLookupList:`/ERPApplicant/GetPersonalTitleLookupList`,  
        getCertificateList:`/ERPApplicant/GetCertificateList`,  
        getEducationList:`/ERPApplicant/GetEducationList`,  
        getCourseList:`/ERPApplicant/GetCourseList`,  
        myApplicationJobList:`/ERPAuthentication/MyApplicationJobList`,
        getTrustedPositionList:`/ERPApplicant/GetApplicantReferenceList`,
        editEducation:`/ERPApplicant/EditEducation`,  
        editCertificate:`/ERPApplicant/EditCertificate`,  
        editCourse:`/ERPApplicant/EditCourse`,  
        editTrustedPosition:`/ERPApplicant/EditApplicantReference`,  
        editSkill:`/ERPApplicant/EditSkill`,  
        getApplicantProfile:`/ERPApplicant/GetApplicantProfile`,
        updateApplicantProfileGeneral:`/ERPApplicant/UpdateApplicantProfileGeneral`,
        getPersonalSuffixLookup:`/ERPApplicant/GetPersonalSuffixLookup`,
        getPersonalTitleLookup:`/ERPApplicant/GetPersonalTitleLookup`,
        getUpdateApplicantProfileContact:`/ERPApplicant/GetUpdateApplicantProfileContact`,
        udateApplicantProfileGeneral:`/ERPApplicant/UdateApplicantProfileGeneral`,
        getUpdateApplicantProfileAddress:`/ERPApplicant/GetUpdateApplicantProfileAddress`,
        updateApplicantProfileIdentification:`/ERPApplicant/updateApplicantProfileIdentification`,
        createSkill:`/ERPApplicant/CreateSkill`, 
        createProfessionalExperience:`/ERPApplicant/CreateProfessionalExperience`, 
        createEducation:`/ERPApplicant/CreateEducation`, 
        createCertificate:`/ERPApplicant/CreateCertificate`, 
        createCourse:`/ERPApplicant/CreateCourse`, 
        createTrustedPosition:`/ERPApplicant/CreateApplicantReference`,
        editProfessional:`/ERPApplicant/EditProfessional`,
        editExperience:`/ERPApplicant/EditExperience`,
        deleteSkill:`/ERPApplicant/DeleteSkill`,
        deleteEducation:`/ERPApplicant/DeleteEducation`,
        deleteCertificate:`/ERPApplicant/DeleteCertificate`,
        professionalDelete:`/ERPApplicant/ProfessionalDelete`,
        courseDelete:`/ERPApplicant/CourseDelete`,
        deleteTrustedPosition:`/ERPApplicant/DeleteApplicantReference`,
        deleteAddress:`/ERPApplicant/DeleteAddress`,
        deleteContact:`/ERPApplicant/DeleteContact`,
        deleteIdentification:`/ERPApplicant/DeleteIdentification`,
        validateEmail:`/ERPApplicant/ValidateEmail`,  
        savedApplicantJobs:`/ERPApplicant/SavedApplicantJobs`,
        getApplicantSavedJobsList:`/ERPApplicant/GetApplicantSavedJobsList`,
        changePassword:`/ERPApplicant/ChangePassword`,
        resetPassword:`/ERPApplicant/ResetPassword`,
        verifyOTP:`/ERPApplicant/VerifyOTP`,
        getUserDetails:`/ERPApplicant/GetUserDetails`,
        resendOtp:`/ERPApplicant/ResendOTP`,
        uploadApplicantImage:`/ERPApplicant/UploadApplicantImage`,
        updateAboutme:`/ERPApplicant/UpdateAboutme`,
        getIpAddress:`/Application/GetIpAddress`,
        uploadCvs:`/ERPApplicant/UploadCvAttachments`,
        medicalHistory:`/ERPApplicant/UploadMedicalAttachment`,
        getAttachmentFile:`/ERPApplicant/GetAttachFileFromAzure`,
        getRatingLevelLookup:`/ERPApplicant/GetRatingLevelLookup`
    }
}