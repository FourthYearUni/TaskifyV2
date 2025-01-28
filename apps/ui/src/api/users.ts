/**
 * @author @0verwatch
 * @description A list of api call handlers for the users resource
 */

import { fetcher } from '../helpers/fetch';
import env from '../env';


export interface User {
    email: string,
    password: string,
    name?: string,
    group?: string,
}

export const login = async (data: User) => { 
    const response = await fetcher(`${env.API_URL}/login`, 'POST', data);
    return response;
}

export const  signup = async (data: User) => {
    const response = await fetcher(`${env.API_URL}/register`, 'POST', data);
    return response;
}

export const getAllUsers = async () => {
    const response = await fetcher(`${env.API_URL}/users`, 'GET', undefined);
    return response;
} 
export const getSingleUser = async (id: number) => {
    const response = await fetcher(`${env.API_URL}/users/single/${id}`, 'GET', undefined);
    return response;
}