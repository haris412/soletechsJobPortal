import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { UploadCvsDTO, UploadMedicalDTO } from 'src/app/modules/user-profile/user-profile.component';

@Component({
  selector: 'app-medical-check-up',
  templateUrl: './medical-check-up.component.html',
  styleUrls: ['./medical-check-up.component.scss']
})
export class MedicalCheckUpComponent {
  fileList:any[]=[];
  fileCvData: any;
	uploadMedicalData: UploadMedicalDTO[] = [];

  constructor(private lookUpService: AppLookUpService,
		          public toastrService: ToastrService) {
    
  }

  onFileUpload(files: any) {
    if (files.target.files.length > 0) {
      this.fileCvData = files.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.fileCvData);
      reader.onload = () => {
      let cvData: any = reader.result;
      let uploadCVs = new UploadMedicalDTO();
      uploadCVs.applicantId = localStorage.getItem('applicantId') ?? '',
      uploadCVs.attachment = cvData.substring(cvData.indexOf('base64,') + 7, cvData.length);
      uploadCVs.fileName = this.fileCvData.name;
      uploadCVs._imageBase64 = uploadCVs.attachment;
      this.uploadMedicalData.push(uploadCVs);
      };
  }
  this.fileList.push(files.target.files[0]);
  }

  DeleteFile(index: number) {
    this.fileList.splice(index, 1);
		this.uploadMedicalData.splice(index, 1);
  }

  async uploadMedical() {
		let res = await this.lookUpService.uploadMedical(this.uploadMedicalData);
		if (res != null && res.length > 0) {
			this.toastrService.success("Files are uploaded");
		} else {
			this.toastrService.error(res)
		}
	}
}
