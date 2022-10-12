import * as React from 'react';
import {useState} from "react";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import ModalWindow from "./modal";

const headCells = [
  {
    id: 'created',
    numeric: true,
    label: 'Created',
  },
  {
    id: 'state',
    numeric: false,
    label: 'State',
  },
  {
    id: 'id',
    numeric: true,
    label: '#',
  },
  {
    id: 'title',
    numeric: false,
    label: 'Title',
  },
];

const CustomTableHead = ({ order, orderBy, onRequestSort }) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.numeric ? order : false}
            sx={{ fontWeight: "600" }}
          >
            {headCell.numeric ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            ) :
              <>
                {headCell.label}
              </>
            }
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const CustomTable = ({ data, params, onChangeParams }) => {
  const [dataRow, setDataRow] = useState({ open: false, data: {} });
  const { total_count, page, per_page, order, orderBy } = params;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    onChangeParams({'order': isAsc ? 'desc' : 'asc', 'orderBy': property})
  };

  const handleClick = (data) => {
    setDataRow({ open: true, data })
  };

  const handleChangePage = (event, newPage) => {
    onChangeParams({ 'page': newPage });
  };

  const handleChangeRowsPerPage = (event) => {
    onChangeParams({ 'per_page': event.target.value, 'page': 0 });
  };

  return (
    <Box sx={{ width: "90%", margin: "100px auto" }}>
      <Paper>
        <TableContainer sx={{ height: "600px" }}>
          <Table stickyHeader>
            <CustomTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={data?.length}
            />
            <TableBody>
              {!!data && data.map((row) => {
                  return (
                    <TableRow
                      key={row.id}
                      onClick={() => handleClick(row)}
                      hover
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell component="th" sx={{ width: "15%" }}>
                        {new Date(row.created_at).toISOString().split('T')[0]}
                      </TableCell>
                      <TableCell align="left" sx={{ width: "15%" }}>{row.state}</TableCell>
                      <TableCell align="left" sx={{ width: "15%" }}>{row.id}</TableCell>
                      <TableCell align="left" sx={{ width: "55%" }}>{row.title}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30, 50, 100]}
          component="div"
          count={total_count}
          rowsPerPage={per_page}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <ModalWindow
        open={dataRow.open}
        handleClose={() => setDataRow({ ...dataRow, open: false })}
        data={dataRow.data}
      />
    </Box>
  );
}

export default CustomTable;
