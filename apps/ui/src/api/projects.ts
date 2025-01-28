import { fetcher } from "../helpers/fetch";
import env from "../env";


const GetAllProjects = async () => {
    const url = `${env.API_URL}/projects`;
    const response = await fetcher(url, 'GET', '');
    return response
}

const DeleteProject = async (id: number) => {
    const url = `${env.API_URL}/projects/delete/${id}`;
    const response = await fetcher(url, 'DELETE', '');
    console.log("from delete Response: ", response);
    if (response.status === 200) { 
        return [];
    };
}

const CreateProject = async (data: unknown) => {
    const url = `${env.API_URL}/projects/create`;
    const response = await fetcher(url, 'POST', data);
    return response;
}

const UpdateProject = async (id: number, data: unknown) => {
    const url = `${env.API_URL}/projects/update/${id}`;
    const response = await fetcher(url, 'PATCH', data);
    return response;
}

const SearchProjects = async (data: string) => {
    const url = `${env.API_URL}/projects/search/${data}`;
    const response = await fetcher(url, 'GET', undefined);
    return response;
}

const GetSingleProject = async (id: number) => {
    const url = `${env.API_URL}/projects/single/${id}`;
    const response = await fetcher(url, 'GET', '');
    console.log("Response: ", response);
    return response.data;
}



export { GetAllProjects, DeleteProject, CreateProject, UpdateProject, SearchProjects, GetSingleProject };