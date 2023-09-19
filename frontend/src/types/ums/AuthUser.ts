export interface AuthUser {
    rights: string[];
    user: AppUser;
    token: string;
}

export interface AppUser {
    id: string;
    username: string;
    fullName?: string;
    isSupper: boolean;
    emailAddress: string;
    phoneNumber?: string;
    orgId?: string;
    userCode?: string;
    amount?: number;
}

export interface IUser {
    id: string;
    username: string;
    fullName?: string;
    isAdmin: boolean;
    emailAddress: string;
    phoneNumber?: string;
    password?: string;
    rePassword?: string;
}

export interface LoginParam {
    username: string;
    password: string;
    rememberMe: boolean;
}

export interface RegisterParam {
    username: string;
    password: string;
    rePassword: string;
    fullName?: string;
    emailAddress: string;
    phoneNumber: string;
    userCode?: string;
    address?: string;
}
