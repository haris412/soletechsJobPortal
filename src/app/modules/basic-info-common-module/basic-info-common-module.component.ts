import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { LookupParameters } from 'src/app/models/look-up.model';
import { UserInfoService } from '../user-info/user-info.service';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';

@Component({
  selector: 'app-basic-info-common-module',
  templateUrl: './basic-info-common-module.component.html',
  styleUrls: ['./basic-info-common-module.component.scss'],
})
export class BasicInfoCommonModuleComponent implements OnInit {
  constructor(
    private lookUpService: AppLookUpService,
    private userInfoService: UserInfoService,
    public translationService: TranslationAlignmentService
  ) {
    this.translationService.languageChange.subscribe((x) => {
      this.translationService.isTranslate = x;
      this.CountryChanges();
    });
  }

  ngOnInit() {
    this.GetLookups();
  }
  async GetLookups() {
    let params: LookupParameters = {
        dataAreaId: 'USMF',
        languageId: 'en-us',
      },
      countryParams: LookupParameters = {
        dataAreaId: 'USMF',
        languageId: this.translationService.isTranslate ? 'ar' : 'en-us',
      };
    const lookUps = await forkJoin({
      countries: this.lookUpService.GetCountryRegionLookup(countryParams),
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

  CountryChanges() {}
}
