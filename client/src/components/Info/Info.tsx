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
                                          ? <Rating
                                              value={+el.details}
                                              size='small'
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