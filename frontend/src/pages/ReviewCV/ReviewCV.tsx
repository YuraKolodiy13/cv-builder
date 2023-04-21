import React from 'react';
import {useParams} from 'react-router-dom';
import {useGetCVQuery} from '../../store/cv/cv.api';
import CvBuilder from "../../components/CVBuilder/CVBuilder";

const ReviewCv = () => {

  const {id} = useParams();
  const {data, isFetching} = useGetCVQuery(id, {refetchOnMountOrArgChange: true});

  if(isFetching) return <p>loading</p>

  return (
    <CvBuilder canEdit={false} data={data}/>
  );
};

export default ReviewCv;