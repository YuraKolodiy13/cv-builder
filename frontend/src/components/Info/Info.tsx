import React, {useState} from 'react';
import './Info.scss';
import defaultImg from '../../assets/no-avatar.jpg';
import deleteImg from '../../assets/delete.svg';
import reorderImg from '../../assets/reorder.svg';
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
import {useAppSelector} from "../../hooks/redux";
import {useActions} from "../../hooks/actions";

const actions = [
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Preview' },
  { icon: <ShareIcon />, name: 'Share' },
];

interface IAvatar {
  file: object | FileList;
  previewFile: string | ArrayBuffer;
}

interface IItem {
  id: number;
  title: string;
  details: string | number;
}

interface IElement {
  id: number;
  type: number;
  title: string;
  items: IItem[]
}


const initialItem = {
  title: 'Info',
  details: 'Details'
}

const Info: React.FC = () => {

  const {changeInfo} = useActions();
  const [open, setOpen] = useState<boolean>(false);
  const [color, setColor] = useState<string>('#8a2be2');
  const [avatar, setAvatar] = useState<IAvatar>({
    file: {},
    previewFile: defaultImg,
  })

  const state = useAppSelector(state => state.cv.info);

  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    if (input.files && input.files[0]) {
      setAvatar({...avatar, file: input.files[0]})
      const reader = new FileReader();
      reader.onload = (e) => {
        if(e.target && e.target.result){
          setAvatar({...avatar, previewFile: e.target.result});
        }
      };
      reader.readAsDataURL(input.files[0]);
    }else {
      setAvatar({...avatar, file: {}});
    }
  };

  const handleElementsState = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const newItems = {...state[i]};
    newItems.title = e.target.value;
    const newState = [...state.slice(0, i), newItems, ...state.slice(i + 1)];
    changeInfo(newState);
  }

  const handleItemsState = (e: React.ChangeEvent<HTMLInputElement>, i: number, j: number, name: keyof Omit<IItem, 'id'>) => {
    const newItems = JSON.parse(JSON.stringify(state[i]));
    newItems.items[j][name] = e.target.value;
    const newState = [...state.slice(0, i), newItems, ...state.slice(i + 1)];
    changeInfo(newState);
  }

  const addItems = (i: number) => {
    const newItems = JSON.parse(JSON.stringify(state[i]));
    newItems.items = [...newItems.items, {id: newItems.items.length + 1, ...initialItem}]
    const newState = [...state.slice(0, i), newItems, ...state.slice(i + 1)]
    changeInfo(newState);
  }


  const removeItem = (i: number, id: number) => {
    const newItems = JSON.parse(JSON.stringify(state[i]));
    newItems.items = newItems.items.filter(item => item.id !== id);
    const newState = [...state.slice(0, i), newItems, ...state.slice(i + 1)]
    changeInfo(newState);
  }

  const onDragEndElements = (result: DropResult) => {
    const {source, destination} = result;
    const copiedItems = [...state];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination!.index, 0, removed);
    changeInfo(copiedItems);
  }


  const onDragEndItems = (result: DropResult, i: number) => {
    const {source, destination} = result;
    if(destination){
      const newItems = {...state[i]};
      const copiedItems = [...newItems.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      newItems.items = copiedItems;
      const newState = [...state.slice(0, i), newItems, ...state.slice(i + 1)];
      changeInfo(newState);
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
      <input type="color" value={color} onChange={e => setColor(e.target.value)} />
      <div className="info__avatar" style={{backgroundImage: `url(${avatar.previewFile})`}}>
        <label>
          <input
            type="file"
            name='file'
            accept="image/*"
            onChange={handleFileChange}
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
              {state.map((item: IElement, i: number) =>
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
                        />
                      </h2>
                      <DragDropContext onDragEnd={(result) => onDragEndItems(result, i)}>
                        <Droppable droppableId={item.title}>
                          {(provided: DroppableProvided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                            >
                              {item.items.map((el: IItem, j: number) =>
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
                                        />
                                      </h3>
                                      <p>
                                        {item.type === 2
                                          ? <Rating
                                              value={el.details}
                                              onChange={(e) => handleItemsState(e, i, j, 'details')}
                                            />
                                          : <input
                                              type="text"
                                              value={el.details}
                                              onChange={(e) => handleItemsState(e, i, j, 'details')}
                                              placeholder='Enter value'
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