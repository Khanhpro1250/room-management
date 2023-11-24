import { FileEntryCollectionDto } from './File';

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
    fileEntryCollection?: FileEntryCollectionDto;
    file: string[] | null;
    status: string;
    statusName: string;
}
