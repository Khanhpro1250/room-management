import { AuditedEntity } from './AuditedEntity';
import { FileEntryCollectionDto } from './File';

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
    fileEntryCollection?: FileEntryCollectionDto;
}

export interface Member {
    id?: string;
    name?: string;
    dateOfBirth?: Date;
    identityNo?: string;
    permanentAddress?: string;
    phoneNumber?: string;
    vehicleNumber?: string;
    temporarilyDate?: Date;
}
