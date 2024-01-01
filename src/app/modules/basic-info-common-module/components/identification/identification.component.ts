import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Identification } from 'src/app/models/identification.model';

import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { DeleteModalComponentService } from 'src/app/shared/delete-modal/delete-modal.service';
import { UserInfoService } from 'src/app/modules/user-info/user-info.service';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss']
})
export class IdentificationComponent implements OnInit {
  public sidenavOpen: boolean = false;
  public isFile: boolean = false;
  identificationList: Identification[] = [];
  selectedIdentification!:Identification;
  @Input() isUserProfile : boolean = false;
  constructor(private toastrService: ToastrService,
              private lookUpService:AppLookUpService,
              public userInfoService: UserInfoService,
              public ref: ChangeDetectorRef,
              private deleteModal: DeleteModalComponentService){}
  
  
  ngOnInit(): void {
    this.ref.detectChanges();
  }
  AddIdentification(){
    this.selectedIdentification = new Object() as Identification;
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
  async IdentificationAdded(identification:Identification){
    let identificationData :Identification = {
      ...identification,
      recId:identification?.recId ? identification?.recId : 0,
      applicantPersonRecId:Number(localStorage.getItem('applicantPersonRecid'))
    }
    let response = await this.lookUpService.UpdateApplicantProfileIdentification(identificationData);
    if(response?.Status){
    this.toastrService.success(response?.Message);
    this.CloseSidenav();
    await this.userInfoService.GetApplicantProfile();
    }else{
      this.toastrService.error(response?.Message);
    }
  }
  DeleteIdentification(identification:Identification){
    
    const data = `Are you sure you want to do delete this Identification?`;
    const dialogRef = this.deleteModal.openDialog(data);
    dialogRef.afterClosed().subscribe(async (dialogResult: any) => {
      if (dialogResult) {
         let applicantPersonRecId = Number(localStorage.getItem('applicantPersonRecid'))
        let response:any = await this.lookUpService.DeleteIdentification(identification?.recId ,applicantPersonRecId);
        if(response?.Status){
          this.toastrService.success(response?.Message);
          await this.userInfoService.GetApplicantProfile();
        }else{
          this.toastrService.error(response?.Message);
        }
      }
    });
  }
  EditIdentification(identification:Identification){
    this.selectedIdentification = identification;
    this.OpenSidenav();
  }
}
