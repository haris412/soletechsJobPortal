import { Injectable, inject } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AppLookUpService } from "src/app/app-services/app-look-up.service";
import { Applicant } from "src/app/models/applicant";
import { ContactInfo } from "src/app/models/contact-info.model";
import { LookUpDto } from "src/app/models/lookup-dto.model";

@Injectable({
    providedIn: 'root',
})
export class UserInfoService {

	constructor(public lookupService: AppLookUpService) {}

    private _applicantFormBuilder = inject(UntypedFormBuilder);

    applicant: Applicant = new Applicant();
    applicantForm!: UntypedFormGroup;
    // Lookups
    countryRegions: any[] = [];
    cities: LookUpDto[] = [];
    ethnic: any[] = [];
    nativeLanguage: LookUpDto[] = [];
	nativeLanguageArabic: LookUpDto[] = [];
	nationalityArabic:LookUpDto[]= [] ;
    highestDegree: LookUpDto[] = [];
	highestDegreeArabic: LookUpDto[] = [];
    identificationType: LookUpDto[] = [];
	identificationTypeArabic: LookUpDto[] = [];
	citiesList:LookUpDto[]=[];
	citiesListArabic:LookUpDto[]=[];
    nationality:any[] = [];
	contactsList:any[] = [];
	addressList:any[] = [];
	identificationList:any;
	basicInfo:any;
	contactTypeList:LookUpDto[]= [{name:'Number',value:'0'},
	{name:'Phone',value:'1'},
    {name:'Email Address',value:'2'},
	{name:'URL',value:'3'},
	{name:'Telex',value:'4'},
    {name:'Fax',value:'5'},
	{name:'Facebook',value:'6'},
	{name:'Twitter',value:'7'},
    {name:'LinkedIn',value:'8'},
	{name:'Instagram',value:'9'},
	{name:'WhatsApp',value:'10'}];
	contactTypeListArabic:LookUpDto[]= [{name:'رقم',value:'0'},
	{name:'هاتف',value:'1'},
    {name:'عنوان البريد الإلكتروني',value:'2'},
	{name:'عنوان ',value:'3'},
	{name:'التلكس',value:'4'},
    {name:'فاكس',value:'5'},
	{name:'فيسبوك',value:'6'},
	{name:'تويتر',value:'7'},
    {name:'ينكدين',value:'8'},
	{name:'انستغرام',value:'9'},
	{name:'واتساب',value:'10'}];
	gendersList:LookUpDto[]= [{name:'None',value:'0'},
	{name:'Male',value:'1'},
    {name:'Female',value:'2'}];
	genderListArabic:LookUpDto[]=[{name:'بدون',value:'0'},{name:'ذكر',value:'1'},{name:'انثي',value:'2'}];
	maritalStatusList:LookUpDto[]= [{name:'None',value:'0'},
	{name:'Married',value:'1'},
    {name:'Single',value:'2'},
	{name:'Widowed',value:'3'},
    {name:'Divorced',value:'4'},
	{name:'Cohabiting',value:'5'},
    {name:'Registeredpartnership',value:'6'},
	{name:'Separated',value:'7'},
	{name:'Civilpartnership',value:'8'}];
	maritalStatusListArabic:LookUpDto[]=[{name:'بدون',value:'0'},
	{name:'متزوج',value:'1'},
    {name:'اعزب',value:'2'},
	{name:'ارمل',value:'3'},
    {name:'مطلق',value:'4'},
	{name:'معايشة',value:'5'},
    {name:'علاقة مسجلة',value:'6'},
	{name:'منفصل',value:'7'},
	{name:'شراكة مدنية',value:'8'}];
	previousEmployerList:LookUpDto[]=[{name:'Yes',value:'1'},
	{name:'No',value:'0'}];
	previousEmployerListArabic:LookUpDto[]=[{name:'نعم',value:'1'},
	{name:'لا',value:'0'}]
	selectedContact!: ContactInfo;
    prepareApplicantFormGroup() {
		this.applicantForm = this._applicantFormBuilder.group({
			currentJobTitle: ['',[Validators.required]],
			firstName:['', [Validators.required]],
			lastName:['', [Validators.required]],
			middleName:['', [Validators.required]],
			maritalStatus:['', [Validators.required]],
			birthDate:[''],
			highestDegree:['', [Validators.required]],
			currentSalary:[''],
			reasonCode:[''],
			gender:['', [Validators.required]],
			nationality:['', [Validators.required]],
			nativeLanguageId:['', [Validators.required]],
			ethnicOriginId:['', [Validators.required]]
		});
		this.applicantForm = this.applicantForm;
    }
	
	async GetApplicantProfile(){
		let applicantId = localStorage.getItem('applicantId') ?? '';
		let res = await this.lookupService.GetApplicantProfile(applicantId);
		if(res){
		   this.basicInfo = res?.ApplicantProfileGeneral;
		   this.contactsList= res?.ApplicantProfileContactList?.parmApplicantProfileContactList;
		   this.addressList = res?.ApplicantProfileAddressList?.parmApplicantProfileAddressList;
		   this.identificationList = res?.ApplicantProfileIdentification;
		}
	  }
}