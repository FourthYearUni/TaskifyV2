import { fetcher } from "../helpers/fetch";
import env from "../env";


const GetAllTasks = async () => {
    const url = `${env.API_URL}/tasks`;
    const response = await fetcher(url, 'GET', '');
    return response.data;
}

const DeleteTask = async (id: number) => { 
    const url = `${env.API_URL}/tasks/delete/${id}`;
    const response = await fetcher(url, 'DELETE', '');
    return response.data;
}

const CreateTask = async (data: unknown) => { 
    const url = `${env.API_URL}/tasks/create`;
    const response = await fetcher(url, 'POST', data);
    return response;
}

const UpdateTask = async (id: number, data: unknown) => {
    const url = `${env.API_URL}/tasks/update/${id}`;
    const response = await fetcher(url, 'PATCH', data);
    console.log("Response: zzzz", response);
    return response;
}

const SearchTasks = async (data: string) => { 
    const url = `${env.API_URL}/tasks/search`;
    const response = await fetcher(url, 'POST', data);
    return response.data.data;
}

const GetSingleTask = async (id: number) => { 
    const url = `${env.API_URL}/tasks/${id}`;
    const response = await fetcher(url, 'GET', '');
    console.log("Response: ", response);
    return response.data;
}

export { GetAllTasks, DeleteTask, CreateTask, UpdateTask, SearchTasks, GetSingleTask };