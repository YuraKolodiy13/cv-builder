import React, {useState} from 'react';
import {Skeleton, TableContainer} from "@mui/material";
import Table from "@mui/material/Table";
import './TableComponent.scss';
import TableHeadComponent from "./TableHeadComponent";
import TableBodyComponent from "./TableBodyComponent";
import TablePagination from "@mui/material/TablePagination";
import {IHeadCell} from '../../interfaces';

const getTableSkeleton = (rows: number, cells: number) => {
  return (
    <tbody>
      {[...Array(rows).keys()].map((i) =>
        <tr className='table-row' key={i}>
          {[...Array(cells).keys()].map((j) => <td key={j} className='table-cell'><Skeleton height={30}/></td>)}
        </tr>
      )}
    </tbody>
  )
}

interface ITableComponentProps {
  headCells: IHeadCell[];
  data: any[];
  transformers?: object;
  fixedLeft?: string[];
  fixedRight?: string[];
  defaultPaginate?: number;
  total: number;
  setCheckedItems?: (value: [] | string[]) => void;
  showCheckbox?: boolean;
  checkedItems?: string[];
  handleCheckedItems?: (value: [] | string) => void;
  loading?: boolean;
  link?: string;
  tableQuery: any;
  handleRequestSort: (field: string) => void;
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
    showCheckbox,
    checkedItems,
    setCheckedItems = () => {},
    handleCheckedItems,
    loading,
    link,
    tableQuery: {order, page, setPage, orderBy},
    handleRequestSort
  } = props;

  const [rowsPerPage, setRowsPerPage] = useState<number>(defaultPaginate);


  const renderRows = data.map((entry: object) => {
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
            tableData={data}
          />
          {!loading
            ? <TableBodyComponent
                headCells={headCells}
                tableData={renderRows}
                fixedLeft={fixedLeft}
                fixedRight={fixedRight}
                handleCheckedItems={handleCheckedItems}
                checkedItems={checkedItems}
                showCheckbox={showCheckbox}
                link={link}
              />
            : getTableSkeleton(defaultPaginate, headCells.length)
          }
        </Table>
      </TableContainer>
      {!loading
        ? <TablePagination
            rowsPerPageOptions={[5, 10, 20, 50, 100]}
            component="div"
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => handleChangePage(newPage)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        : <Skeleton/>
      }

    </>
  );
};

export default TableComponent;