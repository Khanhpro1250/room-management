export type FileEntryDto = {
    id: string;
    length: number;
    name: string;
    fileName: string;
    fileLocation: string;
    extension: string;
    url: string;
};

export type FileEntryCollectionDto = {
    id: string;
    fileEntries: FileEntryDto[];
};
