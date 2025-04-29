import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { TableDataProps } from '../../Interfaces/props.interface';
import { StyledTableCell, StyledTableRow } from '../StyledTable/StyledTable';
import { memo } from 'react';


function DataTable({
    loading,
    items,
    page,
    size,
    handleChangePage,
    handleChangeRowsPerPage,
    totalCount,
    rowsPerPageOptions,
    labelRowsPerPage,
    columns,
	renderRow
}: TableDataProps) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {columns.map((colName, index) => (
                            <StyledTableCell key={index}>{colName}</StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        <StyledTableRow>
                            <StyledTableCell colSpan={columns.length} align="center">
                                <LoadingScreen />
                            </StyledTableCell>
                        </StyledTableRow>
                    ) : (
						items?.map((item,index) => renderRow(item,index))
						)}
                    
                </TableBody>
            </Table>

            {/* Pagination Component */}
            <TablePagination
                component="div"
                count={totalCount}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={size}
                labelRowsPerPage={labelRowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={rowsPerPageOptions}
                sx={{ borderTop: '1px solid rgba(224, 224, 224, 1)' }}
            />
        </TableContainer>
    )
}
export default memo(DataTable);
