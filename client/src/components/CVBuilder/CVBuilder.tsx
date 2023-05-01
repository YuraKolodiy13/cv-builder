import React, {useRef, useState} from 'react';
import Pdf from "react-to-pdf";
import {Button} from "@mui/material";
import Info from "../Info/Info";
import Experience from "../Experience/Experience";
import {useCreateCVMutation, useUpdateCVMutation} from "../../store/cv/cv.api";
import {useParams} from "react-router-dom";
import {ICvBuilderState} from "../../interfaces";
import ConfirmModal from "../modals/ConfirmModal";
import TextField from "@mui/material/TextField";
import {useAppSelector} from "../../hooks/redux";
import {useActions} from "../../hooks/actions";
import clsx from "clsx";
import './CVBuilder.scss';

interface ICvBuilderProps {
  canEdit: boolean;
  data: ICvBuilderState;
}

const CvBuilder:React.FC<ICvBuilderProps> = ({canEdit, data}) => {

  const {id} = useParams();
  const ref = useRef<HTMLDivElement>(null);
  const [createCV] = useCreateCVMutation();
  const [updateCV] = useUpdateCVMutation();
  const [editMode, setEditMode] = useState(canEdit);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [state, setState] = useState<ICvBuilderState>(data);
  const user = useAppSelector(state => state.auth.user);
  const {setIsAuthModalOpen} = useActions();

  const handleConfirm = () => {
    user ? setIsOpenConfirmModal(true) : setIsAuthModalOpen(true);
  }

  return (
    <div className={clsx('CVBuilder', {'CVBuilder-editMode': editMode})}>

      {editMode && (
        <Button
          onClick={handleConfirm}
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
          color='secondary'
        >
          {editMode ? 'Review' : 'Edit'} Mode
        </Button>
      )}
      <div className='createCv-wrapper'>
        <div className="createCv" ref={ref}>
          <Info state={state} setState={setState} editMode={editMode}/>
          <Experience state={state} setState={setState} editMode={editMode}/>
        </div>
        <div className="createCv-tools">
          {editMode && (
            <Pdf targetRef={ref} filename="document.pdf">
              {({toPdf} : {toPdf: any}) => (
                <Button variant="contained" onClick={toPdf} className="button">
                  Generate PDF
                </Button>
              )}
            </Pdf>
          )}
        </div>
      </div>

      {isOpenConfirmModal && (
        <ConfirmModal
          open={isOpenConfirmModal}
          onBackgroundClick={() => setIsOpenConfirmModal(false)}
          onSubmitClick={() => id ? updateCV({...state, _id: +id}) : createCV(state)}
          modalTitle='Save CV?'
          cvName={state.cvName}
        >
          <div className="modal__row">
            <div className="login__field modal__field w100">
              <TextField
                label="CV name"
                type="text"
                value={state.cvName}
                onChange={(e) => setState({...state, cvName: e.target.value})}
              />
            </div>
          </div>
        </ConfirmModal>
      )}
    </div>
  );
};

export default CvBuilder;