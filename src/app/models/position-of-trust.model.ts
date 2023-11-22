export interface PositionOfTrust{
    id:string;
    Employment :string;
    Position :string;
    StartDate:string | Date;
    EndDate:string | Date;
    Notes:string;
    applicantPersonRecid:number;
    attachment :any;
    Recid?:number;
}