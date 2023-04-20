import React from 'react';
import TableComponent from "../../components/TableComponent/TableComponent";
import {useDeleteCVMutation, useGetCVsQuery} from '../../store/cv/cv.api';
import {ICvBuilderState, IHeadCell} from "../../interfaces";
import ReviewImageBox from '../../components/ReviewImageBox/ReviewImageBox';
import useTable from '../../hooks/useTable';
import {ReactComponent as DeleteIcon} from "../../assets/icons/delete.svg";

interface IQuery {
  limit: number;
  page: number;
  sort?: string;
}

const columns: IHeadCell[] = [
  {field: 'general.name', headerName: 'Name'},
  {field: 'general.profession', headerName: 'Profession'},
  {field: 'general.summary', headerName: 'Summary'},
  {field: 'createdAt', headerName: 'Created'},
  {field: 'avatar', headerName: 'Avatar', withOutSort: true},
  {field: 'username', headerName: 'username'},
  {field: 'actions', headerName: '', withOutSort: true},
];

const CvList = () => {

  const limit = 5;
  const [deleteCV] = useDeleteCVMutation();
  const {tableQuery, handleRequestSort} = useTable(limit);
  const {setPage, rowsPerPage, orderBy, order} = tableQuery;
  const query: IQuery = {
    page: tableQuery.page, limit: rowsPerPage
  }
  if(orderBy){
    query.sort = `${orderBy}:${order === 'asc' ? 1 : -1}`;
  }
  const {data: rows = {}, isFetching} = useGetCVsQuery(query, {refetchOnMountOrArgChange: true});

  const handleRemoveCV = (id: number) => {
    setPage(Math.ceil((rows.total - 1) / rowsPerPage) - 1);
    deleteCV(id);
  }

  return (
    <div>
      <TableComponent
        headCells={columns}
        data={rows.data || []}
        fixedRight={['avatar']}
        total={rows.total}
        defaultPaginate={limit}
        loading={isFetching}
        link='/cv-list'
        tableQuery={tableQuery}
        handleRequestSort={handleRequestSort}
        transformers={{
          avatar: (row: {avatar: string}) => <ReviewImageBox media={[row.avatar]}/>,
          'general.name': (row: ICvBuilderState) => <span>{row.general.name}</span>,
          'general.profession': (row: ICvBuilderState) => <span>{row.general.profession}</span>,
          'general.summary': (row: ICvBuilderState) => <span>{row.general.summary}</span>,
          createdAt: (row: ICvBuilderState) => <span>{new Date(row.createdAt).toLocaleDateString('en-GB')}</span>,
          actions: (row: ICvBuilderState) => <span onClick={() => handleRemoveCV(row._id)}><DeleteIcon/></span>,
        }}
        options={{
          actions: {
            className: 'actions-cell'
          },
        }}
      />
    </div>
  );
};

export default CvList;