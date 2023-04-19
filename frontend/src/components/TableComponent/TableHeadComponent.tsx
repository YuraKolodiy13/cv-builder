import React, {Fragment} from 'react';
import {TableCell, TableHead, TableRow} from "@mui/material";
import TableSortLabel from "@mui/material/TableSortLabel";
import {ReactComponent as SortDefault} from "../../assets/sort-default.svg";
import {ReactComponent as SortUp} from "../../assets/sort-up.svg";
import Checkbox from "@mui/material/Checkbox";
import {IHeadCell} from "../../interfaces";

interface ITableHeadComponentProps {
  headCells: IHeadCell[];
  fixedLeft?: string[];
  fixedRight?: string[];
  orderBy: string;
  order: "desc" | "asc";
  handleRequestSort: (field: string) => void;
  showCheckbox?: boolean;
  checkedItems?: string[];
  handleCheckedItems?: (value: [] | string) => void;
  tableData: any[];
}

const TableHeadComponent: React.FC<ITableHeadComponentProps> = (props) => {

  const {
    headCells,
    fixedLeft = [],
    fixedRight = [],
    orderBy,
    order,
    handleRequestSort, showCheckbox = false,
    checkedItems = [],
    handleCheckedItems = () => {},
    tableData
  } = props;

  const renderFixedContent = (arr: string[], position: 'left' | 'right') => (
    <TableCell className={`table-cell table-cell-fixed ${position}`}>
      {headCells.map(headCell => arr.includes(headCell.field) && (
        <Fragment key={headCell.headerName}>
          {!headCell.withOutSort
            ? <TableSortLabel
                active={orderBy === headCell.field}
                direction={orderBy === headCell.field ? order : 'asc'}
                onClick={() => handleRequestSort(headCell.field)}
                IconComponent={orderBy !== headCell.field ? SortDefault : SortUp}
                className='table-cell-item'
              >
                {headCell.headerName}
              </TableSortLabel>
            : <span className='table-cell-item'>{headCell.headerName}</span>
          }
        </Fragment>
      ))}
    </TableCell>
  )


  return (
    <TableHead className='table-head'>
      <TableRow>
        {showCheckbox && (
          <TableCell className="table-cell">
            <Checkbox
              checked={tableData.length === checkedItems.length}
              onChange={() => handleCheckedItems([])}
              disableRipple
            />
          </TableCell>
        )}
        {!!fixedLeft.length && renderFixedContent(fixedLeft, 'left')}

        {headCells.map((headCell) => ![...fixedLeft, ...fixedRight].includes(headCell.field) && (
          <TableCell
            key={headCell.field}
            padding='none'
            sortDirection={orderBy === headCell.field ? order : false}
            className='table-cell'
          >
            {!headCell.withOutSort
              ? <TableSortLabel
                active={orderBy === headCell.field}
                direction={orderBy === headCell.field ? order : 'asc'}
                onClick={() => handleRequestSort(headCell.field)}
                IconComponent={orderBy !== headCell.field ? SortDefault : SortUp}
              >
                {headCell.headerName}
              </TableSortLabel>
              : <span>{headCell.headerName}</span>
            }
          </TableCell>
        ))}
        {!!fixedRight.length && renderFixedContent(fixedRight, 'right')}
      </TableRow>
    </TableHead>
  );
};

export default TableHeadComponent;