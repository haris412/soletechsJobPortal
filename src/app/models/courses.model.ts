export interface Course{
    id:string;
    course:string;
    StartDate:string;
    EndDate:string;
    Location:string;
    NoOfDay: number,
    Venue: string,
    HourType: string,
    NumberOfHours: number,
    applicantPersonRecId: number; 
    attachment:any;
    recid?:number;
}