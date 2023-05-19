import React, {useRef, useState} from 'react';
import {Button} from "@mui/material";
import Info from "./Info/Info";
import Experience from "./Experience/Experience";
import {useCreateCVMutation, useUpdateCVMutation} from "../../store/cv/cv.api";
import {useParams} from "react-router-dom";
import {ICvBuilderState} from "../../interfaces";
import ConfirmModal from "../modals/ConfirmModal";
import TextField from "@mui/material/TextField";
import {useAppSelector} from "../../hooks/redux";
import {useActions} from "../../hooks/actions";
import clsx from "clsx";
import './CVBuilder.scss';
import Tools from "./Tools/Tools";

interface ICvBuilderProps {
  canEdit: boolean;
  data: ICvBuilderState;
}

const CvBuilder:React.FC<ICvBuilderProps> = ({canEdit, data}) => {

  const {id} = useParams();
  const pdfRef = useRef<HTMLDivElement>(null);
  const [createCV] = useCreateCVMutation();
  const [updateCV] = useUpdateCVMutation();
  const [editMode, setEditMode] = useState(canEdit);
  const [savingToPdf, setSavingToPdf] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [state, setState] = useState<ICvBuilderState>(data);
  const user = useAppSelector(state => state.auth.user);
  const {setIsAuthModalOpen} = useActions();

  const {options: {font, changeColumnsOrder}} = state;

  const handleConfirm = () => {
    user ? setIsOpenConfirmModal(true) : setIsAuthModalOpen(true);
  }

  return (
    <div className={clsx('CVBuilder', {'CVBuilder-editMode': editMode && !savingToPdf})}>
      {font && font.name !== 'Fira Sans' && (
        <style>
          {`@import url(${font.src})`}
        </style>
      )}

      {editMode && (
        <Button
          onClick={handleConfirm}
          variant="contained"
          color='primary'
        >
          {id ? 'Update' : 'Save'} CV
        </Button>
      )}
      <Button
        onClick={() => setEditMode(!editMode)}
        variant="contained"
        color='secondary'
      >
        {editMode ? 'Review' : 'Edit'} Mode
      </Button>
      <div className='createCv-wrapper'>
        <div className='createCv' ref={pdfRef} style={{fontFamily: `${font.name}, sans-serif`}}>
          <Info state={state} setState={setState} editMode={editMode && !savingToPdf} className={clsx({rightColumn: changeColumnsOrder})}/>
          <Experience state={state} setState={setState} editMode={editMode && !savingToPdf} className={clsx({rightColumn: !changeColumnsOrder})}/>
        </div>
        <Tools pdfRef={pdfRef} setSavingToPdf={setSavingToPdf} state={state} setState={setState} editMode={editMode}/>
      </div>

      {isOpenConfirmModal && (
        <ConfirmModal
          open={isOpenConfirmModal}
          onBackgroundClick={() => setIsOpenConfirmModal(false)}
          onSubmitClick={() => id ? updateCV({...state, _id: +id}) : createCV(state)}
          modalTitle={`${id ? 'Update' : 'Save'} CV?`}
          cvName={state.cvName}
          className='confirm-modal'
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