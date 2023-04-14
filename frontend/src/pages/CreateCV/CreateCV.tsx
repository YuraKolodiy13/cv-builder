import React, {useRef} from 'react';
import Info from "../../components/Info/Info";
import Experience from "../../components/Experience/Experience";
import Pdf from "react-to-pdf";
import {Button} from "@mui/material";
import {useAppSelector} from "../../hooks/redux";
import {useCreateCVMutation} from "../../store/cv/cv.api";

const CreateCv = () => {

  const ref = useRef<HTMLDivElement>(null);
  const state = useAppSelector(state => state.cv);
  const [createCV] = useCreateCVMutation();

  return (
    <>
      <Pdf targetRef={ref} filename="document.pdf">
        {({toPdf}) => (
          <button onClick={toPdf} className="button">
            Generate PDF
          </button>
        )}
      </Pdf>
      <Button onClick={() => createCV(state)} variant="contained" color='primary'>Save CV</Button>
      <div className="createCv" ref={ref}>
        <Info/>
        <Experience/>
      </div>
    </>
  );
};

export default CreateCv;