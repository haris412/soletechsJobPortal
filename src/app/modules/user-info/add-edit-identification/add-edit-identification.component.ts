import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Identification } from 'src/app/models/identification.model';
import { UserInfoService } from '../user-info.service';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';

@Component({
  selector: 'app-add-edit-identification',
  templateUrl: './add-edit-identification.component.html',
  styleUrls: ['./add-edit-identification.component.scss']
})
export class AddEditIdentificationComponent implements OnInit {
  public isTranslate: boolean = this.translationService.isTranslate;
  @Input() selectedIdentification: Identification = new Object() as Identification;
  @Output() closeSideNav: EventEmitter<any> = new EventEmitter();
  @Output() identificationData: EventEmitter<Identification> = new EventEmitter();
  identificationForm: UntypedFormGroup;
  isFile: boolean = false;
  fileList: any[] = [];
  private _formBuilder = inject(UntypedFormBuilder);
  identification!: Identification;
  get f() { return this.identificationForm.controls; }
  constructor(
    private toastrService: ToastrService,
    public userInfoService: UserInfoService,
    public translationService: TranslationAlignmentService
    ) {
    this.identificationForm = this._formBuilder.group({
      IdentificationType: ['', [Validators.required]],
      IdentificationNumber: ['', [Validators.required]],
      IssueDate: ['', [Validators.required]],
      ExpirationDate: ['', [Validators.required]],
      recId: [this.selectedIdentification?.recId ? this.selectedIdentification?.recId : 0],
      attachment: ['']
    });
    this.translationService.languageChange.subscribe( x=> {
      this.isTranslate  = x;
    });
  }
  ngOnInit() {
    if (this.selectedIdentification != undefined) {
      this.identificationForm.patchValue({
        ...this.selectedIdentification
      });
    } else {
      this.identificationForm.reset();
    }
  }
  CloseIdentificationNav: () => void = () => {
    this.closeSideNav.emit(true);
  }

  SaveIdentification: () => void = () => {
    if (this.identificationForm.valid) {
      this.identification = this.identificationForm.getRawValue();
      this.identificationData.emit(this.identification);
    } else {
      this.identificationForm.markAllAsTouched();
    }
  }
  Discard: () => void = () => {
    this.identificationForm.reset();
  }
  onFileUpload(files: any) {
    this.fileList.push(files.target.files[0]);
  }

  DeleteFile(selectedFile: File) {
    this.fileList = [];
  }
}
