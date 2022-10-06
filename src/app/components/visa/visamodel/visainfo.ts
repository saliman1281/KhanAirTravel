
export class VisaInfoRequest {
    visaNumber: string;
    customerCnic: string;
    dealerId:number;
    representId:number;
    visaTypeId: number;
    visaCountry: string;
    visaCostPrice: number;
    visaRetailPrice: number;
    visaPaidAmount: number;
    modifiedBy: string;
    option: string;
    constructor() {
        this.visaNumber = "";
        this.customerCnic = "";
        this.dealerId=0;
        this.representId=0;
        this.visaTypeId = 0;
        this.visaCountry = "";
        this.visaCostPrice = 0;
        this.visaRetailPrice = 0;
        this.visaPaidAmount = 0;
        this.modifiedBy = "";
        this.option = "";
    }
}
export class VisaInfoResponse {
    visaId: number;
    visaNumber: string;
    customerCnic: string;
    dealerId:number;
    representId:number;
    visaType: string;
    visaTypeId: number;
    visaCountry: string;
    visaCostPrice: number;
    visaRetailPrice: number;
    visaPaidAmount: number;
    createDate: string;
    modifiedBy: string;
}