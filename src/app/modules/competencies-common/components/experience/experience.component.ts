import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Skills } from 'src/app/models/skills.model';
import { DeleteModalComponentService } from 'src/app/shared/delete-modal/delete-modal.service';
import { Experience } from '../models/experience';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { professionalExperience } from 'src/app/models/professional-experience.model';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  public completed: boolean = true;
  public sidenavOpen: boolean = false;
  experienceList: professionalExperience[] = [];
  selectedExperience!: professionalExperience;
  personRecId!: number;
  @Input() isOnboarding : boolean = false;
  constructor(
    private toastrService: ToastrService,
    private deleteModal: DeleteModalComponentService,
    private lookUpService: AppLookUpService
  ) {
    this.personRecId = Number(localStorage.getItem('applicantPersonRecid'));
  }
  ngOnInit(): void {
    this.GetExperiences();
  }

  AddExperience() {
    this.selectedExperience = new Object() as professionalExperience;
    this.OpenSidenav();
  }

  EditExperience(experience: professionalExperience) {
    this.selectedExperience = experience;
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

  async GetExperiences() {
    let experienceResponse = await this.lookUpService.GetProfessionalList(this.personRecId);
    if (experienceResponse?.parmApplicantProfessionalList) {
      this.experienceList = experienceResponse.parmApplicantProfessionalList;
    }
  }
  async ExperienceAdded(experience: professionalExperience) {
    let experienceData: professionalExperience = {
      ...experience,
      //employerLocation: "UK",
      Attachment: experience?.Attachment ? experience?.Attachment : '',
      fileName:experience.fileName ? experience.fileName :'',
      AttachmentWeb:experience.Attachment ? 1 : 0,
      recid: experience?.recid ? experience?.recid : 0,
      applicantPersonRecId: Number(localStorage.getItem('applicantPersonRecid'))
    }
    let response;
    var isEdit = false;
    experienceData.isDefender = this.lookUpService.GetIsDefenderEnabled();
    if (experience?.recid > 0) {
      experienceData = experience;
      response = await this.lookUpService.EditProfessionalExperience(experienceData);
      isEdit = true;
    } else {
      response = await this.lookUpService.CreateProfessionalExperience(experienceData);
    }
    if (response != null && response?.isVirus) {
      this.toastrService.error("File contains virus. Please try with valid attachment.");
    } else if (response) {
      if (isEdit) {
        this.toastrService.success('experience Updated Successfully');
      } else {
        this.toastrService.success('experience Added Successfully');
      }
      await this.GetExperiences();
      this.CloseSidenav();
    } else {
      this.toastrService.error(response?.Message);
    }
  }

  DeleteExperience(selectedExperience: professionalExperience) {
    const data = `Are you sure you want to do this experience?`;
    const dialogRef = this.deleteModal.openDialog(data);
    dialogRef.afterClosed().subscribe(async (dialogResult: any) => {
      if (dialogResult) {
        let applicantPersonRecId = Number(localStorage.getItem('applicantPersonRecid'));
        let response: any = await this.lookUpService.DeleteProfessional(selectedExperience?.recid, applicantPersonRecId);
        if (response?.Status) {
          this.toastrService.success(response?.Message);
          this.GetExperiences();
        } else {
          this.toastrService.error(response?.Message);
        }
      }
    });
  }
}
