import axios from "axios";

const api = axios.create({baseURL: 'http://192.168.45.4:8080/'});

export const getNutrition = () => api.get('/data');