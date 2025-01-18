import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_WEATHER_API_URL,
    params: {
    appid: process.env.WEATHER_WEATHER_API_URL
    },
});

export default axiosInstance;
