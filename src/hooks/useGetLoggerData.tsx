import { useQuery } from '@tanstack/react-query';
import { getLoggerData } from '../api/app-logger-wrapper';

export const useGetLoggerData = () => {

    return useQuery(['loggers'],
        async ({ signal }) => getLoggerData(signal),
        { refetchOnWindowFocus: false }
    );

};
