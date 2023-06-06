import React from 'react';
import reorderImg from "../../../assets/icons/reorder.svg";
import {handleElementsState} from "../../../utils";
import {ICvBuilderState, ISetCvBuilderState} from "../../../interfaces";

interface IBlockTitleProps {
  title: string;
  state: ICvBuilderState;
  setState:  ISetCvBuilderState;
  editMode: boolean;
  field: 'info' | 'experience';
  i: number;
}


const BlockTitle: React.FC<IBlockTitleProps> = ({editMode, title, i, setState, state, field}) => {
  return (
    <h2>
      {editMode && (
        <div className="reorder">
          <img src={reorderImg} alt=""/>
        </div>
      )}
      {editMode
        ? <input
          type="text"
          value={title}
          onChange={(e) => handleElementsState(e, i, setState, state, field)}
          placeholder='Enter value'
        />
        : title
      }
    </h2>
  );
};

export default BlockTitle;