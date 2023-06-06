import React from 'react';
import reorderImg from "../../../assets/icons/reorder.svg";
import {handleItemsState} from "../../../utils";
import {ICvBuilderState, ISetCvBuilderState} from "../../../interfaces";

interface IBlockTitleProps {
  title: string;
  state: ICvBuilderState;
  setState:  ISetCvBuilderState;
  editMode: boolean;
  name: 'title' | 'details' | 'position';
  field: 'info' | 'experience';
  i: number;
  j: number;
  length: number;
}


const ItemTitle: React.FC<IBlockTitleProps> = (props) => {
  const {editMode, title, i, j, setState, state, name, field, length} = props;
  return (
    <h3>
      {editMode && length > 1 && (
        <div className="reorder">
          <img src={reorderImg} alt=""/>
        </div>
      )}
      {editMode
        ? <input
          type="text"
          value={title}
          onChange={(e) => handleItemsState(e, i, j, name, setState, state, field)}
          placeholder='Enter value'
        />
        : title
      }
    </h3>
  );
};

export default ItemTitle;