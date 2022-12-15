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

interface IAvatar {
  file: object | FileList;
  previewFile: string | ArrayBuffer;
}

interface IItem {
  title: string;
  details: string | number;
}

interface IItemWithId extends IItem{
  id: number;
}

interface IElement {
  id: number;
  type: number;
  title: string;
  items: IItemWithId[]
}


const initialItem = {
  title: 'Info',
  details: 'Details'
}

const Info: React.FC = () => {

  const [avatar, setAvatar] = useState<IAvatar>({
    file: {},
    previewFile: defaultImg,
  })

  const [state, setState] = useState<IElement[]>([
    {
      id: 1,
      type: 1,
      title: 'Personal Info',
      items: [
        {
          id: 1,
          title: 'Info 1',
          details: 'Details 1'
        },
        {
          id: 2,
          title: 'Info 2',
          details: 'Details 2'
        }
      ]
    },
    {
      id: 2,
      type: 2,
      title: 'Skills',
      items: [
        {
          id: 1,
          title: 'Skill 1',
          details: 4
        },
        {
          id: 2,
          title: 'Skill 2',
          details: 3
        },
      ]
    }
  ]);

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
    const newState = [...state.slice(0, i), newItems, ...state.slice(i + 1)]
    setState(newState)
  }

  const handleItemsState = (e: React.ChangeEvent<HTMLInputElement>, i: number, j: number, name: keyof IItem) => {
    const newItems = {...state[i]};
    newItems.items[j][name] = e.target.value;
    const newState = [...state.slice(0, i), newItems, ...state.slice(i + 1)]
    setState(newState)
  }

  const addItems = (i: number) => {
    const newItems = {...state[i]};
    newItems.items = [...newItems.items, {id: newItems.items.length + 1, ...initialItem}]
    const newState = [...state.slice(0, i), newItems, ...state.slice(i + 1)]
    setState(newState)
  }


  const removeItem = (i: number, id: number) => {
    const newItems = {...state[i]};
    newItems.items = newItems.items.filter(item => item.id !== id);
    const newState = [...state.slice(0, i), newItems, ...state.slice(i + 1)]
    setState(newState)
  }

  const addSection = () => {

  }

  const onDragEndElements = (result: DropResult) => {
    const {source, destination} = result;
    const copiedItems = [...state];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination!.index, 0, removed);
    setState(copiedItems)
  }


  const onDragEndItems = (result: DropResult, i: number) => {
    const {source, destination} = result;
    if(destination){
      const newItems = {...state[i]};
      const copiedItems = [...newItems.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      newItems.items = copiedItems;
      const newState = [...state.slice(0, i), newItems, ...state.slice(i + 1)]
      setState(newState)
    }
  }


  return (
    <div className="info">
      <p onClick={addSection}>Add section</p>
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
              className='info__elements'
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
                      className={`info__element ${snapshot.isDragging ? 'active' : ''}`}
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
                              {item.items.map((el: IItemWithId, j: number) =>
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
                                      className={`info__item ${snapshot.isDragging ? 'active' : ''}`}
                                    >
                                      <h3>
                                        <div className="reorder">
                                          <img src={reorderImg} alt=""/>
                                        </div>
                                        <input
                                          type="text"
                                          value={el.title}
                                          onChange={(e) => handleItemsState(e, i, j, "title")}
                                          placeholder='Enter value'
                                        />
                                      </h3>
                                      <p>
                                        <input
                                          type="text"
                                          value={el.details}
                                          onChange={(e) => handleItemsState(e, i, j, "details")}
                                          placeholder='Enter value'
                                        />
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