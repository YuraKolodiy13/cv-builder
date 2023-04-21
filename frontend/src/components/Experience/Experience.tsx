import React from 'react';
import './Experience.scss';
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided, DropResult
} from "react-beautiful-dnd";
import reorderImg from "../../assets/icons/reorder.svg";
import deleteImg from "../../assets/icons/delete.svg";
import {ICvBuilderState, IExperience, IExperienceItem, IGeneral, IInfo} from '../../interfaces';

interface IExperienceProps {
  state: ICvBuilderState;
  setState: (p: { cvName: string; general: IGeneral; avatar: string | ArrayBuffer; experience: IExperience[]; info: IInfo[] }) => void;
  editMode: boolean;
}

const Experience: React.FC<IExperienceProps> = ({state, setState, editMode}) => {

  const {general, experience} = state;

  const handleGeneral = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({...state, general: {...general, [e.target.name]: e.target.value}})
  }

  const handleElementsState = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const newItems = {...experience[i]};
    newItems.title = e.target.value;
    const newState = [...experience.slice(0, i), newItems, ...experience.slice(i + 1)]
    setState({...state, experience: newState});
  }

  const handleItemsState = (e: React.ChangeEvent<HTMLInputElement>, i: number, j: number, name: keyof Omit<IExperienceItem, 'id'>) => {
    const newItems = {...experience[i]};
    newItems.items[j][name] = e.target.value;
    const newState = [...experience.slice(0, i), newItems, ...experience.slice(i + 1)]
    setState({...state, experience: newState})
  }

  const initialItem = {
    position: 'Your Designation (E.g. Software Engineer)',
    company: 'Company Name',
    description: 'Express your skills and experience you\'ve acquired from this job.',
    year: 'Year'
  }

  const addItems = (i: number) => {
    const newItems = {...experience[i]};
    newItems.items = [...newItems.items, {id: newItems.items.length + 1, ...initialItem}];
    const newState = [...experience.slice(0, i), newItems, ...experience.slice(i + 1)];
    setState({...state, experience: newState})
  }


  const removeItem = (i: number, id: number) => {
    const newItems = {...experience[i]};
    newItems.items = newItems.items.filter(item => item.id !== id);
    const newState = [...experience.slice(0, i), newItems, ...experience.slice(i + 1)]
    setState({...state, experience: newState})
  }

  const addSection = () => {

  }

  const onDragEndElements = (result: DropResult) => {
    const {source, destination} = result;
    const copiedItems = [...experience];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination!.index, 0, removed);
    setState({...state, experience: copiedItems})
  }


  const onDragEndItems = (result: DropResult, i: number) => {
    const {source, destination} = result;
    if(destination){
      const newItems = {...experience[i]};
      const copiedItems = [...newItems.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      newItems.items = copiedItems;
      const newState = [...experience.slice(0, i), newItems, ...experience.slice(i + 1)]
      setState({...state, experience: newState})
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
            readOnly={!editMode}
          />
        </h1>
        <h6>
          <input
            type="text"
            name='profession'
            value={general.profession}
            onChange={handleGeneral}
            placeholder='Your profession'
            readOnly={!editMode}
          />
        </h6>
        <p>
          <input
            type="text"
            name='summary'
            value={general.summary}
            onChange={handleGeneral}
            placeholder='Summary of Yourself'
            readOnly={!editMode}
          />
        </p>
      </div>


      <DragDropContext onDragEnd={onDragEndElements}>
        <Droppable droppableId="experience">
          {(provided: DroppableProvided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className='elements'
            >
              {experience.map((item: IExperience, i: number) =>
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
                                      className={`item ${snapshot.isDragging ? 'active' : ''}`}
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
                                          readOnly={!editMode}
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
                                          readOnly={!editMode}
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