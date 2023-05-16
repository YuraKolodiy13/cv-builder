import React, {useRef, useState} from 'react';
import {Button, InputLabel, MenuItem, Select, FormControl} from "@mui/material";
import Info from "../Info/Info";
import Experience from "../Experience/Experience";
import {useCreateCVMutation, useUpdateCVMutation} from "../../store/cv/cv.api";
import {useParams} from "react-router-dom";
import {ICvBuilderState, IFonts} from "../../interfaces";
import ConfirmModal from "../modals/ConfirmModal";
import TextField from "@mui/material/TextField";
import {useAppSelector} from "../../hooks/redux";
import {useActions} from "../../hooks/actions";
import clsx from "clsx";
import './CVBuilder.scss';
import { jsPDF } from "jspdf";
import {useLazyGetFontQuery} from '../../store/common/common.api';

interface ICvBuilderProps {
  canEdit: boolean;
  data: ICvBuilderState;
}

const fonts = [
  {name: 'Poppins', src: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap'},
  {name: 'Fira Sans', src: 'https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;700&display=swap'},
  {name: 'Roboto Condensed', src: 'https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap'},
  {name: 'Nunito', src: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap'},
];


const CvBuilder:React.FC<ICvBuilderProps> = ({canEdit, data}) => {

  const {id} = useParams();
  const pdfRef = useRef<HTMLDivElement>(null);
  const [createCV] = useCreateCVMutation();
  const [updateCV] = useUpdateCVMutation();
  const [getFont] = useLazyGetFontQuery();
  const [editMode, setEditMode] = useState(canEdit);
  const [savingToPdf, setSavingToPdf] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [state, setState] = useState<ICvBuilderState>(data);
  const user = useAppSelector(state => state.auth.user);
  const {setIsAuthModalOpen} = useActions();

  const handleConfirm = () => {
    user ? setIsOpenConfirmModal(true) : setIsAuthModalOpen(true);
  }

  const generatePDF = async () => {
    setSavingToPdf(true);
    const pdf = new jsPDF({orientation: 'p', format: 'letter'});

    const res = await getFont(state.font.name);

    pdf.addFileToVFS(`${state.font.name}-Regular-normal.ttf`, res.data.value[0]);
    pdf.addFileToVFS(`${state.font.name}-Bold.ttf`, res.data.value[1]);
    pdf.addFont(`${state.font.name}-Regular-normal.ttf`, state.font.name, "normal");
    pdf.addFont(`${state.font.name}-Bold.ttf`, state.font.name, "bold");
    pdf.setFont(state.font.name);


    pdf.html((pdfRef.current!), {
      callback: () => {
        console.log(pdfRef.current, 'pdfRef.current')
        pdf.save("print.pdf");
        setSavingToPdf(false);
      },

    });
  }

  return (
    <div className={clsx('CVBuilder', {'CVBuilder-editMode': editMode})}>
      {state.font && state.font.name !== 'Fira Sans' && (
        <style>
          {`@import url(${state.font.src})`}
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
        <div className="createCv" ref={pdfRef} style={{fontFamily: `${state.font.name}, sans-serif`}}>
          <Info state={state} setState={setState} editMode={editMode && !savingToPdf}/>
          <Experience state={state} setState={setState} editMode={editMode && !savingToPdf}/>
        </div>
        <div className="createCv-tools">
          <Button variant="contained" onClick={generatePDF}>Export PDF</Button>
          <FormControl fullWidth>
            <InputLabel id="select-font">Font</InputLabel>
            <Select
              labelId="select-font"
              value={JSON.stringify(state.font)}
              label="Font"
              onChange={e => setState({...state, font: JSON.parse(e.target.value)})}
              readOnly={!editMode}
            >
              {fonts.map((item: IFonts) =>
                <MenuItem value={JSON.stringify(item)} key={item.name}>{item.name}</MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
      </div>

      {isOpenConfirmModal && (
        <ConfirmModal
          open={isOpenConfirmModal}
          onBackgroundClick={() => setIsOpenConfirmModal(false)}
          onSubmitClick={() => id ? updateCV({...state, _id: +id}) : createCV(state)}
          modalTitle={`${id ? 'Update' : 'Save'} CV?`}
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