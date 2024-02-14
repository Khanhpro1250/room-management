export interface AuditedEntity {
    id: string;
    createdTime: Date | null;
    createdBy: string | null;
    lastModifiedTime: Date | null;
    lastModifiedBy: string | null;
}

export interface IEntity {
    id: string;
}
