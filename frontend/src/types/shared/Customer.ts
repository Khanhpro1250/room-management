export interface Customer {
    id: string;
    fullName: string;
    idNumber: string;
    issuanceDate: Date;
    issuedBy: string;
    phoneNumber: string;
    emailAddress: string;
    permanentAddress: string;
    dateOfBirth: Date;
    placeOfBirth: string;
    roomId: string;
    roomCode: string;
    roomCharge: number;
    roomDeposit: number;
    licensePlate: string;
    note: string;
    images: string[];
}
