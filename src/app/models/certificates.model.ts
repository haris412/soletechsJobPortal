export interface Certificates{
    id:string;
    Certificatetypeid:string;
    Description	:string;
    Issuedate	:string | Date;
    HcmWorker:number;
    Expirationdate:string | Date;
    requireRenewal:string;
    Note:string;
    attachment:any;
    PersonCertificateRecVersion:number;
    Workflowcomments:string
}