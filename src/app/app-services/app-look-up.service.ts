import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { apiURLs } from "../app.settings";
import { LookupParameters } from "../models/look-up.model";
import { Skills } from "../models/skills.model";
import { professionalExperience } from "../models/professional-experience.model";

import { Certificates } from "../models/certificates.model";
import { Course } from "../models/courses.model";
import { PositionOfTrust } from "../models/position-of-trust.model";
import { Address } from "../models/address.model";
import { ContactInfo } from "../models/contact-info.model";
import { Identification } from "../models/identification.model";
import { SaveJob } from "../models/saveJob.model";
import { ChangePassword } from "../models/ChangePassword";
import { userApplicantImage } from "../models/userImageParameters";
import { UpdateAboutMe } from "../models/update-about-me.model";
import { Education } from "../modules/competencies-common/components/models/education";

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

    async GetEducationInstitutionLookupList(
        params: LookupParameters
    ) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('dataAreaId', params.dataAreaId).
            set('languageId', params.languageId);
        return await this.httpClient
            .get<any>(
                apiURLs.applicant.getEducationInstitutionLookupList,
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
        applicant: any
    ) {
        return await this.httpClient
            .post<any>(
                apiURLs.applicant.createApplicant,
                applicant
            ).toPromise();
    }

    async CreateSkill(
        skill: Skills
    ) {
        return await this.httpClient
            .post<any>(
                apiURLs.applicant.createSkill,
                skill
            ).toPromise();
    }

    async EditSkill(
        skill: Skills
    ) {
        return await this.httpClient
            .post<any>(
                apiURLs.applicant.editSkill,
                skill
            ).toPromise();
    }

    async CreateProfessionalExperience(
        experience: professionalExperience
    ) {
        return await this.httpClient
            .post<any>(
                apiURLs.applicant.createProfessionalExperience,
                experience
            ).toPromise();
    }

    async EditProfessionalExperience(
        experience: professionalExperience
    ) {
        return await this.httpClient
            .post<any>(
                apiURLs.applicant.editExperience,
                experience
            ).toPromise();
    }

    async CreateEducation(
        education: Education
    ) {
        return await this.httpClient
            .post<any>(
                apiURLs.applicant.createEducation,
                education
            ).toPromise();
    }
    async EditEducation(
        education: Education
    ) {
        return await this.httpClient
            .post<any>(
                apiURLs.applicant.editEducation,
                education
            ).toPromise();
    }

    async CreateCertificate(
        certificate: Certificates
    ) {
        return await this.httpClient
            .post<any>(
                apiURLs.applicant.createCertificate,
                certificate
            ).toPromise();
    }

    async EditCertificate(
        certificate: Certificates
    ) {
        return await this.httpClient
            .post<any>(
                apiURLs.applicant.editCertificate,
                certificate
            ).toPromise();
    }

    async CreateCourse(
        course: Course
    ) {
        return await this.httpClient
            .post<any>(
                apiURLs.applicant.createCourse,
                course
            ).toPromise();
    }

    async EditCourse(
        course: Course
    ) {
        return await this.httpClient
            .post<any>(
                apiURLs.applicant.editCourse,
                course
            ).toPromise();
    }

    async CreateTrustedPosition(
        trustedPosition: PositionOfTrust
    ) {
        return await this.httpClient
            .post<any>(
                apiURLs.applicant.createTrustedPosition,
                trustedPosition
            ).toPromise();
    }

    async EditTrustedPosition(
        trustedPosition: PositionOfTrust
    ) {
        return await this.httpClient
            .post<any>(
                apiURLs.applicant.editTrustedPosition,
                trustedPosition
            ).toPromise();
    }


    async GetCertificateList(
        personRecId: number
    ) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('personRecId', personRecId)
        return await this.httpClient
            .get<any>(
                apiURLs.applicant.getCertificateList,
                { params: queryParams }
            ).toPromise();
    }
    async GetCourseList(
        personRecId: number
    ) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('personRecId', personRecId)
        return await this.httpClient
            .get<any>(
                apiURLs.applicant.getCourseList,
                { params: queryParams }
            ).toPromise();
    }

    async MyApplicationJobList(applicantId: string) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('applicantId', applicantId)
        return await this.httpClient
            .get<any>(
                apiURLs.application.myApplicationJobList,
                { params: queryParams }
            ).toPromise();
    }

    async GetTrustedPositionList(
        personRecId: number
    ) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('personRecId', personRecId)
        return await this.httpClient
            .get<any>(
                apiURLs.applicant.getTrustedPositionList,
                { params: queryParams }
            ).toPromise();
    }
    async GetProfessionalList(
        personRecId: number
    ) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('personRecId', personRecId)
        return await this.httpClient
            .get<any>(
                apiURLs.applicant.getProfessionalList,
                { params: queryParams }
            ).toPromise();
    }
    async GetEducationList(
        personRecId: number
    ) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('personRecId', personRecId)
        return await this.httpClient
            .get<any>(
                apiURLs.applicant.getEducationList,
                { params: queryParams }
            ).toPromise();
    }
    async GetSkillsList(
        personRecId: number
    ) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('personRecId', personRecId)
        return await this.httpClient
            .get<any>(
                apiURLs.applicant.getSkillsList,
                { params: queryParams }
            ).toPromise();
    }
    async GetPersonalSuffixLookup(
    ) {
        return await this.httpClient
            .get<any>(
                apiURLs.applicant.getPersonalSuffixLookup,

            ).toPromise();
    }
    async GetPersonalTitleLookup(
    ) {
        return await this.httpClient
            .get<any>(
                apiURLs.applicant.getPersonalTitleLookup,
            ).toPromise();
    }
    async UpdateApplicantProfileGeneral(profile: any) {
        return await this.httpClient
            .post<any>(
                apiURLs.applicant.updateApplicantProfileGeneral,
                profile
            ).toPromise();
    }
    async GetUpdateApplicantProfileContact(contact: ContactInfo
    ) {
        return await this.httpClient
            .post<any>(
                apiURLs.applicant.getUpdateApplicantProfileContact,
                contact
            ).toPromise();
    }

    async GetUpdateApplicantProfileAddress(address: Address) {
        return await this.httpClient
            .post<any>(
                apiURLs.applicant.getUpdateApplicantProfileAddress,
                address
            ).toPromise();
    }
    async UpdateApplicantProfileIdentification(identification: Identification) {
        return await this.httpClient
            .post<any>(
                apiURLs.applicant.updateApplicantProfileIdentification,
                identification
            ).toPromise();
    }
    async GetApplicantProfile(
        applicantId: string) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('applicantId', applicantId)
        return await this.httpClient
            .get<any>(
                apiURLs.applicant.getApplicantProfile,
                { params: queryParams }
            ).toPromise();
    }
    async DeleteCourse(
        recId: number, applicantRecId: number) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('recid', recId).
            set('applicantRecId', applicantRecId)
        return await this.httpClient
            .delete<any>(
                apiURLs.applicant.courseDelete,
                { params: queryParams }
            ).toPromise();
    }
    async DeleteEducation(
        recId: number, applicantRecId: number) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('recid', recId).
            set('applicantRecId', applicantRecId)
        return await this.httpClient
            .delete<any>(
                apiURLs.applicant.deleteEducation,
                { params: queryParams }
            ).toPromise();
    }
    async DeleteCertificate(
        recId: number, applicantRecId: number) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('recid', recId).
            set('applicantRecId', applicantRecId)
        return await this.httpClient
            .delete<any>(
                apiURLs.applicant.deleteCertificate,
                { params: queryParams }
            ).toPromise();
    }
    async DeleteProfessional(
        recId: number, applicantRecId: number) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('recid', recId).
            set('applicantRecId', applicantRecId)
        return await this.httpClient
            .delete<any>(
                apiURLs.applicant.professionalDelete,
                { params: queryParams }
            ).toPromise();
    }
    async DeleteSkills(
        recId: number, applicantRecId: number) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('recid', recId).
            set('applicantRecId', applicantRecId)
        return await this.httpClient
            .delete<any>(
                apiURLs.applicant.deleteSkill,
                { params: queryParams }
            ).toPromise();
    }
    async DeletePositionOfTrust(
        recId: number, applicantRecId: number) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('recid', recId).
            set('applicantRecId', applicantRecId)
        return await this.httpClient
            .delete<any>(
                apiURLs.applicant.deleteTrustedPosition,
                { params: queryParams }
            ).toPromise();
    }

    async DeleteAddress(personRecid: number) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('personRecid', personRecid)
        return await this.httpClient
            .delete<any>(
                apiURLs.applicant.deleteAddress,
                { params: queryParams }
            ).toPromise();
    }
    async DeleteContact(
        recId: number, applicantRecId: number, contactNo: string) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('recid', recId).
            set('applicantRecId', applicantRecId).
            set('contactNo', contactNo)
        return await this.httpClient
            .delete<any>(
                apiURLs.applicant.deleteContact,
                { params: queryParams }
            ).toPromise();
    }
    async DeleteIdentification(
        recId: number, applicantRecId: number) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('recid', recId).
            set('applicantRecId', applicantRecId)
        return await this.httpClient
            .delete<any>(
                apiURLs.applicant.deleteIdentification,
                { params: queryParams }
            ).toPromise();
    }
    async ValidateEmail(
        email: string
    ) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('email', email)
        return await this.httpClient
            .get<any>(
                apiURLs.applicant.validateEmail,
                { params: queryParams }
            ).toPromise();
    }
    async JobOfferDetails(
        applicationId: string
    ) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('applicationId', applicationId)
        return await this.httpClient
            .get<any>(
                apiURLs.application.jobOfferDetails,
                { params: queryParams }
            ).toPromise();
    }
    async GetApplicationDetails(
        applicationId: string
    ) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('applicationId', applicationId)
        return await this.httpClient
            .get<any>(
                apiURLs.application.getApplicationDetails,
                { params: queryParams }
            ).toPromise();
    }

    async SavedApplicantJobs(job: SaveJob) {

        return await this.httpClient
            .post<any>(
                apiURLs.applicant.savedApplicantJobs,
                job
            ).toPromise();
    }

    async GetApplicantSavedJobsList(applicantId:string){
        let queryParams = new HttpParams();
        queryParams = queryParams.append('applicantId', applicantId)
        return await this.httpClient
            .get<any>(
                apiURLs.applicant.getApplicantSavedJobsList,
                { params: queryParams }
            ).toPromise();
    }

    async ChangePassword(password: ChangePassword) {

        return await this.httpClient
            .post<any>(
                apiURLs.applicant.changePassword,
                password
            ).toPromise();
    }

    async GetResetPassword(email: string){
        let queryParams = new HttpParams();
        queryParams = queryParams.append('email', email)
        return await this.httpClient
            .get<any>(
                apiURLs.applicant.resetPassword,
                { params: queryParams }
            ).toPromise();
    }

    async UploadApplicantImage(parameters: userApplicantImage) {
        return await this.httpClient
            .post<any>(
                apiURLs.applicant.uploadApplicantImage,
                parameters 
            ).toPromise();
    }
    async VerifyOTP(otp: number) {
        return await this.httpClient
            .post<any>(
                apiURLs.applicant.verifyOTP,
                otp 
            ).toPromise();
    }
    async GetUserDetails(applicantId:string) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('applicantId', applicantId)
        return await this.httpClient
            .get<any>(
                apiURLs.applicant.getUserDetails ,
                { params: queryParams }
            ).toPromise();
    }
    async ResendOTP(email: string) {
        let queryParams = new HttpParams();
        queryParams = queryParams.append('email', email)
        return await this.httpClient
            .get<any>(
                apiURLs.applicant.resendOtp ,
                { params: queryParams }
            ).toPromise();
    }
    async GetIpAddress() {
        let ipaddress =  await this.httpClient.get<any>(
            apiURLs.applicant.getIpAddress
        ).toPromise();
        return ipaddress?.ip;
    }

    async UpdateAboutme(parameters:UpdateAboutMe){
        return await this.httpClient
        .post<any>(
            apiURLs.applicant.updateAboutme,
            parameters 
        ).toPromise();
    }

    async GetApplicationOnBoardingList(applicantId:string ,applicationId:string){
        let queryParams = new HttpParams();
        queryParams = queryParams.append('applicantId', applicantId).
        set('applicationId',applicationId)
        return await this.httpClient
        .get<any>(
            apiURLs.application.getApplicationOnBoardingList,
            {params:queryParams}
        ).toPromise();
    }
}