import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { ApplicantRefrence } from 'src/app/models/position-of-trust.model';
import { DeleteModalComponentService } from 'src/app/shared/delete-modal/delete-modal.service';

@Component({
  selector: 'app-positionoftrust',
  templateUrl: './positionoftrust.component.html',
  styleUrls: ['./positionoftrust.component.scss']
})
export class PositionoftrustComponent implements OnInit{
  public completed: boolean = true;
  public sidenavOpen: boolean = false;
  public isFile: boolean = false;
  positionTrustList: ApplicantRefrence[] = [];
  selectedPositionTrust!:ApplicantRefrence;
  personRecId!:number;

  constructor(private toastrService: ToastrService,
    private lookUpService:AppLookUpService,
    private deleteModal: DeleteModalComponentService) {
      this.personRecId = Number(localStorage.getItem('applicantPersonRecid'));
     }

  ngOnInit(): void {
    this.GetPositionTrust();
  }

  AddPositionTrust(){
    this.selectedPositionTrust = new Object() as ApplicantRefrence;
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
  async GetPositionTrust(){
    let trustedPositionResponse = await this.lookUpService.GetTrustedPositionList(this.personRecId);
    if(trustedPositionResponse?.parmApplicantReferenceList){
      this.positionTrustList = trustedPositionResponse.parmApplicantReferenceList;
    }
  }

  EditPositionOfTrust(position:ApplicantRefrence){
    this.selectedPositionTrust = position;
    this.OpenSidenav();
  }

  async PositionTrustAdded(applicantRefrence:ApplicantRefrence){
    let positionData: ApplicantRefrence = {
      ...applicantRefrence,
      AttachmentWeb:applicantRefrence?.Attachment ? 1: 0,
      ApplicantRecid: applicantRefrence?.ApplicantRecid ? applicantRefrence?.ApplicantRecid : 0,
      applicantPersonRecid: Number(localStorage.getItem('applicantPersonRecid'))
    }
    let response;
    positionData.isDefender = this.lookUpService.GetIsDefenderEnabled();
    if (applicantRefrence.ApplicantRecid > 0) {
      positionData = applicantRefrence;
      response = await this.lookUpService.EditTrustedPosition(positionData);
    } else {
      response = await this.lookUpService.CreateTrustedPosition(positionData);
    }
    if (response != null && response.isVirus) {
      this.toastrService.error("File contains virus. Please try with valid attachment.");
    } else if (response?.Status) {
      this.toastrService.success(response?.Message);
      this.GetPositionTrust();
      this.CloseSidenav();
    }else {
      this.toastrService.error(response?.Message);
    }
  }

  Delete(applicantRefrence:ApplicantRefrence) {
    const data = `Are you sure you want to do delete this position Of Trust?`;
    const dialogRef = this.deleteModal.openDialog(data);
    dialogRef.afterClosed().subscribe(async (dialogResult: any) => {
      if (dialogResult) {
        let applicantPersonRecId = Number(localStorage.getItem('applicantPersonRecid'));
        let response: any = await this.lookUpService.DeletePositionOfTrust(applicantRefrence?.ApplicantRecid, applicantPersonRecId);
        if (response?.Status) {
          this.toastrService.success(response?.Message);
          this.GetPositionTrust();
        }else{
          this.toastrService.error(response?.Message);
        }
      }
    });
  }
}
