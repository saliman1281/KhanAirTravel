export class TicketDetailRequest {
    ticketNumber: string;
    ticketRefund: number;
    ticketInstalment: number;
    //createdDate
    //modifiedDate
    modifiedBy: string;
}

export class TicketDetailResponse {
    ticketDetailId: number;
    ticketNumber: string;
    ticketRefund: number;
    ticketInstalment: number;
    createdDate: string;
    //modifiedDate
    //modifiedBy: string;
}