import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.WEATHER_API_URL,
    params: {
    appid: process.env.WEATHER_API_KEY
    },
});

export default axiosInstance;
