export * from './ComboOption';
export * from './House';
export * from './Room';

export type Identifier = string | number;

export interface CoreEntity {
    id: Identifier;
}

export const Authorization = 'authorization';
