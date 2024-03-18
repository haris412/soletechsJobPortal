import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ContactInfo } from 'src/app/models/contact-info.model';

import { Country } from 'ngx-mat-intl-tel-input/lib/model/country.model';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';
import { UserInfoService } from 'src/app/modules/user-info/user-info.service';
import { LookUpDto } from 'src/app/models/lookup-dto.model';

@Component({
  selector: 'app-add-edit-contact-info',
  templateUrl: './add-edit-contact-info.component.html',
  styleUrls: ['./add-edit-contact-info.component.scss']
})
export class AddEditContactInfoComponent implements OnInit {
  public isTranslate: boolean = this.translationService.isTranslate;
  @Input() selectedContact:ContactInfo = new Object() as ContactInfo;
  @Input() isUserProfile : boolean = false;
  @Output() closeSideNav: EventEmitter<any> = new EventEmitter();
  @Output() contactData: EventEmitter<ContactInfo> = new EventEmitter();
  contactForm: UntypedFormGroup;
  contact!: ContactInfo;
  phonePlaceHolder:any;
  private _formBuilder = inject(UntypedFormBuilder);
  contactList:LookUpDto[]=[];
  label:string = '';
  get f() { return this.contactForm.controls; }
  constructor(
    public userInfo: UserInfoService,
    public translationService: TranslationAlignmentService) {
    this.contactForm = this._formBuilder.group({
      Type: ['1', [Validators.required]],
      ContactNumber: ['', [Validators.required]],
      recid:[this.selectedContact?.recid ? this.selectedContact?.recid : 0],
    });
    this.translationService.languageChange.subscribe( x=> {
      this.isTranslate  = x;
      this.PrePareContactListWithLanguage();
    });
  }
  ngOnInit(): void {
    
   if (this.userInfo.selectedContact) {
    this.contactForm.patchValue({
      ...this.userInfo.selectedContact,
      Type:this.userInfo.selectedContact?.Type?.toString(),
    });
  } else {
    this.contactForm.reset();
  }
  this.PrePareContactListWithLanguage();
  }

  CloseIdentificationNav: () => void = () => {
    this.closeSideNav.emit(true);
  }

  SaveContact: () => void = () => {
    if (this.contactForm.valid) {
      this.contact = this.contactForm.getRawValue();
      this.contactData.emit(this.contact);
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
  Discard: () => void = () => {
    this.contactForm.reset();
  }
  OnCountryChanged(event:Country){
		this.phonePlaceHolder = event?.placeHolder;
	  }
    SelectionChange(event:any){
      if(event?.value === '1'){
        this.label = this.translationService.isTranslate ? 'رقم' : 'Number';
      }else if(event?.value === '2'){
        this.label = this.translationService.isTranslate ? 'بريد إلكتروني' : 'Email';
      }else if(event?.value === '3'){
        this.label = this.translationService.isTranslate ? 'عنوان ' : 'URL';
      }else if(event?.value === '4'){
        this.label = this.translationService.isTranslate ? 'التلكس' : 'Telex';
      }else if(event?.value === '5'){
        this.label = this.translationService.isTranslate ? 'فاكس' : 'Fax';
      }else if(event?.value === '6'){
        this.label = this.translationService.isTranslate ? 'فيسبوك' : 'Facebook';
      }else if(event?.value === '7'){
        this.label = this.translationService.isTranslate ? 'تويتر' : 'Twitter';
      }else if(event?.value === '8'){
        this.label = this.translationService.isTranslate ? 'ينكدين' : 'LinkedIn';
      }else if(event?.value === '9'){
        this.label = this.translationService.isTranslate ? 'انستغرام' : 'Instagram';
      }else if(event?.value === '10'){
        this.label = this.translationService.isTranslate ? 'واتساب' :  'WhatsApp';
      }
    }
    PrePareContactListWithLanguage(){
      if(this.translationService.isTranslate){
        this.contactList = this.userInfo.contactTypeListArabic;
      }else{
        this.contactList = this.userInfo.contactTypeList;
      }
    }
}
