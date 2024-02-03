export interface Certificates{
    id:string;
    CertificateTypeId:string;
    IssueDate	:string | Date;
    ExpirationDate:string | Date;
    renewal:number;
    Note:string;
    applicantPersonRecId:number;
    recid:number;
    Attachment:any;
}


