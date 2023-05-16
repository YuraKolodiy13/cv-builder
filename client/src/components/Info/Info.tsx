import React, {useState} from 'react';
import './Info.scss';
import {ReactComponent as DeleteIcon} from "../../assets/icons/delete.svg";
import reorderImg from '../../assets/icons/reorder.svg';
import {
  DragDropContext,
  Draggable,
  DraggableProvided, DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
  DropResult
} from "react-beautiful-dnd";
import {Button, Rating} from "@mui/material";
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
import {storage} from "../../firebase";
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {v4 as uuidv4} from 'uuid';
import {starsImg} from "../../constants";

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

  const {info, avatar, options: {showAvatar}} = state;
  const [avatarBase64, setAvatarBase64] = useState<string>(avatar);

  const uploadFileToStorage = (file: File) => {
    if (!file) return;
    const metadata = {
      contentType: file.type,
      firebaseStorageDownloadTokens: '6950a665-b6c8-4dd7-a5e4-16b883b6fa89'
    }
    const imageRef = ref(storage, `images/${uuidv4()}-${file.name}`);
    uploadBytes(imageRef, file, metadata).then((snapshot) => {
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
    <div className="info">
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