import React, {useState} from 'react';
import TableComponent from "../../components/TableComponent/TableComponent";
import {useGetCVsQuery} from '../../store/cv/cv.api';
import {IHeadCell} from "../../types";
import {IState} from "../../components/CVBuilder/CVBuilder";
import ReviewImageBox from '../../components/ReviewImageBox/ReviewImageBox';
import defaultImg from "../../assets/no-avatar.jpg";

const columns: IHeadCell[] = [
  {field: '_id', headerName: 'Id'},
  {field: 'name', headerName: 'Name'},
  {field: 'profession', headerName: 'Profession'},
  {field: 'summary', headerName: 'Summary'},
  {field: 'createdAt', headerName: 'Created'},
  {field: 'avatar', headerName: 'Avatar', withOutSort: true},
];

const CvList = () => {

  const [page, setPage] = useState<number>(0);
  const limit = 5;
  const {data: rows = {}, isFetching} = useGetCVsQuery({limit, page}, {refetchOnMountOrArgChange: true});

  return (
    <div>
      <TableComponent
        headCells={columns}
        data={rows.data || []}
        fixedRight={['avatar']}
        total={rows.total}
        setPage={setPage}
        page={page}
        defaultPaginate={limit}
        loading={isFetching}
        link='/cv-list'
        transformers={{
          avatar: (row: { avatar: string | undefined; }) => <ReviewImageBox media={[row.avatar || defaultImg]}/>,
          name: (row: IState) => <span>{row.general?.name}</span>,
          profession: (row: IState) => <span>{row.general?.profession}</span>,
          summary: (row: IState) => <span>{row.general?.summary}</span>,
        }}
      />
    </div>
  );
};

export default CvList;