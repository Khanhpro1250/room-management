export interface AuthUser {
    rights: string[];
    user: AppUser;
    token: string;
}

export interface AppUser {
    id: string;
    userName: string;
    fullName?: string;
    isSupper: boolean;
    isAdmin: boolean;
    emailAddress: string;
    phoneNumber?: string;
    orgId?: string;
    userCode?: string;
    amount?: number;
    issueDate: Date;
    dateOfBirth: Date;
    collectionFromDate: number;
    collectionToDate: number;
    bankAccount: string;
    bankAccountName: string;
    bankBranch: string;
}

export interface IUser {
    id: string;
    userName: string;
    fullName?: string;
    isAdmin: boolean;
    emailAddress: string;
    phoneNumber?: string;
    password?: string;
    rePassword?: string;
}

export interface LoginParam {
    userName: string;
    password: string;
    rememberMe: boolean;
}

export interface RegisterParam {
    userName: string;
    password: string;
    rePassword: string;
    fullName?: string;
    emailAddress: string;
    phoneNumber: string;
    userCode?: string;
    address?: string;
}
