export interface Service {
    id: string;
    type: string;
    name: string;
    code: string;
    price: number;
    unit: string;
    status: boolean;
}
export interface ServiceCustomer {
    serviceId: string;
    price: number;
    quantity: number;
}
