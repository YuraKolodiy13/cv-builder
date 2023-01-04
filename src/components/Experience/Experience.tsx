import React, {useState} from 'react';
import './Experience.scss';
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided, DropResult
} from "react-beautiful-dnd";
import reorderImg from "../../assets/reorder.svg";
import {Rating} from "@mui/material";
import deleteImg from "../../assets/delete.svg";

interface IGeneral {
  name: string,
  profession: string,
  summary: string,
}
interface IExperienceItem {
  id: number,
  position: string,
  company: string,
  description: string,
  year: string,
}
interface IExperience {
  id: number,
  title: string,
  items: IExperienceItem[]
}

const Experience: React.FC = () => {

  const [general, setGeneral] = useState<IGeneral>({
    name: 'Your name',
    profession: 'Your profession',
    summary: 'Summary of Yourself'
  });

  const [state, setState] = useState<IExperience[]>([
    {
      id: 1,
      title: 'Work Experience',
      items: [
        {
          id: 1,
          position: 'Your Designation (E.g. Software Engineer)',
          company: 'Company Name',
          description: 'Express your skills and experience you\'ve acquired from this job.',
          year: 'Year'
        }
      ]
    },
    {
      id: 2,
      title: 'Education',
      items: [
        {
          id: 1,
          position: 'Field of Study (E.g. Bachelor of IT)',
          company: 'School or Institution',
          description: 'Description',
          year: 'Year'
        }
      ]
    }
  ])

  const handleGeneral = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGeneral({...general, [e.target.name]: e.target.value})
  }









  const handleElementsState = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const newItems = {...state[i]};
    newItems.title = e.target.value;
    const newState = [...state.slice(0, i), newItems, ...state.slice(i + 1)]
    setState(newState)
  }

  const handleItemsState = (e: React.ChangeEvent<HTMLInputElement>, i: number, j: number, name: keyof Omit<IExperienceItem, 'id'>) => {
    const newItems = {...state[i]};
    newItems.items[j][name] = e.target.value;
    const newState = [...state.slice(0, i), newItems, ...state.slice(i + 1)]
    setState(newState)
  }

  const initialItem = {
    position: 'Your Designation (E.g. Software Engineer)',
    company: 'Company Name',
    description: 'Express your skills and experience you\'ve acquired from this job.',
    year: 'Year'
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
    <div className='experience'>
      <div className="experience__header">
        <h1>
          <input
            type="text"
            name='name'
            value={general.name}
            onChange={handleGeneral}
            placeholder='Your name'
          />
        </h1>
        <h6>
          <input
            type="text"
            name='profession'
            value={general.profession}
            onChange={handleGeneral}
            placeholder='Your profession'
          />
        </h6>
        <p>
          <input
            type="text"
            name='summary'
            value={general.summary}
            onChange={handleGeneral}
            placeholder='Summary of Yourself'
          />
        </p>
      </div>


      <DragDropContext onDragEnd={onDragEndElements}>
        <Droppable droppableId="info">
          {(provided: DroppableProvided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className='experience__block'
            >
              {state.map((item: IExperience, i: number) =>
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
                              {item.items.map((el: IExperienceItem, j: number) =>
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
                                          value={el.position}
                                          onChange={(e) => handleItemsState(e, i, j, 'position')}
                                          placeholder='Enter value'
                                        />
                                      </h3>
                                      <p>
                                        <input
                                          type="text"
                                          value={el.company}
                                          onChange={(e) => handleItemsState(e, i, j, 'company')}
                                          placeholder='Enter value'
                                        />
                                      </p>
                                      <p>
                                        <input
                                          type="text"
                                          value={el.description}
                                          onChange={(e) => handleItemsState(e, i, j, 'description')}
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

export default Experience;