import React, {useState} from 'react';
import './Info.scss';
import deleteImg from '../../assets/icons/delete.svg';
import reorderImg from '../../assets/icons/reorder.svg';
import {ReactComponent as StarIcon} from "../../assets/icons/star.svg";
import {ReactComponent as StarFilledIcon} from "../../assets/icons/star-filled.svg";
const star = 'PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2ZhYWYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0yMiA5LjI0bC03LjE5LS42MkwxMiAyIDkuMTkgOC42MyAyIDkuMjRsNS40NiA0LjczTDUuODIgMjEgMTIgMTcuMjcgMTguMTggMjFsLTEuNjMtNy4wM0wyMiA5LjI0ek0xMiAxNS40bC0zLjc2IDIuMjcgMS00LjI4LTMuMzItMi44OCA0LjM4LS4zOEwxMiA2LjFsMS43MSA0LjA0IDQuMzguMzgtMy4zMiAyLjg4IDEgNC4yOEwxMiAxNS40eiIvPgo8L3N2Zz4=';
const starFilled = 'PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2ZhYWYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDE3LjI3TDE4LjE4IDIxbC0xLjY0LTcuMDNMMjIgOS4yNGwtNy4xOS0uNjFMMTIgMiA5LjE5IDguNjMgMiA5LjI0bDUuNDYgNC43M0w1LjgyIDIxeiIgLz4KPC9zdmc+';
import {
  DragDropContext,
  Draggable,
  DraggableProvided, DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
  DropResult
} from "react-beautiful-dnd";
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
import clsx from "clsx";

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
  const [color, setColor] = useState<string>('#030303');

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
                  isDragDisabled={!editMode}
                >
                  {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className={`element ${snapshot.isDragging ? 'active' : ''}`}
                    >
                      <h2>
                        {editMode && (
                          <div className="reorder">
                            <img src={reorderImg} alt=""/>
                          </div>
                        )}
                        {editMode
                          ? <input
                              type="text"
                              value={item.title}
                              onChange={(e) => handleElementsState(e, i, setState, state, 'info')}
                              placeholder='Enter value'
                            />
                          : item.title
                        }
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
                                  isDragDisabled={!editMode}
                                >
                                  {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                                    <div
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      key={el.id}
                                      ref={provided.innerRef}
                                      className={clsx('item', {
                                        active: snapshot.isDragging,
                                        'item--rating': item.fieldType === 'rating'
                                      })}
                                    >
                                      <h3>
                                        {editMode && item.items.length > 1 && (
                                          <div className="reorder">
                                            <img src={reorderImg} alt=""/>
                                          </div>
                                        )}
                                        {editMode
                                          ? <input
                                              type="text"
                                              value={el.title}
                                              onChange={(e) => handleItemsState(e, i, j, 'title', setState, state, 'info')}
                                              placeholder='Enter value'
                                            />
                                          : el.title
                                        }
                                      </h3>
                                      <p>
                                        {item.fieldType === 'rating'
                                          ? editMode
                                            ? <Rating
                                                value={+el.details}
                                                size='small'
                                                onChange={(e) => handleItemsState(e, i, j, 'details', setState, state, 'info')}
                                              />
                                            : <span className='rating__wrapper'>
                                                {[...Array(5).keys()].map((item, i) =>
                                                    // <img src={`data:image/svg+xml;base64, ${i < +el.details ?  starFilled : star}`} alt=""/>
                                                  <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Gold_Star.svg/240px-Gold_Star.svg.png?20140420092753' alt=""/>
                                                )}
                                              </span>
                                          : editMode
                                            ? <input
                                                type="text"
                                                value={el.details}
                                                onChange={(e) => handleItemsState(e, i, j, 'details', setState, state, 'info')}
                                                placeholder='Enter value'
                                              />
                                            : el.details
                                        }
                                      </p>
                                      {editMode && (
                                        <div className="remove" onClick={() => removeItem(i, el.id, setState, state, 'info')}>
                                          <img src={deleteImg} alt=""/>
                                        </div>
                                      )}
                                    </div>
                                    )}
                                </Draggable>
                              )}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </DragDropContext>
                      {editMode && (
                        <div className="addMore" onClick={() => addItems(i, setState, state, 'info', initialItem)}>
                          <span>Add more {item.title} +</span>
                        </div>
                      )}
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