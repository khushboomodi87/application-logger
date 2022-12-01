import { TableCell, TableSortLabel, Typography } from '@mui/material';
import { XTableCellProps } from './xtablecell.interface';

export const XTableCell = ({ value, tableCellProps, sortValues, currentCellKey, setSortValues }: XTableCellProps) => {
    const transformValue = () => {
        if (typeof value === 'string' || typeof value === 'number') {
            return value;
        }
        if (value == null) {
            return '-/-';
        }
    };
    return (
        <>
            {sortValues && setSortValues ?
                <TableCell {...tableCellProps} >
                    <Typography variant="subtitle1" align="center" fontWeight="bold" gutterBottom>
                        <TableSortLabel
                            active={sortValues.sortBy === currentCellKey}
                            direction={sortValues.sortBy === currentCellKey ? sortValues.sortOrder : "asc"}
                            onClick={() => {
                                setSortValues({
                                    sortBy: currentCellKey || "",
                                    sortOrder: sortValues.sortBy === currentCellKey && sortValues.sortOrder === "asc" ? "desc" : "asc"
                                })
                            }}
                        >
                            {value}
                        </TableSortLabel>
                    </Typography>
                </TableCell> :
                <TableCell {...tableCellProps} >
                    {transformValue()}
                </TableCell>
            }
        </>
    );
};
