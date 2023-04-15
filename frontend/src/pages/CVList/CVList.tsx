import React, {useState} from 'react';
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

  const [page, setPage] = useState<number>(0);
  const limit = 2;
  const {data: rows = {}} = useGetCVsQuery({limit, page}, {refetchOnMountOrArgChange: true});


  return (
    <div>
      <TableComponent
        headCells={columns}
        data={rows.data || []}
        fixedRight={['status']}
        total={rows.total}
        setPage={setPage}
        page={page}
        defaultPaginate={limit}
      />
    </div>
  );
};

export default CvList;