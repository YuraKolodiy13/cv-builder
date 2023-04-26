import React, {useState} from 'react';
import './Info.scss';
import deleteImg from '../../assets/icons/delete.svg';
import reorderImg from '../../assets/icons/reorder.svg';
import {
  DragDropContext,
  Draggable,
  DraggableProvided, DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
  DropResult
} from "react-beautiful-dnd";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import {Rating} from "@mui/material";
import {ICvBuilderState, IInfo, IInfoItem, ISetCvBuilderState} from '../../interfaces';
import {
  addItems,
  handleElementsState,
  handleItemsState,
  onDragEndElements,
  onDragEndItems,
  removeItem
} from "../../utils";

const actions = [
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Preview' },
  { icon: <ShareIcon />, name: 'Share' },
];

const initialItem = {
  title: 'Info',
  details: 'Details'
}

interface IInfoProps {
  state: ICvBuilderState;
  setState:  ISetCvBuilderState;
  editMode: boolean;
}

const Info: React.FC<IInfoProps> = ({state, setState, editMode}) => {

  const {info, avatar} = state;
  const [open, setOpen] = useState<boolean>(false);
  const [color, setColor] = useState<string>('#8a2be2');

  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if(e.target && e.target.result){
          setState({...state, avatar: e.target.result});
        }
      };
      reader.readAsDataURL(input.files[0]);
    }
  };


  return (
    <div className="info" style={{backgroundColor: color}}>
      <SpeedDial
        ariaLabel="SpeedDial"
        icon={<SpeedDialIcon />}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        direction='down'
        style={{position: 'absolute', top: 16, left: -100}}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => setOpen(false)}
            title=''
          />
        ))}
      </SpeedDial>
      <input type="color" value={color} onChange={e => setColor(e.target.value)} readOnly={!editMode}/>
      <div className="info__avatar" style={{backgroundImage: `url(${avatar})`}}>
        <label>
          <input
            type="file"
            name='file'
            accept="image/*"
            onChange={handleFileChange}
            readOnly={!editMode}
          />
        </label>
      </div>
      <DragDropContext onDragEnd={((result: DropResult) => onDragEndElements(result, setState, state, 'info'))}>
        <Droppable droppableId="info">
          {(provided: DroppableProvided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className='elements'
            >
              {info.map((item: IInfo, i: number) =>
                <Draggable
                  draggableId={item.id.toString()}
                  index={i}
                  key={item.id}
                >
                  {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className={`element ${snapshot.isDragging ? 'active' : ''}`}
                    >
                      <h2>
                        <div className="reorder">
                          <img src={reorderImg} alt=""/>
                        </div>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => handleElementsState(e, i, setState, state, 'info')}
                          placeholder='Enter value'
                          readOnly={!editMode}
                        />
                      </h2>
                      <DragDropContext onDragEnd={(result: DropResult) => onDragEndItems(result, i, setState, state, 'info')}>
                        <Droppable droppableId={item.title}>
                          {(provided: DroppableProvided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                            >
                              {item.items.map((el: IInfoItem, j: number) =>
                                <Draggable
                                  draggableId={el.id.toString()}
                                  index={j}
                                  key={el.id}
                                >
                                  {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                                    <div
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      key={el.id}
                                      ref={provided.innerRef}
                                      className={`item ${snapshot.isDragging ? 'active' : ''}`}
                                    >
                                      <h3>
                                        <div className="reorder">
                                          <img src={reorderImg} alt=""/>
                                        </div>
                                        <input
                                          type="text"
                                          value={el.title}
                                          onChange={(e) => handleItemsState(e, i, j, 'title', setState, state, 'info')}
                                          placeholder='Enter value'
                                          readOnly={!editMode}
                                        />
                                      </h3>
                                      <p>
                                        {item.fieldType === 'rating'
                                          ? <Rating
                                              value={+el.details}
                                              onChange={(e) => handleItemsState(e, i, j, 'details', setState, state, 'info')}
                                            />
                                          : <input
                                              type="text"
                                              value={el.details}
                                              onChange={(e) => handleItemsState(e, i, j, 'details', setState, state, 'info')}
                                              placeholder='Enter value'
                                              readOnly={!editMode}
                                            />
                                        }

                                      </p>
                                      <div className="remove" onClick={() => removeItem(i, el.id, setState, state, 'info')}>
                                        <img src={deleteImg} alt=""/>
                                      </div>
                                    </div>
                                    )}
                                </Draggable>
                              )}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </DragDropContext>
                      <div className="addMore" onClick={() => addItems(i, setState, state, 'info', initialItem)}>
                        <span>Add more {item.title} +</span>
                      </div>
                    </div>
                  )}
                </Draggable>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Info;