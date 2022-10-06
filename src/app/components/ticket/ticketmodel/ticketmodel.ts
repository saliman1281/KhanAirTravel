export class TicketInfoRequest {
    //tickitId
    customerId: number;
    customerCNIC: string;
    ticketNumber: string;
    ticketPNR: string;
    airlineTypeId: number;
    fromLocation: string;
    toLocation: string;
    bookingDate: string;
    //entrydate:Date;
    ticketCost: number;
    ticketRetail: number;
    ticketAmountPaid: number;
    ticketTypeId: number;
    returnFrom: string;
    returnTo: string;
    returnDate: string;
    hotelName: string;
    hotelCostPrice: number;
    hotelRetailPrice: number;
    hotelBokingDate: string;
    passportImage: string;
    dealerId:number;
    representId:number;
    //createdDate
    //modifiedDate
    modifiedBy: string;
    constructor() {
        this.customerId = 0;
        this.customerCNIC = "";
        this.ticketNumber = "";
        this.ticketPNR = "";
        this.airlineTypeId;
        this.fromLocation = "";
        this.toLocation = "";
        this.bookingDate = "";
        //entrydate:Date;
        this.ticketCost = 0;
        this.ticketRetail = 0;
        this.ticketAmountPaid = 0;
        this.ticketTypeId;
        this.returnFrom = "";
        this.returnTo = "";
        this.returnDate = "";
        this.hotelName = "";
        this.hotelCostPrice = 0;
        this.hotelRetailPrice = 0;
        this.hotelBokingDate = "";
        this.passportImage = "";
        this.dealerId=0;
        this.representId=0;
        this.modifiedBy = "";
    }
}
export class TicketInfoResponse {
    tickitId: number;
    customerId: number;
    customerCNIC: string;
    ticketNumber: string;
    ticketPNR: string;
    airlineTypeId: string;
    fromLocation: string;
    toLocation: string;
    bookingDate: string;
    //entrydate:Date;
    ticketCost: number;
    ticketRetail: number;
    ticketAmountPaid: number;
    ticketTypeId: string;
    returnFrom: string;
    returnTo: string;
    returnDate: string;
    hotelName: string;
    hotelCostPrice: number;
    hotelRetailPrice: number;
    hotelBokingDate: string;
    passportImage: string;
    dealerId:number;
    representId:number;
    //createdDate
    //modifiedDate
    //modifiedBy
}

