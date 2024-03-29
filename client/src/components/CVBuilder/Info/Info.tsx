import React, {useState} from 'react';
import './Info.scss';
import {ReactComponent as DeleteIcon} from "../../../assets/icons/delete.svg";
import {
  DragDropContext,
  Draggable,
  DraggableProvided, DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
  DropResult
} from "react-beautiful-dnd";
import {Button, Rating} from "@mui/material";
import {ICvBuilderState, IInfo, IInfoItem, ISetCvBuilderState} from '../../../interfaces';
import {
  addItems,
  handleItemsState,
  onDragEndElements,
  onDragEndItems,
  removeItem
} from "../../../utils";
import clsx from "clsx";
import {storage} from "../../../firebase";
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {v4 as uuidv4} from 'uuid';
import {starsImg} from "../../../constants";
import BlockTitle from "../ui/BlockTitle";
import ItemTitle from '../ui/ItemTitle';

const initialItem = {
  title: 'Info',
  details: 'Details'
}

interface IInfoProps {
  state: ICvBuilderState;
  setState:  ISetCvBuilderState;
  editMode: boolean;
  className: string;
}

const Info: React.FC<IInfoProps> = ({state, setState, editMode, className}) => {

  const {info, avatar, options: {showAvatar}} = state;
  const [avatarBase64, setAvatarBase64] = useState<string>(avatar);

  const uploadFileToStorage = (file: File) => {
    if (!file) return;
    const imageRef = ref(storage, `images/${uuidv4()}-${file.name}`);
    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setState({...state, avatar: url})
      });
    });
  };


  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const file = e.target.files![0];
    uploadFileToStorage(file)
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if(e.target && e.target.result){
          const result = e.target.result as string;
          setAvatarBase64(result);
        }
      };
      reader.readAsDataURL(input.files[0]);
    }
  };


  return (
    <div className={clsx("info", className)}>
      {showAvatar && (
        <div className="info__avatar">
          <img src={editMode ? avatarBase64 : avatar} alt=""/>
          <label>
            <input
              type="file"
              name='file'
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileChange}
              readOnly={!editMode}
            />
          </label>
        </div>
      )}
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
                      <BlockTitle
                        title={item.title}
                        editMode={editMode}
                        field='info'
                        i={i}
                        setState={setState}
                        state={state}
                      />
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
                                        'item__rating': item.fieldType === 'rating'
                                      })}
                                    >
                                      <ItemTitle
                                        state={state}
                                        setState={setState}
                                        i={i}
                                        j={j}
                                        editMode={editMode}
                                        title={el.title}
                                        name='title'
                                        length={item.items.length}
                                        field='info'
                                      />
                                      <p>
                                        {item.fieldType === 'rating'
                                          ? editMode
                                            ? <Rating
                                                value={+el.details}
                                                size='small'
                                                onChange={(e) => handleItemsState(e, i, j, 'details', setState, state, 'info')}
                                              />
                                            : <span className='rating__wrapper'>
                                                <img src={starsImg[+el.details || 0]} alt="" key={i}/>
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
                                          <DeleteIcon/>
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
                        <Button className="addMore" variant='outlined' onClick={() => addItems(i, setState, state, 'info', initialItem)}>
                          Add more {item.title}
                        </Button>
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