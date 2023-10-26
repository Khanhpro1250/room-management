import { AuditedEntity } from './AuditedEntity';

export interface Customer extends AuditedEntity {
    id: string;
    gender: number;
    fullName: string;
    identityNo: string;
    issueDate: Date;
    phoneNumber1: string;
    phoneNumber2: string;
    issuePlace: string;
    email: string;
    permanentAddress: string;
    birthday: Date;
    birthPlace: string;
    rentalStartTime: Date;
    roomCharge: number;
    deposit: number;
    vehicleNumber: string;
    paymentPeriod: string;
    paymentOneTime: number;
    note: string;
    roomId: string;
    fileUrls: string[];
}
