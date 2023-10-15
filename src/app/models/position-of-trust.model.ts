export interface PositionOfTrust{
    id:string;
    employer :string;
    position :string;
    startDate:string | Date;
    endDate:string | Date;
    notes:string;
    attachment :any;
}