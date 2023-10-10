export interface Room {
    id: string;
    roomCode: string;
    houseId: string;
    number: number;
    acreage: string;
    price: string;
    maxNumberOfPeople: number;
    deposit: number;
    description: string;
    fileUrls: string[] | null;
    file: string[] | null;
}
