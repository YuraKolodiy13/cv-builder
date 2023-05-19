import React, {RefObject, useState} from 'react';
import {Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch} from "@mui/material";
import {ICvBuilderState, IFonts, ISetCvBuilderState} from "../../../interfaces";
import './Tools.scss';
import {jsPDF} from "jspdf";
import html2canvas from 'html2canvas';
import {useLazyGetFontQuery} from '../../../store/common/common.api';
import ConfirmModal from "../../modals/ConfirmModal";
import {ReactComponent as SnapshotIcon} from "../../../assets/icons/snapshot.svg";
import {ReactComponent as StandardIcon} from "../../../assets/icons/magic.svg";
import clsx from "clsx";

const fonts = [
  {name: 'Poppins', src: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap'},
  {name: 'Fira Sans', src: 'https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;700&display=swap'},
  {name: 'Roboto Condensed', src: 'https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap'},
  {name: 'Nunito', src: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap'},
];

const choosePdfType = [
  {
    type: 'Snapshot',
    icon: SnapshotIcon,
    info: [
      {title: 'Friendly resume'},
      {title: 'Output does not change'},
      {title: 'Unselectable text', error: true},
    ]
  },
  {
    type: 'Standard',
    icon: StandardIcon,
    info: [
      {title: 'Friendly resume'},
      {title: 'Selectable text'},
      {title: 'Single page', error: true},
    ]
  }
]

interface IToolsProps {
  pdfRef: RefObject<HTMLDivElement>;
  setSavingToPdf: (b: boolean) => void;
  state: ICvBuilderState;
  setState:  ISetCvBuilderState;
  editMode:  boolean;
}

const Tools: React.FC<IToolsProps> = ({pdfRef, setSavingToPdf, state, setState, editMode}) => {

  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [getFont] = useLazyGetFontQuery();
  const {options: {font, showAvatar, changeColumnsOrder}} = state;

  const generatePDF = async () => {
    const pdf = new jsPDF({orientation: 'p', format: 'letter'});

    const res = await getFont(font.name);

    pdf.addFileToVFS(`${font.name}-Regular-normal.ttf`, res.data.value[0]);
    pdf.addFileToVFS(`${font.name}-Bold.ttf`, res.data.value[1]);
    pdf.addFont(`${font.name}-Regular-normal.ttf`, font.name, "normal");
    pdf.addFont(`${font.name}-Bold.ttf`, font.name, "bold");
    pdf.setFont(font.name);


    pdf.html((pdfRef.current!), {
      callback: () => {
        pdf.save("cv.pdf");
        setSavingToPdf(false);
      },
      x: 0,
      y: 0,
      margin: [0, 0, 0, 0], // mm
      width: 216, // 216 = letter paper width in mm, 208 = less the 8mm margin
      windowWidth: 816,  // 816 = letter paper pixel width at 96dpi (web), 786 = less the 30px margin

      // html2canvas: {
      //   logging: false,
      //   windowWidth: 816 // 816 = letter paper pixel width at 96dpi (web), 786 = less the 30px margin
      // }
    });
  }

  const printDocument = () => {
    html2canvas(pdfRef.current!, {scale:4, logging: true, allowTaint: false, useCORS: true}).then(canvas => {
      const data = canvas.toDataURL("image/png");
      const pdf = new jsPDF("portrait", "px", 'letter');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("cv.pdf");
      setSavingToPdf(false);
    });
  };

  const openConfirmModal = () => {
    setIsOpenConfirmModal(true);
    setSavingToPdf(true);
  }

  return (
    <div className="tools">
      <Button variant="contained" onClick={openConfirmModal}>Export PDF</Button>
      <FormControl fullWidth>
        <InputLabel id="select-font">Font</InputLabel>
        <Select
          labelId="select-font"
          value={JSON.stringify(font)}
          label="Font"
          onChange={e => setState({...state, options: {...state.options, font: JSON.parse(e.target.value)}})}
          readOnly={!editMode}
        >
          {fonts.map((item: IFonts) =>
            <MenuItem value={JSON.stringify(item)} key={item.name}>{item.name}</MenuItem>
          )}
        </Select>
      </FormControl>
      <FormControlLabel
        control={(
          <Switch
            color="primary"
            checked={showAvatar}
            onChange={() => setState({...state, options: {...state.options, showAvatar: !showAvatar}})}
          />
        )}
        label="Show avatar"
        labelPlacement="start"
      />
      <FormControlLabel
        control={(
          <Switch
            color="primary"
            checked={changeColumnsOrder}
            onChange={() => setState({...state, options: {...state.options, changeColumnsOrder: !changeColumnsOrder}})}
          />
        )}
        label="Change columns order"
        labelPlacement="start"
      />

      {isOpenConfirmModal && (
        <ConfirmModal
          open={isOpenConfirmModal}
          onBackgroundClick={() => setIsOpenConfirmModal(false)}
          onSubmitClick={generatePDF}
          modalTitle='Choose Your PDF Type'
          className='choosePdfType-modal'
        >
          <ul className='choosePdfType'>
            {choosePdfType.map((item, i) =>
              <li key={i} className='choosePdfType__item'>
                <div className='choosePdfType__img'>
                  <item.icon/>
                  <p>{item.type}</p>
                </div>
                <ul className='choosePdfType__info'>
                  {item.info.map((el, j) =>
                    <li key={j} className={clsx({error: el.error})}>{el.title}</li>
                  )}
                </ul>
              </li>
            )}
          </ul>
        </ConfirmModal>
      )}

    </div>
  );
};

export default Tools;