import React from 'react';
import TableComponent from "../../components/TableComponent/TableComponent";
import {useGetCVsQuery} from '../../store/cv/cv.api';
import {ICvBuilderState, IHeadCell} from "../../interfaces";
import ReviewImageBox from '../../components/ReviewImageBox/ReviewImageBox';
import useTable from '../../hooks/useTable';

interface IQuery {
  limit: number;
  page: number;
  sort?: string;
}

const columns: IHeadCell[] = [
  {field: '_id', headerName: 'Id'},
  {field: 'name', headerName: 'Name'},
  {field: 'profession', headerName: 'Profession'},
  {field: 'summary', headerName: 'Summary'},
  {field: 'createdAt', headerName: 'Created'},
  {field: 'avatar', headerName: 'Avatar', withOutSort: true},
];

const CvList = () => {

  const limit = 5;

  const {tableQuery, handleRequestSort} = useTable();
  console.log(tableQuery, 'tableQuery')
  const query: IQuery = {
    page: tableQuery.page, limit
  }
  if(tableQuery.orderBy){
    query.sort = `${tableQuery.orderBy}:${tableQuery.order === 'asc' ? 1 : -1}`;
    console.log(query.sort, 'query.sort')
  }
  const {data: rows = {}, isFetching} = useGetCVsQuery(query, {refetchOnMountOrArgChange: true});

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
          name: (row: ICvBuilderState) => <span>{row.general?.name}</span>,
          profession: (row: ICvBuilderState) => <span>{row.general?.profession}</span>,
          summary: (row: ICvBuilderState) => <span>{row.general?.summary}</span>,
        }}
      />
    </div>
  );
};

export default CvList;