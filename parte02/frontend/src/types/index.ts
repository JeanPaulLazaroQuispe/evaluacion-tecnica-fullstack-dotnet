export interface AuthResponse {
    token: string;
    username: string;
    role: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
    birthDate?: string;
    role: string;
    isActive: boolean;
    createdAt: string;
}

export interface CreateUserDto {
    username: string;
    email: string;
    password?: string;
    birthDate?: string;
    role: string;
}

export interface UpdateUserDto {
    email: string;
    password?: string;
    birthDate?: string;
    role: string;
}
