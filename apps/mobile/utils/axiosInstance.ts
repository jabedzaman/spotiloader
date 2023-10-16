import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_ENDPOINT + '/api/v1',
    headers: {
        'x-api-key': process.env.EXPO_PUBLIC_X_API_KEY
    },
});
