import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContactInfo } from 'src/app/models/contact-info.model';
import { UserInfoService } from '../user-info.service';
import { Country } from 'ngx-mat-intl-tel-input/lib/model/country.model';

@Component({
  selector: 'app-add-edit-contact-info',
  templateUrl: './add-edit-contact-info.component.html',
  styleUrls: ['./add-edit-contact-info.component.scss']
})
export class AddEditContactInfoComponent implements OnInit {

  @Input() selectedContact:ContactInfo = new Object() as ContactInfo;
  @Output() closeSideNav: EventEmitter<any> = new EventEmitter();
  @Output() contactData: EventEmitter<ContactInfo> = new EventEmitter();
  contactForm: UntypedFormGroup;
  private _formBuilder = inject(UntypedFormBuilder);
  contact!: ContactInfo;
  phonePlaceHolder:any;
  get f() { return this.contactForm.controls; }
  constructor(public userInfo: UserInfoService) {
    this.contactForm = this._formBuilder.group({
      Type: ['', [Validators.required]],
      ContactNumber: ['', [Validators.required]],
      recid:[this.selectedContact?.recid ? this.selectedContact?.recid : 0],

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
}
