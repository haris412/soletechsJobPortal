import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job.model';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss'],
  host: {
    '(window:resize)': 'onWindowResize($event)',
  },
})
export class JobsListComponent implements OnInit {

  isActive: boolean = false;
  width: number = window.innerWidth;
  minimunWidth: number = 992;
  mobileView:boolean = false;
  showJobList:boolean = true;
  jobsList:Job[]= [{
    jobId:'1',
    jobTitle:'Lead Product Design',
    jobDescription:"Your job as a UX designer is to give a world-class experience for tiket.com users. You have main responsibilities to conduct the user and/or evaluation research, do a lot of sketching, and create wireframes that have a high usability. As a UX designer you'll work closely with a team of UX, Engineers and Product Managers to design products that are simple but great for the user, focusing on developing user scenarios, task analysis, process flows and Lo-Fidesign mocks.",
    JobRequiredSkills:['Interaction Design' , 'Graphic Design' , 'User Interface', 'UI/UX Design' , 'B2B'],
    location:'Dubai, UAE',
    postedDate:'Posted 3 days ago',
    experience:'Minimum 1 Year',
    workLevel:'Senior Level',
    jobType:'Full Time Jobs',
    salary:'$2150,0 / Month',
    responsibilities:["You possess strong visual and wrtitten communication and core design skills. You have a minimum of 3-5 years of professional experiencein creativity" , "You have an exciting and diverse portfolio of work that displays a deep understanding of interactive design and strong conceptual problem solving" , "You are comfortable communicating with cross-functional partners in the marketing, buyer-experience, and product design organizations" ,"You have a love of building brands and an understanding of the importance of their impact within an organization" , "You are confident in presenting and articulating work to peers and stakeholders" ,"You have the ability to design for different audiences and needs","You are able to receive and solicit feedback like a pro","You are eager to grow and learn in an energizing and high-growth environment" ,"You are an expert in the Adobe suite of products, Figma, Keynote,and Microsoft Office"],
    dayToDay:['Supporting a variety of creative projects that support the entire Atlassian business, ranging from design to production tasks'],
    interactionWithTeam:[' Access to slack and all Atlassian products, bi-weekly 1:1 with the manager, and weekly team meetings'],
    techSkillsNeeded:['Adobe Creative Cloud' , 'Figma', 'Keynote']

  }];
  selectedJob:Job = new Object() as Job;


  constructor() { }

  ngOnInit(): void {
  }

   OpenJob(job:Job){
    this.selectedJob = job;
    this.isActive = true;
   }
   onWindowResize(event:any) {
    this.width = event.target.innerWidth;
    this.mobileView = this.width < this.minimunWidth;
  }
}
