export interface Contract {
    id: string;
    contractNumber: string;
    roomId: string;
    customerId: string;
    month: string;
    signedDate?: Date | null;
    effectDate?: Date | null;
    expiredDate?: Date | null;
}
