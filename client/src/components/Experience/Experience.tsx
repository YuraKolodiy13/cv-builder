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
import {ICvBuilderState, IExperience, IExperienceItem, ISetCvBuilderState} from '../../interfaces';
import {
  addItems,
  handleElementsState,
  handleItemsState,
  onDragEndElements,
  onDragEndItems,
  removeItem
} from "../../utils";

interface IExperienceProps {
  state: ICvBuilderState;
  setState: ISetCvBuilderState;
  editMode: boolean;
}

const Experience: React.FC<IExperienceProps> = ({state, setState, editMode}) => {

  const {general, experience} = state;

  const handleGeneral = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({...state, general: {...general, [e.target.name]: e.target.value}})
  }

  const initialItem = {
    position: 'Your Designation (E.g. Software Engineer)',
    company: 'Company Name',
    description: 'Express your skills and experience you\'ve acquired from this job.',
    year: 'Year'
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


      <DragDropContext onDragEnd={((result: DropResult) => onDragEndElements(result, setState, state, 'experience'))}>
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
                          onChange={(e) => handleElementsState(e, i, setState, state, 'experience')}
                          placeholder='Enter value'
                          readOnly={!editMode}
                        />
                      </h2>
                      <DragDropContext onDragEnd={(result: DropResult) => onDragEndItems(result, i, setState, state, 'experience')}>
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
                                        {item.items.length > 1 && (
                                          <div className="reorder">
                                            <img src={reorderImg} alt=""/>
                                          </div>
                                        )}
                                        <input
                                          type="text"
                                          value={el.position}
                                          onChange={(e) => handleItemsState(e, i, j, 'position', setState, state, 'experience')}
                                          placeholder='Enter value'
                                          readOnly={!editMode}
                                        />
                                      </h3>
                                      <p>
                                        <input
                                          type="text"
                                          value={el.company}
                                          onChange={(e) => handleItemsState(e, i, j, 'company', setState, state, 'experience')}
                                          placeholder='Enter value'
                                        />
                                      </p>
                                      <p>
                                        <input
                                          type="text"
                                          value={el.description}
                                          onChange={(e) => handleItemsState(e, i, j, 'description', setState, state, 'experience')}
                                          placeholder='Enter value'
                                          readOnly={!editMode}
                                        />
                                      </p>
                                      <div className="remove" onClick={() => removeItem(i, el.id, setState, state, 'experience')}>
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
                      <div className="addMore" onClick={() => addItems(i, setState, state, 'experience', initialItem)}>
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