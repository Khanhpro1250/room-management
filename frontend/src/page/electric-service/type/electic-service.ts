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

export interface IncurredCost {
    id: string;
    roomId: string;
    houseId: string;
    description: string;
    cost: number;
    date: Date;
    type: IncurredCostType;
}

export interface IncurredCostGrid extends IncurredCost {
    houseName: string;
    roomCode: string;
}

export enum IncurredCostType {
    Owner,
    Customer,
}
