export class TicketInfoRequest {
    //tickitId
    customerId: number;
    customerCNIC: string;
    ticketNumber: string;
    ticketPNR: string;
    airlineType: string;
    fromLocation: string;
    toLocation: string;
    bookingDate: string;
    //entrydate:Date;
    ticketCost: number;
    ticketRetail: number;
    ticketAmountPaid: number;
    ticketType: string;
    returnFrom: string;
    returnTo: string;
    returnDate: string;
    passportImage: string;
    //createdDate
    //modifiedDate
    modifiedBy: string;
    constructor() {
        this.customerId = 0;
        this.customerCNIC = "";
        this.ticketNumber = "";
        this.ticketPNR = "";
        this.airlineType = "";
        this.fromLocation = "";
        this.toLocation = "";
        this.bookingDate = "";
        //entrydate:Date;
        this.ticketCost = 0;
        this.ticketRetail = 0;
        this.ticketAmountPaid = 0;
        this.ticketType = "";
        this.returnFrom = "";
        this.returnTo = "";
        this.returnDate = "";
        this.passportImage = "";
        this.modifiedBy = "";
    }
}
export class TicketInfoResponse {
    tickitId: number;
    customerId: number;
    customerCNIC: string;
    ticketNumber: string;
    ticketPNR: string;
    airlineType: string;
    fromLocation: string;
    toLocation: string;
    bookingDate: string;
    //entrydate:Date;
    ticketCost: number;
    ticketRetail: number;
    ticketAmountPaid: number;
    ticketType: string;
    returnFrom: string;
    returnTo: string;
    returnDate: string;
    passportImage: string;
    //createdDate
    //modifiedDate
    //modifiedBy
}

