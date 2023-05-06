import React from 'react';
import {useParams} from 'react-router-dom';
import {useGetCVQuery} from '../../store/cv/cv.api';
import CvBuilder from "../../components/CVBuilder/CVBuilder";

const ReviewCv = () => {

  const {id} = useParams();
  const {data, isFetching} = useGetCVQuery(id!, {refetchOnMountOrArgChange: true});

  if(isFetching) return <p>loading</p>;

  if(!data) return <h3>You don't have right to see this page</h3>

  return (
    <CvBuilder canEdit={false} data={data!}/>
  );
};

export default ReviewCv;