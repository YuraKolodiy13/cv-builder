import React from 'react';
import CvBuilder from "../../components/CVBuilder/CVBuilder";
import defaultImg from "../../assets/icons/no-avatar.jpg";
import {ICvBuilderState} from "../../interfaces";

const data: ICvBuilderState = {
  cvName: '',
  info: [
    {
      id: 1,
      fieldType: 'text',
      title: 'Personal Info',
      items: [
        {
          id: 1,
          title: 'Info 1',
          details: 'Details 1'
        },
        {
          id: 2,
          title: 'Info 2',
          details: 'Details 2'
        }
      ]
    },
    {
      id: 2,
      fieldType: 'rating',
      title: 'Skills',
      items: [
        {
          id: 1,
          title: 'Skill 1',
          details: 4
        },
        {
          id: 2,
          title: 'Skill 2',
          details: 3
        },
      ]
    }
  ],
  experience: [
    {
      id: 1,
      title: 'Work Experience',
      items: [
        {
          id: 1,
          position: 'Your Designation (E.g. Software Engineer)',
          company: 'Company Name',
          description: 'Express your skills and experience you\'ve acquired from this job.',
          year: 'Year'
        }
      ]
    },
    {
      id: 2,
      title: 'Education',
      items: [
        {
          id: 1,
          position: 'Field of Study (E.g. Bachelor of IT)',
          company: 'School or Institution',
          description: 'Description',
          year: 'Year'
        }
      ]
    }
  ],
  general: {
    name: 'Your name',
    profession: 'Your profession',
    summary: 'Summary of Yourself'
  },
  avatar: defaultImg
}

const CreateCv = () => {

  return (
    <CvBuilder canEdit={true} data={data}/>
  );
};

export default CreateCv;