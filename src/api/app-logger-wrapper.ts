import { api } from './client-libs';
import { LoggerData } from '../utils/types';

const API_BASE_URL = 'https://run.mocky.io/v3';


export const getLoggerData = async (signal?: AbortSignal | undefined): Promise<LoggerData> => {

    const resp = await api.get(`${API_BASE_URL}/a2fbc23e-069e-4ba5-954c-cd910986f40f`, { signal });

    return resp.data;
};
