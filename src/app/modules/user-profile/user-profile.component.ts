import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';
import { ApplicantDataService } from '../applicant-portal/services/applicant-shared.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LinkedInService } from '../applicant-portal/services/linkedin.service';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { userApplicantImage } from 'src/app/models/userImageParameters';
import { UpdateAboutMe } from 'src/app/models/update-about-me.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { CompetenciesCommonService } from '../competencies-common/components/services/competencies-common.service';
import { ToastrService } from 'ngx-toastr';
import { DeleteModalComponentService } from 'src/app/shared/delete-modal/delete-modal.service';
import { UserInfoService } from '../user-info/user-info.service';
import { forkJoin } from 'rxjs';
import { LookupParameters } from 'src/app/models/look-up.model';
import { UploadCvAttachmentResponse } from 'src/app/models/uploadCvAttachmentResponse';
import { CVReaderData } from 'src/app/models/cVReaderData';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  public completed: boolean = true;
  public sidenavOpen: boolean = false;
  title = 'angular';
  public Editor = ClassicEditor;
  index: Number = 1;
  competencyIndex: number = 1;
  imageAvatar: any;
  defaultUrl: string = 'assets/Images/default-image.png';
  fileList: any[] = [];
  fileData: any;
  public isTranslate: boolean = this.translationService.isTranslate;
  aboutMe: string = '';
  aboutMeDisablitiy: boolean = true;
  fileCvData: any;
  uploadCvData: UploadCvsDTO[] = [];
  isActive: number = 2;
  currentId: string = 'basicInformation';
  fileFromAttachments = '';
  attachBase64: any = '';

  constructor(
    private router: Router,
    public ref: ChangeDetectorRef,
    private el: ElementRef,
    public applicantDataService: ApplicantDataService,
    private _sanitizer: DomSanitizer,
    public translationService: TranslationAlignmentService,
    public linkedInServive: LinkedInService,
    private lookUpService: AppLookUpService,
    public shareService: SharedService,
    public competencies: CompetenciesCommonService,
    public toastrService: ToastrService,
    private deleteModal: DeleteModalComponentService,
    private userInfoService: UserInfoService,
    public dialog: MatDialog
  ) {
    this.translationService.languageChange.subscribe((x) => {
      {
        this.isTranslate = x;
      }
    });
  }

  async ngOnInit() {
    if (!this.applicantDataService?.applicantData) {
		await this.applicantDataService.GetUserInfo();
    if (this.applicantDataService.applicantData.attachmentFileName)
      this.GetFilesFromAttachment(this.applicantDataService.applicantData?.attachmentFileName);
    }
    this.isActive = this.applicantDataService?.applicantData?.ApplicationStatus;
    if (
      this.applicantDataService.applicantData?.applicantImage != undefined &&
      this.applicantDataService?.applicantData?.applicantImage != ''
    ) {
      this.applicantDataService.applicantImage =
        this._sanitizer.bypassSecurityTrustResourceUrl(
          'data:image/jpg;base64,' +
            this.applicantDataService?.applicantData?.applicantImage
        );
    }
    if (this.applicantDataService?.applicantData?.cvAttachment) {
      const binaryData = Uint8Array.from(
        atob(this.applicantDataService?.applicantData?.cvAttachment),
        (c) => c.charCodeAt(0)
      );
      const fileSignature =
        binaryData[0].toString(16) +
        binaryData[1].toString(16) +
        binaryData[2].toString(16) +
        binaryData[3].toString(16);
      this.GenerateFileName(fileSignature);
    }
    if (this.applicantDataService.applicantData?.aboutMe) {
      this.aboutMe = this.applicantDataService?.applicantData?.aboutMe;
    }
    if (
      this.userInfoService.countryRegions?.length == 0 ||
      this.userInfoService.nativeLanguage?.length === 0 ||
      this.userInfoService.highestDegree?.length === 0
    ) {
      await this.GetLookups();
    }
    if (
      this.competencies.skillLevelList?.length === 0 ||
      this.competencies.educationDesciplineList?.length === 0 ||
      this.competencies.educationLevelList?.length === 0
    ) {
      await this.shareService.GetLookUps();
    }
  }
  GenerateFileName(fileSignature: any) {
    let fileExtension = '';
    switch (fileSignature) {
      case '89504e47':
        fileExtension = 'png';
        break;
      case '47494638':
        fileExtension = 'gif';
        break;
      case '25504446':
        fileExtension = 'pdf';
        break;
      // Add more cases as needed for other file types
      default:
        fileExtension = 'bin';
    }
    // Construct the file name with the extension
    const fileName = `cv.${fileExtension}`;
    this.fileList.push({ name: fileName });
  }
  OpenSidenav() {
    this.sidenavOpen = true;
  }
  CloseSidenav() {
    this.sidenavOpen = false;
  }
  RouteToProfile() {
    this.router.navigate(['/profile']);
  }
  RouteToCompetencies() {
    this.router.navigate(['/competencies']);
  }
  async selectFile(event: any) {
    if (
      event.target.files[0].type == 'image/jpeg' ||
      event.target.files[0].type == 'image/png'
    ) {
      this.fileData = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.fileData);
      reader.onload = async () => {
        this.imageAvatar = reader.result;
        let applicantImageParameters: userApplicantImage = {
          applicantImage: this.imageAvatar.substring(
            this.imageAvatar.indexOf('base64,') + 7,
            this.imageAvatar.length
          ),
          applicantId: localStorage.getItem('applicantId') ?? '',
        };
        let res = await this.lookUpService.UploadApplicantImage(
          applicantImageParameters
        );
        if (res.Status) {
          this.applicantDataService.applicantImage = this.imageAvatar;
          await this.applicantDataService.GetUserInfo();
        }
      };
    } else {
      alert('file type should be image of jpeg or png');
      return;
    }
  }

  DeleteFile(index: number) {
    const data = `Are you sure you want to do remove this cv?`;
    const dialogRef = this.deleteModal.openDialog(data);
    dialogRef.afterClosed().subscribe(async (dialogResult: any) => {
      if (dialogResult) {
        this.fileList = [];
        this.uploadCvData = [];
      }
    });
  }

  removeAvtar() {
    this.imageAvatar = this.defaultUrl;
  }

  uploadCV(files: any) {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (files?.target?.files?.length > 0) {
      this.fileCvData = files.target.files[0];
      if (this.fileCvData && allowedTypes.includes(this.fileCvData?.type)) {
        const reader = new FileReader();
        reader.readAsDataURL(this.fileCvData);
        reader.onload = () => {
          let cvData: any = reader.result;
          let uploadCVs = new UploadCvsDTO();
          (uploadCVs.applicantId = localStorage.getItem('applicantId') ?? ''),
            (uploadCVs.cvAttachment = cvData.substring(
              cvData.indexOf('base64,') + 7,
              cvData.length
            ));
          uploadCVs.fileName = this.fileCvData.name;
          this.uploadCvData.push(uploadCVs);
        };
        this.fileList.push(files.target.files[0]);
        this.ref.detectChanges();
      } else {
        this.toastrService.error('Only PDF and Word files are allowed');
      }
    }
  }
  ScrollToTarget(event: any) {
    this.currentId = event;
    this.currentId = this.currentId.replace('#', '');
    const targetElement = this.el.nativeElement.querySelector(event);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
  async UpdateAboutme() {
    let aboutMeData: UpdateAboutMe = {
      applicantId: localStorage.getItem('applicantId') ?? '',
      applicantPersonRecid:
        Number(localStorage.getItem('applicantPersonRecid')) ?? 0,
      aboutMe: this.aboutMe,
    };
    let res = await this.lookUpService.UpdateAboutme(aboutMeData);
    if (res.Status) {
      await this.applicantDataService.GetUserInfo();
    }
  }
  GetProfileTabIndex(event: any) {
    this.index = event;
  }
  GetCompetencyTabIndex(event: any) {
    this.competencyIndex = event;
  }
  Next() {
    if (this.index === 1) {
      this.index = 2;
    } else if (this.index === 2) {
      this.index = 3;
    } else if (this.index === 3) {
      this.index = 4;
    }
  }
  Back(index: Number) {
    if (index === 2) {
      this.index = 1;
    } else if (index === 3) {
      this.index = 2;
    } else if (index === 4) {
      this.index = 3;
    }
  }
  DiscardData() {
    this.shareService.discardProfileInfo.emit(true);
  }
  NextCompetency() {
    if (this.competencyIndex === 1) {
      this.competencyIndex = 2;
    } else if (this.competencyIndex === 2) {
      this.competencyIndex = 3;
    } else if (this.competencyIndex === 3) {
      this.competencyIndex = 4;
    } else if (this.competencyIndex === 4) {
      this.competencyIndex = 5;
    } else if (this.competencyIndex === 5) {
      this.competencyIndex = 6;
    }
  }
  PrevCompetency(index: Number) {
    if (index === 2) {
      this.competencyIndex = 1;
    } else if (index === 3) {
      this.competencyIndex = 2;
    } else if (index === 4) {
      this.competencyIndex = 3;
    } else if (this.index === 5) {
      this.competencyIndex = 4;
    } else if (this.index === 6) {
      this.competencyIndex = 5;
    }
  }
  toggleEditor() {
    this.aboutMeDisablitiy = !this.aboutMeDisablitiy;
  }

  async uploadCvs() {
    this.uploadCvData.forEach(x => x.isDefender = this.lookUpService.GetIsDefenderEnabled());
    let res = await this.lookUpService.uploadCvs(this.uploadCvData);
    if (res != null && res.returnContents != null && res.returnContents?.length > 0) {
      this.openDialog(res.cvReaderData);
      this.toastrService.success('Files are uploaded');
    }  else if (res != null && res.isVirus) {
      this.toastrService.error("File contains virus. Please try with valid attachment.");
    } else {
      this.toastrService.error(res);
    }
  }
  async GetLookups() {
    let params: LookupParameters = {
      dataAreaId: 'USMF',
      languageId: 'en-us',
    };
    const lookUps = await forkJoin({
      countries: this.lookUpService.GetCountryRegionLookup(params),
      nativeLanguage: this.lookUpService.GetNativeLanguageCodeLookup(params),
      highestDegree: this.lookUpService.GetHighestDegreeLookups(params),
      reasonCodes: this.lookUpService.GetReasonCodeLookups(params),
      identificationType:
        this.lookUpService.GetIdentificationTypeLookup(params),
    }).toPromise();
    lookUps?.countries?.parmList?.forEach((projects: any) => {
      let data = new Object() as any;
      data.name = projects.Description;
      data.value = projects.Id;
      this.userInfoService.countryRegions.push(data);
    });
    lookUps?.nativeLanguage?.parmList?.forEach((projects: any) => {
      let data = new Object() as any;
      data.name = projects.Description;
      data.value = projects.Id;
      this.userInfoService.nativeLanguage.push(data);
    });
    lookUps?.nativeLanguage?.parmList?.forEach((projects: any) => {
      let data = new Object() as any;
      data.name = projects.Other ? projects.Other : projects.Description;
      data.value = projects.Id;
      this.userInfoService.nativeLanguageArabic.push(data);
    });
    lookUps?.highestDegree?.parmList?.forEach((projects: any) => {
      let data = new Object() as any;
      data.name = projects.Description;
      data.value = projects.Id;
      this.userInfoService.highestDegree.push(data);
    });
    lookUps?.highestDegree?.parmList?.forEach((projects: any) => {
      let data = new Object() as any;
      data.name = projects.Other ? projects.Other : projects.Description;
      data.value = projects.Id;
      this.userInfoService.highestDegreeArabic.push(data);
    });
    lookUps?.identificationType?.parmList?.forEach((projects: any) => {
      let data = new Object() as any;
      data.name = projects.Description;
      data.value = projects.Id;
      this.userInfoService.identificationType.push(data);
    });
    lookUps?.identificationType?.parmList?.forEach((projects: any) => {
      let data = new Object() as any;
      data.name = projects.Other ? projects.Other : projects.Description;
      data.value = projects.Id;
      this.userInfoService.identificationTypeArabic.push(data);
    });
  }

  async GetFilesFromAttachment(attachment: string) {
    this.fileFromAttachments = attachment;
  }

  async DownloadFile() {
    //this.showPdf();
    await this.DownloadFromBlob();
  }

  async DownloadFromBlob() {
    var fileData = await this.lookUpService.GetAttachmentFromBlob(this.applicantDataService.applicantData?.attachmentFileName);
    if (fileData) {
      this.attachBase64 = fileData;
      this.showPdf()
    }
  }

  showPdf() {
    const linkSource =
      'data:application/octet-stream;base64,' + this.attachBase64?.value;
    const downloadLink = document.createElement('a');
    const fileName = this.fileFromAttachments.substring(this.fileFromAttachments.lastIndexOf('_') + 1, this.fileFromAttachments.length);

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  openDialog(cvReader: CVReaderData[]) {
    this.dialog.open(DialogComponent, {
      width: '800px',
      data: { defaultValue: cvReader }
    });
  }

}

export class UploadCvsDTO {
  applicantId: string = '';
  cvAttachment: string = '';
  fileName: string = '';
  isDefender: boolean = false;
}

export class UploadMedicalDTO {
  applicantId: string = '';
  attachment: string = '';
  fileName: string = '';
  _imageBase64: string = '';
  isDefender: boolean = false;
}
