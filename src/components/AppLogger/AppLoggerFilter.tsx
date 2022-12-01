import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Formik } from 'formik';
import moment from 'moment';
import {
    Grid,
    Paper,
    TextField,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Typography
} from '@mui/material';
import { toast } from 'react-toastify';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LoggerQueryParams } from 'src/utils/types';

interface XAppLoggerFilterProps {
    staticActionType: string[] | undefined;
    staticApplicationType: string[] | undefined;
}

const AppLoggerFilter = ({ staticActionType, staticApplicationType }: XAppLoggerFilterProps) => {
    const router = useRouter();
    const initiallValues: LoggerQueryParams = {
        actionType: "",
        applicationType: "",
        from_date: null,
        to_date: null,
        applicationId: ""
    }
    const [filter, setFilter] = useState<LoggerQueryParams>({ ...initiallValues });

    useEffect(() => {
        if (router?.query) {
            const routerQuery = router.query;
            setFilter({
                actionType: routerQuery.actionType ? routerQuery.actionType.toString() : "",
                applicationType: routerQuery.applicationType ? routerQuery.applicationType.toString() : "",
                from_date: routerQuery.from_date ? routerQuery.from_date.toString() : null,
                to_date: routerQuery.to_date ? routerQuery.to_date.toString() : null,
                applicationId: routerQuery.applicationId ? routerQuery.applicationId.toString() : ""
            })
        }
        else {
            setFilter({ ...initiallValues })
        }
    }, [router])

    const onSubmit = (values: LoggerQueryParams) => {
        if (values.to_date && !values.from_date) {
            toast.error("Please select from date.")
            return;
        }
        setFilter({ ...values })
        if (values.from_date) {
            values.from_date = moment(values.from_date?.toString()).format('YYYY-MM-DD');
        }
        if (values.to_date) {
            values.to_date = moment(values.to_date?.toString()).format('YYYY-MM-DD');
        }

        Object.keys(values)
            .forEach((key) => (
                (values[key as keyof LoggerQueryParams] === null || values[key as keyof LoggerQueryParams] === "")
                && delete values[key as keyof LoggerQueryParams]));

        router.push({
            pathname: router.pathname,
            query: {
                ...values,
            },
        });
    }

    const onReset = () => {
        setFilter({ ...initiallValues });
        router.push({
            pathname: router.pathname,
        });
    }

    return (
        <Formik
            initialValues={filter}
            enableReinitialize={true}
            onSubmit={(values, actions) => {
                onSubmit(values);
                actions.setSubmitting(false);

            }}
        >
            {({ values, handleChange, setFieldValue }) => {
                return (
                    <Form>
                        <Paper sx={{ flexGrow: 1, padding: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={2} md={2}>
                                    <InputLabel id="actionType">
                                        <Typography fontWeight="bold" variant="subtitle1" color="black">
                                            Action Type
                                        </Typography>
                                    </InputLabel>
                                    <FormControl fullWidth>
                                        <Select
                                            id="actionType"
                                            name="actionType"
                                            value={values.actionType}
                                            onChange={handleChange}
                                            displayEmpty
                                            renderValue={
                                                values.actionType !== "" ?
                                                    undefined :
                                                    () => <Typography color="#aaa">Select Action Type</Typography>
                                            }
                                        >
                                            {staticActionType?.map((val) => {
                                                return <MenuItem value={val} key={val}>{val}</MenuItem>
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={2} md={2}>
                                    <InputLabel id="applicationType">
                                        <Typography fontWeight="bold" variant="subtitle1" color="black">
                                            Application Type
                                        </Typography>
                                    </InputLabel>
                                    <FormControl fullWidth>
                                        <Select
                                            id="applicationType"
                                            name="applicationType"
                                            value={values.applicationType}
                                            onChange={handleChange}
                                            displayEmpty
                                            renderValue={
                                                values.applicationType !== "" ?
                                                    undefined :
                                                    () => <Typography color="#aaa">Select Application Type</Typography>
                                            }
                                        >
                                            {staticApplicationType?.map((val) => {
                                                return <MenuItem value={val} key={val}>{val}</MenuItem>
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={2} md={2}>
                                    <InputLabel id="fromDate">
                                        <Typography fontWeight="bold" variant="subtitle1" color="black">
                                            From Date
                                        </Typography>
                                    </InputLabel>
                                    <FormControl fullWidth>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                inputFormat="MM/DD/YYYY"
                                                value={values.from_date}
                                                onChange={val => {
                                                    setFieldValue('from_date', val)
                                                }}
                                                maxDate={values.to_date}
                                                renderInput={(params) => {
                                                    return (
                                                        <TextField
                                                            {...params}
                                                            inputProps={{
                                                                ...params.inputProps,
                                                                placeholder: "Select Date"
                                                            }}
                                                        />
                                                    );
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={2} md={2}>
                                    <InputLabel id="toDate">
                                        <Typography fontWeight="bold" variant="subtitle1" color="black">
                                            To Date
                                        </Typography>
                                    </InputLabel>
                                    <FormControl fullWidth>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                inputFormat="MM/DD/YYYY"
                                                value={values.to_date}
                                                onChange={val => {
                                                    setFieldValue('to_date', val)
                                                }}
                                                minDate={values.from_date}
                                                renderInput={(params) => {
                                                    return (
                                                        <TextField
                                                            {...params}
                                                            inputProps={{
                                                                ...params.inputProps,
                                                                placeholder: "Select Date"
                                                            }}
                                                        />
                                                    );
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={2} md={2}>
                                    <InputLabel id="applicationId">
                                        <Typography fontWeight="bold" variant="subtitle1" color="black">
                                            Application ID
                                        </Typography>
                                    </InputLabel>
                                    <FormControl fullWidth>
                                        <TextField
                                            id="applicationId"
                                            name="applicationId"
                                            value={values.applicationId}
                                            onChange={handleChange}
                                            placeholder="eg 219841/2021"
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} lg={2} md={2} style={{ display: 'flex', alignSelf: 'flex-end' }}>
                                    <Button
                                        color="error"
                                        variant="contained"
                                        type="reset"
                                        style={{ marginRight: 5, maxHeight: '40px', fontSize: '12px' }}
                                        onClick={() => onReset()}
                                    >
                                        RESET
                                    </Button>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        style={{ maxHeight: '40px', fontSize: '12px', padding: 10 }}
                                    >
                                        SEARCH LOGGER
                                    </Button>
                                </Grid>
                            </Grid>

                        </Paper>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AppLoggerFilter;

