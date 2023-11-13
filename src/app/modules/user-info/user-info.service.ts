import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class UserInfoService {
    countryRegions: any[] = [];
    cities: any[] = [];
    ethnic: any[] = [];
    nativeLanguage: any[] = [];
    highestDegree: any[] = [];
    reasonCodes: any[] = [];
    identificationType: any[] = [];
}