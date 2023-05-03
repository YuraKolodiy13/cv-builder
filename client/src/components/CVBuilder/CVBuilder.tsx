import React, {useRef, useState} from 'react';
import ReactToPdf from "react-to-pdf";
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
import html2canvas from "html2canvas";

interface ICvBuilderProps {
  canEdit: boolean;
  data: ICvBuilderState;
}

const fonts = [
  {name: 'Poppins', src: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap'},
  {name: 'Fira Sans', src: 'https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;600&display=swap'},
  {name: 'Roboto Condensed', src: 'https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;500;600&display=swap'},
  {name: 'Nunito', src: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600&display=swap'},
];


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

  const handleConfirm = () => {
    user ? setIsOpenConfirmModal(true) : setIsAuthModalOpen(true);
  }

  const createPDF = async () => {

    const pdf = new jsPDF("portrait", "pt", "a4");
    const data = await html2canvas(pdfRef.current);
    const img = data.toDataURL("image/png");
    const imgProperties = pdf.getImageProperties(img);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("cv.pdf");
    setSavingToPdf(false)
  };

  const generatePDF = () => {
    setSavingToPdf(true);
    const content = pdfRef.current;


    // const pdf = new jsPDF('p', 'pt', 'a4', false);
    // pdf.html(content.innerHTML, {
    //   callback: (doc) => {
    //     pdf.save('sample.pdf');
    //     setSavingToPdf(false)
    //   },
    //   margin: [0, 0, 0, 0],
    //   html2canvas: {scale: .7},
    // });

    // setTimeout(() => {
    //   html2canvas(content!)
    //     .then((canvas) => {
    //       const imgData = canvas.toDataURL('image/png');
    //       console.log(savingToPdf, 'sa2')
    //       const pdf = new jsPDF();
    //       const width = pdf.internal.pageSize.getWidth();
    //       const height = pdf.internal.pageSize.getHeight();
    //       console.log(savingToPdf, 'sa3')
    //       pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
    //       pdf.save("download.pdf");
    //       console.log(savingToPdf, 'sa4')
    //       // setSavingToPdf(false);
    //       console.log(savingToPdf, 'sa5')
    //     })
    //   console.log(savingToPdf, 'sa7')
    // }, 5000)
    // console.log(savingToPdf, 'sa6')
    // const content = pdfRef.current;
    const doc = new jsPDF('p', 'pt', 'a4', false);
    doc.html(content, {
      x: 20,
      y: 20,
      autoPaging: 'text',
      margin: [10, 0, 10, 0],
      html2canvas: {
        scale: .9,
      },
      callback: (doc) => {
        doc.save('sample.pdf');
        setSavingToPdf(false)
      },
    });
  }

  return (
    <div className={clsx('CVBuilder', {'CVBuilder-editMode': editMode})}>
      {state.font && state.font.name !== 'Fira Sans' && (
        <style>
          {`
            @import url(${state.font.src});
            .CVBuilder{
              font-family: ${state.font.name}, sans-serif;
            }
          `}
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
        <div className="createCv" ref={pdfRef}>
          <Info state={state} setState={setState} editMode={editMode && !savingToPdf}/>
          <Experience state={state} setState={setState} editMode={editMode && !savingToPdf}/>
        </div>
        {editMode && (
          <div className="createCv-tools">
            <Button variant="contained" onClick={generatePDF}>Export PDF</Button>
            <Button variant='outlined' onClick={() => {
              setSavingToPdf(true);
              createPDF();
            }}>Export PDF (text isn't selectable)</Button>

            {/*<ReactToPdf targetRef={pdfRef} filename="document.pdf">*/}
            {/*  {({toPdf} : {toPdf: any}) => (*/}
            {/*    <Button variant="contained"*/}
            {/*            onClick={async () => {*/}
            {/*              setSavingToPdf(true);*/}
            {/*              console.log(editMode, 'edit')*/}
            {/*              await toPdf();*/}
            {/*              console.log(editMode, 'edit2')*/}
            {/*              setSavingToPdf(false);*/}
            {/*            }}*/}
            {/*            className="button">*/}
            {/*      Generate PDF*/}
            {/*    </Button>*/}
            {/*  )}*/}
            {/*</ReactToPdf>*/}
            <FormControl fullWidth>
              <InputLabel id="select-font">Font</InputLabel>
              <Select
                labelId="select-font"
                value={JSON.stringify(state.font)}
                label="Font"
                onChange={e => setState({...state, font: JSON.parse(e.target.value)})}
              >
                {fonts.map((item: IFonts) =>
                  <MenuItem value={JSON.stringify(item)} key={item.name}>{item.name}</MenuItem>
                )}
              </Select>
            </FormControl>
          </div>
        )}
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