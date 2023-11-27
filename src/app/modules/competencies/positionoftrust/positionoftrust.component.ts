import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { PositionOfTrust } from 'src/app/models/position-of-trust.model';
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
  positionTrustList: PositionOfTrust[] = [];
  selectedPositionTrust!:PositionOfTrust;
  personRecId!:number;

  constructor(private toastrService: ToastrService,
    private lookUpService:AppLookUpService,
    private deleteModal: DeleteModalComponentService) {
      this.personRecId = Number(localStorage.getItem('recId'));
     }

  ngOnInit(): void {
    this.GetPositionTrust();
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
    if(trustedPositionResponse?.parmApplicantTrustedPositionList?.length > 0){
      this.positionTrustList = trustedPositionResponse.parmApplicantTrustedPositionList;
    }
  }

  EditPositionOfTrust(position:PositionOfTrust){
    this.selectedPositionTrust = position;
    this.OpenSidenav();
  }

  async PositionTrustAdded(positionOfTrust:PositionOfTrust){
    let positionData: PositionOfTrust = {
      ...positionOfTrust,
      Recid:0,
      applicantPersonRecid: Number(localStorage.getItem('recId'))
    }
    let response;
    if (positionOfTrust.Recid > 0) {
      positionData = positionOfTrust;
      response = await this.lookUpService.EditTrustedPosition(positionData);
    } else {
      response = await this.lookUpService.CreateTrustedPosition(positionData);
    }
    if (response?.Status) {
      this.toastrService.success(response?.Message);
      this.GetPositionTrust();
      this.CloseSidenav();
    }
  }

  Delete(selectedpositionOfTrust:PositionOfTrust) {
    const data = `Are you sure you want to do delete this position Of Trust?`;
    const dialogRef = this.deleteModal.openDialog(data);
    dialogRef.afterClosed().subscribe(async (dialogResult: any) => {
      if (dialogResult) {
        let applicantPersonRecId = Number(localStorage.getItem('recId'));
        let response: any = await this.lookUpService.DeletePositionOfTrust(selectedpositionOfTrust?.Recid, applicantPersonRecId);
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
