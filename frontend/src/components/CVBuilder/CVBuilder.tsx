import React, {useEffect, useRef, useState} from 'react';
import Pdf from "react-to-pdf";
import {Button} from "@mui/material";
import Info from "../Info/Info";
import Experience from "../Experience/Experience";
import {useCreateCVMutation, useUpdateCVMutation} from "../../store/cv/cv.api";
import {useParams} from "react-router-dom";
import defaultImg from "../../assets/icons/no-avatar.jpg";
import {ICvBuilderState} from "../../interfaces";

interface ICvBuilderProps {
  canEdit: boolean;
  data?: ICvBuilderState;
}

const CvBuilder:React.FC<ICvBuilderProps> = ({canEdit, data}) => {

  const {id} = useParams();
  const ref = useRef<HTMLDivElement>(null);
  const [createCV] = useCreateCVMutation();
  const [updateCV] = useUpdateCVMutation();
  const [editMode, setEditMode] = useState(canEdit);


  const [state, setState] = useState<ICvBuilderState>({
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
  });

  useEffect(() => {
    if(data){
      const {info, experience, general, avatar} = data;
      setState({info, experience, general, avatar});
    }
  }, [data])

  console.log(canEdit, 'canEdit')

  return (
    <div className={`CVBuilder ${editMode ? 'CVBuilder-editMode' : ''}`}>
      {editMode && (
        <Pdf targetRef={ref} filename="document.pdf">
          {({toPdf} : {toPdf: any}) => (
            <button onClick={toPdf} className="button">
              Generate PDF
            </button>
          )}
        </Pdf>
      )}

      {editMode && (
        <Button
          onClick={() => id ? updateCV({...state, id}) : createCV(state)}
          variant="contained"
          color='primary'
        >
          {id ? 'Update' : 'Save'} CV
        </Button>
      )}
      {id && (
        <Button
          onClick={() => setEditMode(!editMode)}
          variant="contained"
          color='primary'
        >
          {editMode ? 'Review' : 'Edit'} Mode
        </Button>
      )}
      <div className="createCv" ref={ref}>
        <Info state={state} setState={setState} editMode={editMode}/>
        <Experience state={state} setState={setState} editMode={editMode}/>
      </div>
    </div>
  );
};

export default CvBuilder;