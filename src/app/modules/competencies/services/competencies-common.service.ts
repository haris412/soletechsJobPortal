import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompetenciesCommonService {
   
    skillsList:any[] = [];
    skillLevelList:any[] = [];
    educationDesciplineList:any[] = [];
    educationLevelList:any[] = [];
    educationInstitutionList:any[] = [];
    certificateTypesList:any[] =[];
    personalTitleList:any[] = [];
    SetLookUps(){

    }

}