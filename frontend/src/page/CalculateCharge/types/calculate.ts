export interface CalculateChargeGrid {
    id: string;
    houseName: string;
    roomCode: string;
    customerName: string;
    totalCost: number;
    totalPaid: number;
    totalUnpaid: number;
    dateCalculate: Date;
    lastDateCollectMoney?: Date;
}

export interface CalculateRequestDto {
    roomId: string;
    houseId: string;
    dateCalculate: Date;
}

export interface CollectMoneyDto {
    id: string;
    moneyCollect: number;
    dateCollectMoney: Date;
}

export interface CalculateChargeDetailBillDto {
    houseName: string;
    houseAddress: string;
    roomCode: string;
    customerName: string;
    month: number;
    year: number;
    dateCalculate: string;
    calculateFromDate: string;
    calculateToDate: string;
    dateCustomerMoveIn: string;
    totalCost: string;
    totalCostWord: string;
    calculateChargeDetails: CalculateChargeDetailDto[];
}

export interface CalculateChargeDetailDto {
    title: string;
    cost: string;
    description: string;
}
