export class ApplicantOnboardingTasks {
    $id: string = '';
    ActivityDuration: number= 0;
    AssingedTo: string = '';
    CareerPageTaskStatus: number = 0;
    ContactPerson: string = '';
    Duedays: number = 0;
    OverviewArabic: string = '';
    ProcessType: number = 0;
    RegardingWorker: string = '';
    ResolvedBy: number = 0;
    Status: number = 0;
    applicantOnBoding: number = 0;
    assignmentType: number = 0;
    description: string = '';
    dueDate: string | Date = '';
    instructions: string = '';
    isOptional: number = 0;
    jobArabic: string = '';
    jobId: string = '';
    jobLocationArabic: string = '';
    jobType: string = '';
    jobadTextArabic: string = '';
    mandatoryAttachment: number = 0;
    recruitingArabic: string = '';
    taskLink: string = '';
    taskName: string = '';
    Active: boolean = false;
    Completed: boolean = false;
    markAsComplete: boolean = false;
}

export class ActivityDurationGroupByData {
    ActivityDuration: string = '';
    applicantOnboardingTasks: ApplicantOnboardingTasks[] = [];
}