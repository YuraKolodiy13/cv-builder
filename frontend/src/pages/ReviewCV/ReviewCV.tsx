import React from 'react';
import Info from "../../components/Info/Info";
import Experience from "../../components/Experience/Experience";
import {useParams} from 'react-router-dom';
import {useGetCVQuery} from '../../store/cv/cv.api';

const ReviewCv = () => {

  const {id} = useParams();
  const {data} = useGetCVQuery(id);
  console.log(data, 'data')

  return (
    <div className="createCv">
      <Info/>
      <Experience/>
    </div>
  );
};

export default ReviewCv;