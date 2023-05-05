import React, {useState} from 'react';
import './Info.scss';
import deleteImg from '../../assets/icons/delete.svg';
import reorderImg from '../../assets/icons/reorder.svg';
const star = 'https://firebasestorage.googleapis.com/v0/b/editor-789ee.appspot.com/o/images%2Fstar.png?alt=media&token=7a4b5c8c-740a-42a1-a35b-6cfd7073e019';
const starFilled = 'https://firebasestorage.googleapis.com/v0/b/editor-789ee.appspot.com/o/images%2Fstar-filled.png?alt=media&token=812be657-bbd7-4072-be00-60384353f1c4';
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
import {storage} from "../../firebase";
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';


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
  const [avatarBase64, setAvatarBase64] = useState(avatar);

  const uploadFileToStorage = (file: File) => {
    if (!file) return;
    const imageRef = ref(storage, `images/${file.name}`);
    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url, 'url');
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
          setAvatarBase64(e.target.result);
        }
      };
      reader.readAsDataURL(input.files[0]);
    }
  };


  return (
    <div className="info" style={{backgroundColor: color}}>
      <input type="color" value={color} onChange={e => setColor(e.target.value)} readOnly={!editMode}/>
      <div className="info__avatar" style={{backgroundImage: `url(${editMode ? avatarBase64 : avatar})`}}>
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
                                                  <img src={`${i < +el.details ?  starFilled : star}`} alt="" key={i}/>
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