import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContactInfo } from 'src/app/models/contact-info.model';

@Component({
  selector: 'app-add-edit-contact-info',
  templateUrl: './add-edit-contact-info.component.html',
  styleUrls: ['./add-edit-contact-info.component.scss']
})
export class AddEditContactInfoComponent {

  @Input() selectedContact:ContactInfo = new Object() as ContactInfo;
  @Output() closeSideNav: EventEmitter<any> = new EventEmitter();
  @Output() contactData: EventEmitter<ContactInfo> = new EventEmitter();
  contactForm: UntypedFormGroup;
  private _formBuilder = inject(UntypedFormBuilder);
  contact!: ContactInfo
  constructor(private toastrService: ToastrService) {
    this.contactForm = this._formBuilder.group({
      contactId: [''],
      contactType: ['', [Validators.required]],
      contactNumber: ['', [Validators.required]]
    });
  }
 ngOnInIt(){
  if(this.selectedContact.contactId !== ''){
    this.contactForm.patchValue({
      ...this.selectedContact
    });
  }
 }
  CloseIdentificationNav: () => void = () => {
    this.closeSideNav.emit(true);
  }

  SaveContact: () => void = () => {
    if (this.contactForm.valid) {
      this.contact = this.contactForm.getRawValue();
      this.toastrService.success('contact Added Successfully');
      this.contactData.emit(this.contact);
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
  Discard: () => void = () => {
    this.contactForm.reset();
  }
}
