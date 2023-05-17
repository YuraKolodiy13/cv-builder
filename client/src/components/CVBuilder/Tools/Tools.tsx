import React, {RefObject} from 'react';
import {Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch} from "@mui/material";
import {ICvBuilderState, IFonts, ISetCvBuilderState} from "../../../interfaces";
import './Tools.scss';
import {jsPDF} from "jspdf";
import {useLazyGetFontQuery} from '../../../store/common/common.api';

const fonts = [
  {name: 'Poppins', src: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap'},
  {name: 'Fira Sans', src: 'https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;700&display=swap'},
  {name: 'Roboto Condensed', src: 'https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap'},
  {name: 'Nunito', src: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap'},
];

interface IToolsProps {
  pdfRef: RefObject<HTMLDivElement>;
  setSavingToPdf: (b: boolean) => void;
  state: ICvBuilderState;
  setState:  ISetCvBuilderState;
  editMode:  boolean;
}

const Tools: React.FC<IToolsProps> = ({pdfRef, setSavingToPdf, state, setState, editMode}) => {

  const [getFont] = useLazyGetFontQuery();
  const {options: {font, showAvatar, changeColumnsOrder}} = state;

  const generatePDF = async () => {
    setSavingToPdf(true);
    const pdf = new jsPDF({orientation: 'p', format: 'letter'});

    const res = await getFont(font.name);

    pdf.addFileToVFS(`${font.name}-Regular-normal.ttf`, res.data.value[0]);
    pdf.addFileToVFS(`${font.name}-Bold.ttf`, res.data.value[1]);
    pdf.addFont(`${font.name}-Regular-normal.ttf`, font.name, "normal");
    pdf.addFont(`${font.name}-Bold.ttf`, font.name, "bold");
    pdf.setFont(font.name);


    pdf.html((pdfRef.current!), {
      callback: () => {
        // console.log(pdfRef.current, 'pdfRef.current')
        pdf.save("print.pdf");
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


  return (
    <div className="tools">
      <Button variant="contained" onClick={generatePDF}>Export PDF</Button>
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
    </div>
  );
};

export default Tools;