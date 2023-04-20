import React, {useState} from "react";

const useTable = (defaultPaginate: number) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(defaultPaginate);

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    setPage(0);
  };

  return {
    tableQuery: {order, page, setPage, orderBy, rowsPerPage, setRowsPerPage},
    handleRequestSort
  }
};

export default useTable;