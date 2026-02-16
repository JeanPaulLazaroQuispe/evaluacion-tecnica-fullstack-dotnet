import axiosInstance from '../api/axiosInstance';
import type { AuthResponse } from '../types';

export const login = async (username: string, password: string): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>('/Auth/login', {
        username,
        password,
    });
    return response.data;
};
