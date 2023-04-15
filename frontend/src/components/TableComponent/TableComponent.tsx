import React, {useState} from 'react';
import {TableContainer} from "@mui/material";
import Table from "@mui/material/Table";
import './TableComponent.scss';
import TableHeadComponent from "./TableHeadComponent";
import TableBodyComponent from "./TableBodyComponent";
import TablePagination from "@mui/material/TablePagination";
import {IHeadCell} from '../../types';
import {getComparator, stableSort} from '../../utils';

interface ITableComponentProps {
  headCells: IHeadCell[];
  data: any[];
  transformers?: object;
  fixedLeft?: string[];
  fixedRight?: string[];
  defaultPaginate?: number;
  total: number;
  page: number;
  setPage: (page: number) => void;
  setCheckedItems?: (value: [] | string[]) => void;
  showCheckbox?: boolean;
  checkedItems?: string[];
  handleCheckedItems?: (value: [] | string) => void;
}

const TableComponent: React.FC<ITableComponentProps> = (props) => {

  const {
    headCells,
    data,
    transformers = {},
    fixedLeft = [],
    fixedRight = [],
    defaultPaginate = 10,
    total,
    page,
    setPage,
    showCheckbox,
    checkedItems,
    setCheckedItems = () => {},
    handleCheckedItems
  } = props;

  const [order, setOrder] = useState<"desc" | "asc">('asc');
  const [orderBy, setOrderBy] = useState<string>('');
  const [rowsPerPage, setRowsPerPage] = useState<number>(defaultPaginate);

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const tableData = stableSort(data, getComparator(order, orderBy));

  const renderRows = tableData.map((entry: object) => {
    const transform = {};
    Object.keys(transformers).forEach((key: string) => {
      // @ts-ignore
      transform[key] = transformers[key].apply(this, [entry]);
    });
    return {...entry, ...transform};
  })

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
    setCheckedItems([]);
  };

  return (
    <>
      <TableContainer className='table'>
        <Table>
          <TableHeadComponent
            headCells={headCells}
            fixedLeft={fixedLeft}
            fixedRight={fixedRight}
            orderBy={orderBy}
            order={order}
            handleRequestSort={handleRequestSort}
            handleCheckedItems={handleCheckedItems}
            checkedItems={checkedItems}
            showCheckbox={showCheckbox}
            tableData={tableData}
          />
          <TableBodyComponent
            headCells={headCells}
            tableData={renderRows}
            fixedLeft={fixedLeft}
            fixedRight={fixedRight}
            handleCheckedItems={handleCheckedItems}
            checkedItems={checkedItems}
            showCheckbox={showCheckbox}
          />
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => handleChangePage(newPage)}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default TableComponent;