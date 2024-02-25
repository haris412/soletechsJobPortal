import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ContactInfo } from 'src/app/models/contact-info.model';

import { Country } from 'ngx-mat-intl-tel-input/lib/model/country.model';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';
import { UserInfoService } from 'src/app/modules/user-info/user-info.service';

@Component({
  selector: 'app-add-edit-contact-info',
  templateUrl: './add-edit-contact-info.component.html',
  styleUrls: ['./add-edit-contact-info.component.scss']
})
export class AddEditContactInfoComponent implements OnInit {
  public isTranslate: boolean = this.translationService.isTranslate;
  @Input() selectedContact:ContactInfo = new Object() as ContactInfo;
  @Output() closeSideNav: EventEmitter<any> = new EventEmitter();
  @Output() contactData: EventEmitter<ContactInfo> = new EventEmitter();
  contactForm: UntypedFormGroup;
  private _formBuilder = inject(UntypedFormBuilder);
  contact!: ContactInfo;
  phonePlaceHolder:any;
  label:string = '';
  @Input() isUserProfile : boolean = false;
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
    });
  }
  ngOnInit(): void {
   if (this.userInfo.selectedContact) {
    this.contactForm.patchValue({
      ...this.userInfo.selectedContact,
      Type:this.userInfo.selectedContact?.Type?.toString(),
    });
    console.log(this.userInfo.selectedContact);
  } else {
    this.contactForm.reset();
  }
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
        this.label = 'Number';
      }else if(event?.value === '2'){
        this.label = 'Email';
      }else if(event?.value === '3'){
        this.label = 'URL';
      }else if(event?.value === '4'){
        this.label = 'Telex';
      }else if(event?.value === '5'){
        this.label = 'Fax';
      }else if(event?.value === '6'){
        this.label = 'Facebook';
      }else if(event?.value === '7'){
        this.label = 'Twitter';
      }else if(event?.value === '8'){
        this.label = 'LinkedIn';
      }else if(event?.value === '9'){
        this.label = 'Instagram';
      }else if(event?.value === '10'){
        this.label = 'WhatsApp';
      }
    }
}
