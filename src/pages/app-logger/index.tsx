import { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import AppLoggerFilter from 'src/components/AppLogger/AppLoggerFilter';
import AppLoggerTable from 'src/components/AppLogger/AppLoggerTable';
import { useGetLoggerData } from 'src/hooks/useGetLoggerData';
import { getUniqueValueList } from 'src/utils/helpers';

const Logger = () => {

    const [staticActionType, setStaticActionType] = useState<string[]>();
    const [staticApplicationType, setStaticApplicationType] = useState<string[]>();

    const { isLoading, data, error } = useGetLoggerData();

    useEffect(() => {
        if (data?.result.recordsFiltered) {
            setStaticApplicationType(getUniqueValueList(data?.result.auditLog, 'applicationType'));
            setStaticActionType(getUniqueValueList(data?.result.auditLog, 'actionType'));
        }
    }, [data]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
                    Logger Search
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{borderTop: 1, borderColor: 'grey.500' }} >
                <AppLoggerFilter
                    staticActionType={staticActionType}
                    staticApplicationType={staticApplicationType}
                />
            </Grid>
            <Grid item xs={12}>
                {isLoading ?
                    <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
                        Loading...
                    </Typography>
                    : error ?
                        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
                            Something went wrong!!
                        </Typography>
                        :
                        <AppLoggerTable data={data} />
                }
            </Grid>
        </Grid>
    );
};

export default Logger;
