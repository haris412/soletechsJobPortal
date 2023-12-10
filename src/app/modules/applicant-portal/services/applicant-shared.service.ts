import { EventEmitter, Injectable } from '@angular/core';
import { SavedJobs } from '../models/savedJobs';

@Injectable({
  providedIn: 'root',
})
export class ApplicantDataService {
    loginEmitter:EventEmitter<boolean> = new EventEmitter();
    isLogin:boolean = false;
    selectedJob:any;
    savedJobs: SavedJobs[] = [];
    SetJob(job:any){
      this.selectedJob = job;
    }
    GetJob(){
      return this.selectedJob;
    }
}