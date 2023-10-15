import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PositionOfTrust } from 'src/app/models/position-of-trust.model';
import { DeleteModalComponentService } from 'src/app/shared/delete-modal/delete-modal.service';

@Component({
  selector: 'app-positionoftrust',
  templateUrl: './positionoftrust.component.html',
  styleUrls: ['./positionoftrust.component.scss']
})
export class PositionoftrustComponent {
  public completed: boolean = true;
  public sidenavOpen: boolean = false;
  public isFile: boolean = false;
  positionTrustList: PositionOfTrust[] = [];
  selectedPositionTrust!:PositionOfTrust;
  constructor(private toastrService: ToastrService,
    private deleteModal: DeleteModalComponentService) { }

  ngOnInit(): void {
  }

  OpenSidenav() {
    this.sidenavOpen = true;
    document.body.style.overflow = 'hidden';
  }

  CloseSidenav() {
    this.sidenavOpen = false;
    document.body.style.overflow = 'auto';
  }

  EditPositionOfTrust(position:PositionOfTrust){
    this.selectedPositionTrust = position;
    this.OpenSidenav();
  }

  PositionTrustAdded(positionOfTrust:PositionOfTrust){
    this.toastrService.success('Position Of Trust Added Successfully');
    this.positionTrustList.push(positionOfTrust);
    this.CloseSidenav();
  }

  Delete(selectedpositionOfTrust:PositionOfTrust) {
    const data = `Are you sure you want to do delete this position Of Trust?`;
    const dialogRef = this.deleteModal.openDialog(data);
    dialogRef.afterClosed().subscribe((dialogResult: any) => {
      if (dialogResult) {
        this.positionTrustList = this.positionTrustList.filter((position:PositionOfTrust) => position.employer !== selectedpositionOfTrust.employer);
      }
    });
  }
}
