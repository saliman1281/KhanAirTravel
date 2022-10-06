export class CommonRequest {
  IsUpdate: boolean = false;
}
export class DealerCommonRequest {
  dealerId: number;
  dealerName: string;
}

export class DealerCommonResponse {
  dealerId: number;
  dealerName: string;
}

export class RepresentativeCommonResponse {
  representId: number;
  dealerId: number;
  representativeName: string;
}
export class RepresentativeRequest extends CommonRequest {
  representId: number;
  dealerId: number;
  representativeName: string;
  modifiedBy: string;
}
export class AirLineRequest extends CommonRequest {
  AirLineFullName: string;
  AirLineABR: string;
  modifiedBy: string;
}
export class AirLineResponse {
  airLineId: number;
  airLineFullName: string;
  airLineABR: string;
}
export class TicketTypeRequest extends CommonRequest {
  TicketId: number;
  TicketTypeName: string;
  modifiedBy: string;
}
export class TicketTypeResponse {
  ticketId: number;
  ticketTypeName: string;
}
export class VisaTypeRequest extends CommonRequest {
  VisaTypeId: number;
  VisaTypeName: string;
  modifiedBy: string;
}
export class VisaTypeResponse {
  visaTypeId: number;
  visaTypeName: string;
}