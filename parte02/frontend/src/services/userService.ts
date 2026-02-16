import axiosInstance from '../api/axiosInstance';
import type { User, CreateUserDto, UpdateUserDto } from '../types';

export const getAllUsers = async (): Promise<User[]> => {
    const response = await axiosInstance.get<User[]>('/Users');
    return response.data;
};

export const getUserById = async (id: number): Promise<User> => {
    const response = await axiosInstance.get<User>(`/Users/${id}`);
    return response.data;
};

export const createUser = async (user: CreateUserDto): Promise<User> => {
    const response = await axiosInstance.post<User>('/Users', user);
    return response.data;
};

export const updateUser = async (id: number, user: UpdateUserDto): Promise<void> => {
    await axiosInstance.put(`/Users/${id}`, user);
};

export const deleteUser = async (id: number): Promise<void> => {
    await axiosInstance.delete(`/Users/${id}`);
};
