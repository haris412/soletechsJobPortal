import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Identification } from 'src/app/models/identification.model';

@Component({
  selector: 'app-add-edit-identification',
  templateUrl: './add-edit-identification.component.html',
  styleUrls: ['./add-edit-identification.component.scss']
})
export class AddEditIdentificationComponent {

  @Input() selectedIdentification:Identification = new Object() as Identification;
  @Output() closeSideNav: EventEmitter<any> = new EventEmitter();
  @Output() identificationData: EventEmitter<Identification> = new EventEmitter();
  identificationForm: UntypedFormGroup;
  isFile:boolean = false;
	fileList:any[] = [];
  private _formBuilder = inject(UntypedFormBuilder);
  identification!: Identification
  constructor(private toastrService: ToastrService) {
    this.identificationForm = this._formBuilder.group({
      identifcationType: ['', [Validators.required]],
      identificationNumer: ['', [Validators.required]],
      issueDate: ['', [Validators.required]],
      expiryDate: ['', [Validators.required]],
      attachment: ['']

    });
  }
 ngOnInIt(){
  if(this.selectedIdentification.identificationId !== ''){
    this.identificationForm.patchValue({
      ...this.selectedIdentification
    });
  }
 }
  CloseIdentificationNav: () => void = () => {
    this.closeSideNav.emit(true);
  }

  SaveIdentification: () => void = () => {
    if (this.identificationForm.valid) {
      this.identification = this.identificationForm.getRawValue();
      this.toastrService.success('Identificatin Added Successfully');
      this.identificationData.emit(this.identification);
    } else {
      this.identificationForm.markAllAsTouched();
    }
  }
  Discard: () => void = () => {
    this.identificationForm.reset();
  }
}
