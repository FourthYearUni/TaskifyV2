import { fetcher } from "../helpers/fetch";
import env from "../env";


const GetAllProjects = async () => {
    const url = `${env.API_URL}/projects`;
    const authKey = env.API_KEY || '';
    const response = await fetcher(url, 'GET', '', authKey);
    console.log("data===", response.data);
    return response.data;
}

const DeleteProject = async (id: number) => {
    const url = `${env.API_URL}/projects/delete/${id}`;
    const authKey = env.API_KEY || '';
    const response = await fetcher(url, 'DELETE', '', authKey);
    return response.data;
}

const CreateProject = async (data: unknown) => {
    const url = `${env.API_URL}/projects/create`;
    const authKey = env.API_KEY || '';
    const response = await fetcher(url, 'POST', data, authKey);
    return response;
}

const UpdateProject = async (id: number, data: unknown) => {
    const url = `${env.API_URL}/projects/update/${id}`;
    const authKey = env.API_KEY || '';
    const response = await fetcher(url, 'PATCH', data, authKey);
    return response;
}

const SearchProjects = async (data: string) => {
    const url = `${env.API_URL}/projects/search`;
    const authKey = env.API_KEY || '';
    const response = await fetcher(url, 'POST', data, authKey);
    return response.data.data;
}

const GetSingleProject = async (id: number) => {
    const url = `${env.API_URL}/projects/single/${id}`;
    const authKey = env.API_KEY || '';
    const response = await fetcher(url, 'GET', '', authKey);
    console.log("Response: ", response);
    return response.data;
}



export { GetAllProjects, DeleteProject, CreateProject, UpdateProject, SearchProjects, GetSingleProject };