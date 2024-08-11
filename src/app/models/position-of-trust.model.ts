export interface PositionOfTrust{
    id:string;
    Employment :string;
    Position :string;
    StartDate:string | Date;
    EndDate:string | Date;
    Notes:string;
    applicantPersonRecid:number;
    Attachment :any;
    AttachmentWeb?:number;
    Recid:number;
    isDefender: boolean;
}