import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import { XTablePaginationProps } from './xtablepagination.interface';

const PaginationDiv = styled('div')(({ theme }) => ({
    marginTop: theme.spacing(2),
    justifyContent: "center",
    display: 'flex'
}));

export const XTablePagination = ({
    pages,
    setPages,
    count,
}: XTablePaginationProps) => {
    return (
        <PaginationDiv>
            <Pagination
                page={pages.page || 0}
                count={Math.ceil(count/10)}
                showFirstButton
                showLastButton
                onChange={(e: any, page: number) => {
                    setPages((prev) => {
                        return {
                            ...prev,
                            page,
                        };
                    });
                }}
            />
        </PaginationDiv>
    );
};
