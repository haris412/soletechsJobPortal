import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { Certificates } from 'src/app/models/certificates.model';
import { DeleteModalComponentService } from 'src/app/shared/delete-modal/delete-modal.service';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent implements OnInit {
  public completed: boolean = false;
  public sidenavOpen: boolean = false;
  public isFile: boolean = false;
  fileList: any[] = []
  public certificates: any[] = [];
  selectedCertificate!: Certificates;
  personRecId!: number;
  @Input() isOnboarding : boolean = false;
  constructor(private toastrService: ToastrService,
    private deleteModal: DeleteModalComponentService,
    private service: AppLookUpService,
    private datePipe: DatePipe) {
    this.personRecId = Number(localStorage.getItem('applicantPersonRecid'));
  }

  ngOnInit(): void {
    this.GetCertifiates();
  }

  async GetCertifiates() {
    let certificateResponse = await this.service.GetCertificateList(this.personRecId);
    if (certificateResponse?.parmApplicantCertificateList) {
      this.certificates = certificateResponse.parmApplicantCertificateList;
    }
  }

  AddCertificate() {
    this.selectedCertificate = new Object() as Certificates;
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
  async EditCertificate(certificate: Certificates) {
    this.selectedCertificate = certificate;
    this.OpenSidenav();
  }

  async CertificateAdded(certificate: Certificates) {
    let certificateResponse: any;
    let certificateData: Certificates = {
      ...certificate,
      renewal: Number(certificate.renewal) ?? 0,
      recid: certificate?.recid ? certificate?.recid : 0,
      applicantPersonRecId: Number(localStorage.getItem('applicantPersonRecid')),
      IssueDate: this.datePipe.transform(certificate.IssueDate, "yyyy-MM-dd") ?? '',
      ExpirationDate: this.datePipe.transform(certificate.ExpirationDate, "yyyy-MM-dd") ?? ''
    }
    try {
      if (certificate?.recid === 0) {
        certificateResponse = await this.service.CreateCertificate(certificateData);
        if (certificateResponse?.Status) {
          this.toastrService.success(certificateResponse?.Message);
          this.GetCertifiates();
          this.CloseSidenav();
        } else {
          this.toastrService.error(certificateResponse?.Message);
        }
      } else {
        certificateResponse = await this.service.EditCertificate(certificateData);
        if (certificateResponse?.Status) {
          this.toastrService.success(certificateResponse?.Message);
          this.GetCertifiates();
          this.CloseSidenav();
        } else {
          this.toastrService.error(certificateResponse?.Message);
        }
      }
    } catch (exception) {
      console.error();
    }
  }

  Delete(selectedcertificate: Certificates) {
    const data = `Are you sure you want to do delete this certificate?`;
    const dialogRef = this.deleteModal.openDialog(data);
    dialogRef.afterClosed().subscribe(async (dialogResult: any) => {
      if (dialogResult) {
        let applicantPersonRecId = Number(localStorage.getItem('applicantPersonRecid'));
        let response: any = await this.service.DeleteCertificate(selectedcertificate?.recid, applicantPersonRecId);
        if (response?.Status) {
          this.toastrService.success(response?.Message);
          this.GetCertifiates();
        } else {
          this.toastrService.error(response?.Message);
        }
      }
    });
  }
}
