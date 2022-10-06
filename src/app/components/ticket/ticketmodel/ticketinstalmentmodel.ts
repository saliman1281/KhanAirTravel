export class TicketInstalmentRequest {
    ticketInstalmentId: number;
    ticketNumber: string;
    ticketInstalmentAmount: number;
    //createdDate
    //modifiedDate
    modifiedBy: string;
    option: string;
}

export class TicketInstalmentResponse {
    ticketInstalmentId: number;
    ticketNumber: string;
    ticketInstalmentAmount: number;
    //modifiedDate
    createDate:string;
    modifiedBy: string;
}