export class Applicant {
    id: string = '';
    applicantType?: number = 0;
    futureConsideration?: number = 0;
    previousEmployee?: number = 0;
    currentJobTitle?: string = '';
    firstName?: string = '';
    lastName?: string = '';
    middleName?: string = '';
    professionalSuffix?: string = '';
    professionalTitle?: string = '';
    maritalStatus?: string = '';
    birthDate?: string | Date = new Date();
    highestDegree?: string = '';
    currentSalary?: string = '';
    reasonCode?: string = '';
    middleNameAr?: string = '';
    firstNameAr?: string = '';
    lastNameAr?: string = '';
    personRecid?: string = '';
    gender?: string = '';
    nationality?: string = '';
    nativeLanguageId?: string = '';
    ethnicOriginId?: string = '';
    email:string = '';
    password:string = '';
}