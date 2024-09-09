import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';
import { ContactInfo } from 'src/app/models/contact-info.model';
import { UserInfoService } from 'src/app/modules/user-info/user-info.service';

import { DeleteModalComponentService } from 'src/app/shared/delete-modal/delete-modal.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent implements OnInit {
  public sidenavOpen: boolean = false;
  contactInfoList:ContactInfo[] = [];
  selectedContact!:ContactInfo;
  @Input() isUserProfile : boolean = false;
 constructor(private toastrService: ToastrService,
             private lookUpService: AppLookUpService,
             public userInfoService: UserInfoService,
             private deleteModal: DeleteModalComponentService,
             public translationService: TranslationAlignmentService){}
  
  async ngOnInit() {
    if (this.userInfoService?.identificationList?.parmApplicantProfileIdentificationList == undefined || this.userInfoService?.identificationList?.parmApplicantProfileIdentificationList.length == 0) {
      await this.userInfoService.GetApplicantProfile();
    }
  }
  
  async ContactAdded(contact:ContactInfo){
    let contactData :ContactInfo = {
      ...contact,
      Type:Number(contact.Type),
      recid:contact?.recid ? contact?.recid : 0,
      applicantPersonRecId:Number(localStorage.getItem('applicantPersonRecid'))
    }
    let response = await this.lookUpService.GetUpdateApplicantProfileContact(contactData);
    if(response){
    this.toastrService.success(response?.Message);
    await this.userInfoService.GetApplicantProfile();
    this.CloseSidenav();
    }
  }
  DeleteContact(contact:ContactInfo){
    const data = `Are you sure you want to do delete this contact?`;
    const dialogRef = this.deleteModal.openDialog(data);
    dialogRef.afterClosed().subscribe(async (dialogResult: any) => {
      if (dialogResult) {
        let applicantPersonRecId = Number(localStorage.getItem('recId'));
        let response: any = await this.lookUpService.DeleteContact(contact?.recid ?? 0, applicantPersonRecId,contact.ContactNumber);
        if (response?.Status) {
          this.toastrService.success(response?.Message);
          await this.userInfoService.GetApplicantProfile();
        } else {
          this.toastrService.error(response?.Message);
        }
      }
    });
  }
  CheckContactType(type:number){
    let label:string = '';
    if(type == 1){
      label= this.translationService.isTranslate ? 'رقم' : 'Number';
      }else if(type === 2){
        label= this.translationService.isTranslate ? 'بريد إلكتروني' : 'Email';
      }else if(type === 3){
        label= this.translationService.isTranslate ? 'عنوان ' : 'URL';
      }else if(type === 4){
        label= this.translationService.isTranslate ? 'التلكس' : 'Telex';
      }else if(type === 5){
        label= this.translationService.isTranslate ? 'فاكس' : 'Fax';
      }else if(type === 6){
        label= this.translationService.isTranslate ? 'فيسبوك' : 'Facebook';
      }else if(type === 7){
        label= this.translationService.isTranslate ? 'تويتر' : 'Twitter';
      }else if(type === 8){
        label= this.translationService.isTranslate ? 'ينكدين' : 'LinkedIn';
      }else if(type === 9){
        label= this.translationService.isTranslate ? 'انستغرام' : 'Instagram';
      }else if(type === 10){
        label= this.translationService.isTranslate ? 'واتساب' :  'WhatsApp';
      }
      return label
  }
  EditContact(contact:ContactInfo){
    this.userInfoService.selectedContact = contact;
    this.OpenSidenav();
  }
  AddContact(){
    this.userInfoService.selectedContact = new Object() as ContactInfo;
    this.OpenSidenav();
  }

  OpenSidenav() {
    this.sidenavOpen = true;
    document.body.style.overflow = 'hidden';
  }

  CloseSidenav() {
    this.sidenavOpen = false;
    document.body.style.overflow = 'auto';
  }
}
