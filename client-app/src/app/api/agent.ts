import axios, { AxiosResponse } from "axios";
import { IWorkout } from "../models/workout";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = (response: AxiosResponse) => response.data;
const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody),
}

const Workouts = {
    list: ():Promise<IWorkout[]> => requests.get('/workouts'),
    details: (id: string) => requests.get(`/workouts/${id}`),
    create: (workout: IWorkout) => requests.post('/workouts', workout),
    update: (workout: IWorkout) => requests.put(`/workouts/${workout.id}`, workout),
    delete: (id: string) => requests.del(`/workouts/${id}`)

}

export default {
    Workouts
}