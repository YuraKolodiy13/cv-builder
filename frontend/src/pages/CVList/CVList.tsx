import React, {useState} from 'react';
import TableComponent from "../../components/TableComponent/TableComponent";
import {useGetCVsQuery} from '../../store/cv/cv.api';
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
  const limit = 5;
  const {data: rows = {}, isFetching} = useGetCVsQuery({limit, page}, {refetchOnMountOrArgChange: true});

  let a = `{"info":[{"id":1,"type":1,"title":"rew Infrewro","items":[{"id":1,"title":"Info 1","details":"Details 1"},{"id":2,"title":"Info 2","details":"Details 2"}]},{"id":2,"type":2,"title":"Skills","items":[{"id":1,"title":"Skill 1","details":4},{"id":2,"title":"Skill 2","details":3}]}],"experience":[{"id":1,"title":"Work Experience","items":[{"id":1,"position":"Your Designation (E.g. Software Engineer)","company":"Company Name","description":"Express your skills and experience you've acquired from this job.","year":"Year"}]},{"id":2,"title":"Education","items":[{"id":1,"position":"Field of Study (E.g. Bachelor of IT)","company":"School or Institution","description":"Description","year":"Year"}]}]}`
  console.log(JSON.parse(a), 'JSON.parse(JSON.stringify(a))')


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
        loading={isFetching}
        link='/cv-list'
      />
    </div>
  );
};

export default CvList;