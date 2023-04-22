import React, {useState} from 'react';
import TableComponent from "../../components/TableComponent/TableComponent";
import {useDeleteCVMutation, useGetCVsQuery} from '../../store/cv/cv.api';
import {ICvBuilder, IHeadCell} from "../../interfaces";
import ReviewImageBox from '../../components/ReviewImageBox/ReviewImageBox';
import useTable from '../../hooks/useTable';
import {ReactComponent as DeleteIcon} from "../../assets/icons/delete.svg";
import ConfirmModal from "../../components/modals/ConfirmModal";

interface IQuery {
  limit: number;
  page: number;
  sort?: string;
}

const columns: IHeadCell[] = [
  {field: 'cvName', headerName: 'CV Name'},
  {field: 'general.name', headerName: 'Name in CV'},
  {field: 'general.profession', headerName: 'Profession'},
  {field: 'general.summary', headerName: 'Summary'},
  {field: 'createdAt', headerName: 'Created'},
  {field: 'updatedAt', headerName: 'Updated'},
  {field: 'avatar', headerName: 'Avatar', withOutSort: true},
  {field: 'actions', headerName: '', withOutSort: true}
];

const CvList = () => {

  const limit = 5;
  const [deleteCV] = useDeleteCVMutation();
  const [currentRowId, setCurrentRowId] = useState<number | null>(null);
  const {tableQuery, handleRequestSort} = useTable(limit);
  const {setPage, rowsPerPage, orderBy, order, page} = tableQuery;
  const query: IQuery = {
    page: tableQuery.page, limit: rowsPerPage
  }
  if(orderBy){
    query.sort = `${orderBy}:${order === 'asc' ? 1 : -1}`;
  }
  const {data: rows = {}, isFetching} = useGetCVsQuery(query, {refetchOnMountOrArgChange: true});

  const handleRemoveCV = () => {
    if((rows.total - 1) / rowsPerPage === page){
      setPage(Math.ceil((rows.total - 1) / rowsPerPage) - 1);
    }
    deleteCV(currentRowId);
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
          'general.name': (row: ICvBuilder) => <span>{row.general.name}</span>,
          'general.profession': (row: ICvBuilder) => <span>{row.general.profession}</span>,
          'general.summary': (row: ICvBuilder) => <span>{row.general.summary}</span>,
          createdAt: (row: ICvBuilder) => <span>{new Date(row.createdAt).toLocaleDateString('en-GB')}</span>,
          updatedAt: (row: ICvBuilder) => <span>{new Date(row.updatedAt).toLocaleDateString('en-GB')}</span>,
          actions: (row: ICvBuilder) => <span onClick={() => setCurrentRowId(row._id)}><DeleteIcon/></span>,
        }}
        options={{
          actions: {
            className: 'actions-cell'
          },
        }}
      />
      {currentRowId && (
        <ConfirmModal
          open={Boolean(currentRowId)}
          onBackgroundClick={() => setCurrentRowId(null)}
          onSubmitClick={handleRemoveCV}
          modalTitle='Delete CV?'
        />
      )}

    </div>
  );
};

export default CvList;