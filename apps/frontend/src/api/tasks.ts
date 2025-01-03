import { fetcher } from "../helpers/fetch";
import env from "../env";


const GetAllTasks = async () => { 
    const url = `${env.API_URL}/tasks`;
    const authKey = env.API_KEY || '';
    const response = await fetcher(url, 'GET', '', authKey);
    return response.data.data;
}

export { GetAllTasks };