export class DealerCommonRequest {
    dealerId:number;
    dealerName:string;
}

export class DealerCommonResponse{
    dealerId:number;
    dealerName:string;
}

export class RepresentativeCommonResponse{
    representId:number;
    representativeName:string;
}
export class RepresentativeRequest{
    DealerId:number;
    RepName:string;
    modifiedBy:string;
  }
  export class AirLineRequest{
    AirLineFullName:string;
    AirLineABR:string;
    modifiedBy:string;
  }
  export class AirLineResponse{
    airLineId:number;
    airLineFullName:string;
    airLineABR:string;
  }
  export class TicketTypeRequest{
    TicketId:number;
    TicketTypeName:string;
    modifiedBy:string;
  }
  export class TicketTypeResponse{
    ticketId:number;
    ticketTypeName:string;
  }
  export class VisaTypeRequest{
    VisaTypeId:number;
    VisaTypeName:string;
    modifiedBy:string;
  }
  export class VisaTypeResponse{
    visaTypeId:number;
    visaTypeName:string;
  }