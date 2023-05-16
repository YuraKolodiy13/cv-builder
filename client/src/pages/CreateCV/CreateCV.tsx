import React from 'react';
import CvBuilder from "../../components/CVBuilder/CVBuilder";
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
    },
    {
      id: 3,
      fieldType: 'rating',
      title: 'Languages',
      items: [
        {
          id: 1,
          title: 'English',
          details: 4
        },
        {
          id: 2,
          title: 'Ukrainian',
          details: 5
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
  avatar: 'https://firebasestorage.googleapis.com/v0/b/editor-789ee.appspot.com/o/assets%2Fno-avatar.jpg?alt=media&token=9cb9dc17-6256-4ed4-be55-e78af9d16f05',
  options: {
    font: {name: 'Nunito', src: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap'},
    showAvatar: true,
    changeColumnsOrder: false,
  }
}

const CreateCv = () => {

  return (
    <>
      <h1>Create CV</h1>
      <CvBuilder canEdit={true} data={data}/>
    </>
  );
};

export default CreateCv;