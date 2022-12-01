import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import {
    XTable,
    XTableSortValues,
} from 'src/components/CommonComponents/XTable';
import { LoggerData, LoggerListData } from 'src/utils/types';
import { sortArray } from 'src/utils/helpers';
import { appLoggerListHeaders } from 'src/utils/constants';

interface XAppLoggerTableProps {
    data: LoggerData | undefined;
}

const AppLoggerTable = ({ data }: XAppLoggerTableProps) => {
    const router = useRouter();
    const initialPagesDetail = {
        page: 1,
        rowsPerPage: 10
    }

    const [appLoggerData, setAppLoggerData] = useState<LoggerListData[]>();
    const [totalCount, setTotalCount] = useState<number>(data?.result?.recordsFiltered || 0);
    const [pages, setPages] = useState(initialPagesDetail);
    const [sortValues, setSortValues] = useState<XTableSortValues>({
        sortBy: "logId",
        sortOrder: "asc"
    });

    useEffect(() => {
        if (!router || !router.isReady) {
            return;
        }
        if (data?.result.recordsFiltered) {
            if (router.query) {
                const routerQuery = router.query;
                const filteredRows = data?.result.auditLog.filter((singleRow: LoggerListData) => {
                    let isExist = true;

                    Object.keys(routerQuery).every(singleQueryParams => {
                        if (singleQueryParams === "applicationId" && routerQuery.applicationId) {
                            if (singleRow.applicationId?.toString().includes(routerQuery.applicationId.toString()))
                                isExist = true;
                            else
                                isExist = false;
                        } else if (singleQueryParams === "from_date" && routerQuery.from_date) {
                            const fromDate = moment(routerQuery.from_date).startOf("date");
                            const singleRowDate = moment(singleRow.creationTimestamp).startOf("date");
                            if (routerQuery.to_date) {
                                const toDate = moment(routerQuery.to_date).startOf("date");
                                isExist = fromDate.isSameOrBefore(singleRowDate) && toDate.isSameOrAfter(singleRowDate);
                            }
                            else {
                                isExist = fromDate.isSame(singleRowDate);
                            }
                        } else if (routerQuery[singleQueryParams as keyof LoggerListData] === singleRow[singleQueryParams as keyof LoggerListData]) {
                            isExist = true;
                        }
                        else {
                            isExist = false;
                        }
                        return isExist;

                    });

                    return isExist;
                });
                sortLoggerList(filteredRows);
                setTotalCount(filteredRows.length);
                setPages(initialPagesDetail);
            }
            else {
                setAppLoggerData(data.result.auditLog);
            }

        }

    }, [router, data]);


    useEffect(() => {
        if (appLoggerData) {
            sortLoggerList(appLoggerData);
        }
    }, [sortValues]);


    const sortLoggerList = (toBeSotedLogger: LoggerListData[]) => {
        const checkType: string = sortValues.sortBy === 'creationTimestamp' ? "date" :
            sortValues.sortBy === 'applicationType' ? "toCheckNull" : "Other";
        const newSortedData: any = sortArray(toBeSotedLogger,
            sortValues.sortBy,
            sortValues.sortOrder,
            checkType
        );
        setAppLoggerData([...newSortedData] as LoggerListData[]);
    }

    return (
        <XTable
            headers={appLoggerListHeaders}
            data={appLoggerData ?? []}
            pagination={{
                setPages,
                pages,
                count: totalCount,
            }}
            sort={{
                sortValues,
                setSortValues
            }}
        />
    );
};

export default AppLoggerTable;
