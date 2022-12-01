import {
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    Typography
} from '@mui/material';
import { XTableData, XTableHeader, XTableProps } from './xtable.interface';
import { XTableRow } from './XTableRow';
import { XTableCell } from './XTableCell';
import { XTablePagination } from './XTablePagination';

const getTableData = (data: any[], headers: XTableHeader[]) => {
    const resp = data.map((item) => {
        const newField: XTableData = {};
        headers.map(({ key }) => {
            newField[key] = item[key];
        });
        return newField;
    });
    return resp;
};

export const XTable = ({ data, headers, top, pagination, sort }: XTableProps) => {

    const page = pagination?.pages.page || 1;
    const rowsPerPage = pagination?.pages.rowsPerPage || 10;

    const pageStart = (page - 1) * rowsPerPage;
    const pageEnd = page * rowsPerPage;

    return (
        <>
            <Paper
                sx={{
                    paddingBottom: '2rem',
                    paddingTop: '2rem',
                    paddingLeft: '1rem',
                    paddingRight: '1rem',
                }}
            >
                {top}
                <TableContainer>
                    <Table data-test-id="logger-table">
                        <TableHead>
                            <TableRow>
                                {headers.map((header, index) => (
                                    <XTableCell
                                        key={index}
                                        value={header.name}
                                        tableCellProps={{
                                            align: 'center',
                                        }}
                                        sortValues={sort?.sortValues}
                                        setSortValues={sort?.setSortValues}
                                        currentCellKey={header.key}
                                    ></XTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.length ?
                                getTableData(data, headers).slice(pageStart, pageEnd).map(
                                    (row, index) => (
                                        <XTableRow row={row} key={index} />
                                    )
                                ) : <TableRow>
                                    <TableCell colSpan={5}>
                                        <Typography variant="subtitle1" align="center" gutterBottom>
                                            No Macthing Data Found
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                {pagination && data.length > 0 && (
                    <XTablePagination {...pagination}></XTablePagination>
                )}
            </Paper>
        </>
    );
};
