import { Identifier } from '~/types/shared';

export interface DepositDto {
    id: Identifier;
    roomId: string;
    customerName: string;
    phoneNumber: string;
    depositAmount: number;
    expectedDate: Date;
    depositDate: Date;
    maximumDays: number;
    status: string;
    note: string;
}
export interface DepositGridDto extends DepositDto {
    houseName: string;
    roomCode: string;
}
