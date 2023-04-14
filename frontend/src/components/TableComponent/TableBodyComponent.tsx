import React, {Fragment} from 'react';
import {TableBody, TableCell, TableRow} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import {IHeadCell} from '../../types';

interface ITableBodyComponentProps {
  headCells: IHeadCell[];
  fixedLeft?: string[];
  fixedRight?: string[];
  showCheckbox?: boolean;
  checkedItems?: string[];
  handleCheckedItems?: (value: [] | string) => void;
  tableData: any[];
}

const TableBodyComponent: React.FC<ITableBodyComponentProps> = (props) => {

  const {
    headCells,
    tableData,
    fixedLeft = [],
    fixedRight = [],
    showCheckbox,
    checkedItems = [],
    handleCheckedItems = () => {}
  } = props;

  return (
    <TableBody>
      {!!tableData.length
        ? tableData.map((item) =>
          <Fragment key={item.field}>
            <TableRow className='table-row'>
              {showCheckbox && (
                <TableCell className="table-cell table-cell-checkbox">
                  <Checkbox
                    checked={checkedItems.includes(item.id)}
                    onChange={() => handleCheckedItems(item.id)}
                    disableRipple
                  />
                </TableCell>
              )}
              {!!fixedLeft.length && (
                <TableCell className="table-cell table-cell-fixed left">
                  {headCells.map(el => fixedLeft.includes(el.field) && (
                    <span className='table-cell-item' key={el.field}>{item[el.field] || 'N/A'}</span>
                  ))}
                </TableCell>
              )}

              {headCells.map(el => ![...fixedLeft, ...fixedRight].includes(el.field) && (
                <TableCell key={el.field} className='table-cell'>
                  {item[el.field] || 'N/A'}
                </TableCell>
              ))}
              {!!fixedRight.length && (
                <TableCell className="table-cell table-cell-fixed right">
                  {headCells.map(el => fixedRight.includes(el.field) && (
                    <span className='table-cell-item' key={el.field}>{item[el.field] || 'N/A'}</span>
                  ))}
                </TableCell>
              )}
            </TableRow>
          </Fragment>)
        : <TableRow>
            <TableCell className='table-cell' colSpan={6}><p>No records to display</p></TableCell>
          </TableRow>
      }
    </TableBody>
  );
};

export default TableBodyComponent;