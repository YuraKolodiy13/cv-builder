import React from 'react';
import TableComponent from "../../components/TableComponent/TableComponent";
import { useGetCVsQuery } from '../../store/cv/cv.api';
import {IHeadCell} from "../../types";

const columns: IHeadCell[] = [
  {field: '_id', headerName: 'Id'},
  {field: 'source', headerName: 'Source'},
  {field: 'created_at', headerName: 'Time Stamp'},
  {field: 'twitter_username', headerName: 'Twitter'},
  {field: 'discord_username', headerName: 'Discord'},
  {field: 'status', headerName: 'Status', withOutSort: true},
];

const CvList = () => {

  const {data: rows = [], refetch} = useGetCVsQuery(null);

  return (
    <div>
      <TableComponent
        headCells={columns}
        data={rows}
        fixedRight={['status']}
        total={rows.length}
        fetchData={refetch}
      />
    </div>
  );
};

export default CvList;