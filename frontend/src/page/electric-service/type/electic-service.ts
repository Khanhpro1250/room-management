export interface ElectricServiceDto {
    roomCode: string;
    houseName: string;
    customerName: string;
    roomId: string;
    customerId: string;
    month: number;
    year: number;
    oldElectricValue: number;
    newElectricValue: number;
    usedElectricValue: number;
}

export enum ServiceType {
    Electric,
    Water,
}
