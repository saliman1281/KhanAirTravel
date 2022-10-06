export class VisaInstalmentRequest {
    visaInstalmentId: number;
    visaNumber: string;
    visaInstalmentAmount: number;
    //createdDate
    //modifiedDate
    modifiedBy: string;
    option: string;
}

export class VisaInstalmentResponse {
    visaInstalmentId: number;
    visaNumber: string;
    visaInstalmentAmount: number;
    //modifiedDate
    createDate:string;
    modifiedBy: string;
}