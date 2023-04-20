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
import {ICvBuilderState, IExperience, IGeneral, IInfo, IInfoItem} from '../../interfaces';

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
  setState: (p: { general: IGeneral; avatar: string | ArrayBuffer; experience: IExperience[]; info: IInfo[] }) => void;
  editMode: boolean;
}

const Info: React.FC<IInfoProps> = ({state, setState, editMode}) => {

  const {info, avatar} = state;
  const [open, setOpen] = useState<boolean>(false);
  const [color, setColor] = useState<string>('#8a2be2');

  console.log(avatar, 'avatar')


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

  const handleElementsState = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const newItems = {...info[i]};
    newItems.title = e.target.value;
    const newState = [...info.slice(0, i), newItems, ...info.slice(i + 1)];
    setState({...state, info: newState});
  }

  const handleItemsState = (e: React.ChangeEvent<HTMLInputElement> | React.SyntheticEvent<Element, Event>, i: number, j: number, name: keyof Omit<IInfoItem, 'id'>) => {
    const newItems = JSON.parse(JSON.stringify(info[i]));
    console.log((e.target as HTMLInputElement), 'e.target.value')
    newItems.items[j][name] = (e.target as HTMLInputElement).value;
    const newState = [...info.slice(0, i), newItems, ...info.slice(i + 1)];
    setState({...state, info: newState});
  }

  const addItems = (i: number) => {
    const newItems = {...info[i]};
    newItems.items = [...newItems.items, {id: newItems.items.length + 1, ...initialItem}]
    const newState = [...info.slice(0, i), newItems, ...info.slice(i + 1)]
    setState({...state, info: newState});
  }


  const removeItem = (i: number, id: number) => {
    const newItems = {...info[i]};
    newItems.items = newItems.items.filter((item: IInfoItem) => item.id !== id);
    const newState = [...info.slice(0, i), newItems, ...info.slice(i + 1)]
    setState({...state, info: newState});
  }

  const onDragEndElements = (result: DropResult) => {
    const {source, destination} = result;
    const copiedItems = [...info];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination!.index, 0, removed);
    setState({...state, info: copiedItems});
  }


  const onDragEndItems = (result: DropResult, i: number) => {
    const {source, destination} = result;
    if(destination){
      const newItems = {...info[i]};
      const copiedItems = [...newItems.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      newItems.items = copiedItems;
      const newState = [...info.slice(0, i), newItems, ...info.slice(i + 1)];
      setState({...state, info: newState});
    }
  }


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
      <DragDropContext onDragEnd={onDragEndElements}>
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
                          onChange={(e) => handleElementsState(e, i)}
                          placeholder='Enter value'
                          readOnly={!editMode}
                        />
                      </h2>
                      <DragDropContext onDragEnd={(result) => onDragEndItems(result, i)}>
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
                                          onChange={(e) => handleItemsState(e, i, j, 'title')}
                                          placeholder='Enter value'
                                          readOnly={!editMode}
                                        />
                                      </h3>
                                      <p>
                                        {item.fieldType === 'rating'
                                          ? <Rating
                                              value={+el.details}
                                              onChange={(e) => handleItemsState(e, i, j, 'details')}
                                            />
                                          : <input
                                              type="text"
                                              value={el.details}
                                              onChange={(e) => handleItemsState(e, i, j, 'details')}
                                              placeholder='Enter value'
                                              readOnly={!editMode}
                                            />
                                        }

                                      </p>
                                      <div className="remove" onClick={() => removeItem(i, el.id)}>
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
                      <div className="addMore" onClick={() => addItems(i)}>
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