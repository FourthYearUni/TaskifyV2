import { fetcher } from "../helpers/fetch";
import env from "../env";


const GetAllTasks = async () => {
    const url = `${env.API_URL}/tasks`;
    const authKey = env.API_KEY || '';
    const response = await fetcher(url, 'GET', '', authKey);
    return response.data;
}

const DeleteTask = async (id: number) => { 
    const url = `${env.API_URL}/tasks/delete/${id}`;
    const authKey = env.API_KEY || '';
    const response = await fetcher(url, 'DELETE', '', authKey);
    return response.data;
}

const CreateTask = async (data: unknown) => { 
    const url = `${env.API_URL}/tasks/create`;
    const authKey = env.API_KEY || '';
    const response = await fetcher(url, 'POST', data, authKey);
    return response;
}

const UpdateTask = async (id: number, data: unknown) => {
    const url = `${env.API_URL}/tasks/update/${id}`;
    const authKey = env.API_KEY || '';
    const response = await fetcher(url, 'PATCH', data, authKey);
    console.log("Response: zzzz", response);
    return response;
}

const SearchTasks = async (data: string) => { 
    const url = `${env.API_URL}/tasks/search`;
    const authKey = env.API_KEY || '';
    const response = await fetcher(url, 'POST', data, authKey);
    return response.data.data;
}

const GetSingleTask = async (id: number) => { 
    const url = `${env.API_URL}/tasks/${id}`;
    const authKey = env.API_KEY || '';
    const response = await fetcher(url, 'GET', '', authKey);
    console.log("Response: ", response);
    return response.data;
}

export { GetAllTasks, DeleteTask, CreateTask, UpdateTask, SearchTasks, GetSingleTask };