export class CustomerRequest {
    customerFirstName: string;
    customerLastName: string;
    customerFatherName: string;
    customerCNIC:string;
    customerPassportNumber: string;
    customerMobileNumber: string;
    customerWhatsAppNumber: string;
    customerAddress: string;
    customerImagePath: string;
    gender: string;
    modifiedBy: string;
}

export class CustomerResponse {
    custormerId: number;
    customerFirstName: string;
    customerLastName: string
    customerFatherName: string;
    customerCNIC: string;
    customerPassportNumber: string;
    customerMobileNumber: string;
    customerWhatsAppNumber: string;
    customerAddress: string;
    customerImagePath: string;
    gender: string;
    modifiedBy: string;
}