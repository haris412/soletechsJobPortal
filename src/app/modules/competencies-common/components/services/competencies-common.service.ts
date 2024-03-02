import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompetenciesCommonService {
   
    skillsList:any[] = [];
    skillsArabicList:any[]=[];
    skillLevelList:any[] = [];
    skillsLevelArabicList:any[]=[];
    educationDesciplineList:any[] = [];
    educationDeciplineArabicList:any[]=[];
    educationLevelList:any[] = [];
    educationLevelArabicList:any[]=[];
    educationInstitutionList:any[] = [];
    educationInstitutionArabicList:any[]=[];
    certificateTypesList:any[] =[];
    certificateTypesArabicList:any[]=[];
  
    SetLookUps(){

    }

}