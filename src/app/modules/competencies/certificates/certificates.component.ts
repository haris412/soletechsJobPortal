import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Certificates } from 'src/app/models/certificates.model';
import { DeleteModalComponentService } from 'src/app/shared/delete-modal/delete-modal.service';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent {
  public completed: boolean = false;
  public sidenavOpen: boolean = false;
  public isFile: boolean = false;
  fileList:any[]=[]
  public certificates: Certificates[]=[];
  selectedCertificate!:Certificates
  constructor(private toastrService: ToastrService,
    private deleteModal: DeleteModalComponentService) { }

  ngOnInit(): void {}

  OpenSidenav() {
    this.sidenavOpen = true;
    document.body.style.overflow = 'hidden';
  }

  CloseSidenav() {
    this.sidenavOpen = false;
    document.body.style.overflow = 'auto';
  }
  EditCertificate(certificate:Certificates){
    this.selectedCertificate = certificate;
    this.OpenSidenav();
  }

  CertificateAdded(certificate:Certificates){
    this.toastrService.success('certificate Added Successfully');
    this.certificates.push(certificate);
    this.CloseSidenav();
  }

  Delete(selectedcertificate:Certificates) {
    const data = `Are you sure you want to do delete this certificate?`;
    const dialogRef = this.deleteModal.openDialog(data);
    dialogRef.afterClosed().subscribe((dialogResult: any) => {
      if (dialogResult) {
        this.certificates = this.certificates.filter((certificate:Certificates) => certificate.certificate !== selectedcertificate.certificate);
      }
    });
  }
}
