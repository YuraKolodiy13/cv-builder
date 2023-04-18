import React, {useEffect, useRef, useState} from 'react';
import Pdf from "react-to-pdf";
import {Button} from "@mui/material";
import Info from "../Info/Info";
import Experience from "../Experience/Experience";
import {useCreateCVMutation, useUpdateCVMutation} from "../../store/cv/cv.api";
import {useParams} from "react-router-dom";


export interface IAvatar {
  file: object | FileList;
  previewFile: string | ArrayBuffer;
}

export interface IItem {
  id: number;
  title: string;
  details: string | number;
}

export interface IElement {
  id: number;
  type: number;
  title: string;
  items: IItem[]
}


export const initialItem = {
  title: 'Info',
  details: 'Details'
}

export interface IGeneral {
  name: string,
  profession: string,
  summary: string,
}
export interface IExperienceItem {
  id: number,
  position: string,
  company: string,
  description: string,
  year: string,
}
export interface IExperience {
  id: number,
  title: string,
  items: IExperienceItem[]
}


export interface IState {
  info: IElement[],
  experience: IExperience[],
  general: IGeneral
}

interface ICvBuilderProps {
  canEdit: boolean;
  data?: IState;
}

const CvBuilder:React.FC<ICvBuilderProps> = ({canEdit, data}) => {

  const {id} = useParams();
  console.log(id, 'id')
  const ref = useRef<HTMLDivElement>(null);
  const [createCV] = useCreateCVMutation();
  const [updateCV] = useUpdateCVMutation();
  const [editMode, setEditMode] = useState(canEdit);


  const [state, setState] = useState<IState>({
    info: [
      {
        id: 1,
        type: 1,
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
        type: 2,
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
    }
  });

  useEffect(() => {
    if(data){
      const {info, experience, general} = data;
      setState({info, experience, general});
    }
  }, [data])

  console.log(canEdit, 'canEdit')

  return (
    <div className={`CVBuilder ${editMode ? 'CVBuilder-editMode' : ''}`}>
      {editMode && (
        <Pdf targetRef={ref} filename="document.pdf">
          {({toPdf}) => (
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
        <Info/>
        <Experience state={state} setState={setState} editMode={editMode}/>
      </div>
    </div>
  );
};

export default CvBuilder;