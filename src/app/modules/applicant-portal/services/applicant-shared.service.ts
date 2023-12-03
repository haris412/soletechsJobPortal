import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApplicantDataService {
    loginEmitter:EventEmitter<boolean> = new EventEmitter();
    isLogin:boolean = false;
    selectedJob:any;
    SetJob(job:any){
      this.selectedJob = job;
    }
    GetJob(){
      return this.selectedJob;
    }
}