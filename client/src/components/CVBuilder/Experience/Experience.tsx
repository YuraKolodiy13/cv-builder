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
import {ReactComponent as DeleteIcon} from "../../../assets/icons/delete.svg";
import {ICvBuilderState, IExperience, IExperienceItem, ISetCvBuilderState} from '../../../interfaces';
import {
  addItems,
  handleItemsState,
  onDragEndElements,
  onDragEndItems,
  removeItem
} from "../../../utils";
import {Button, TextareaAutosize} from "@mui/material";
import clsx from "clsx";
import BlockTitle from "../ui/BlockTitle";
import ItemTitle from "../ui/ItemTitle";

interface IExperienceProps {
  state: ICvBuilderState;
  setState: ISetCvBuilderState;
  editMode: boolean;
  className: string;
}

const Experience: React.FC<IExperienceProps> = ({state, setState, editMode, className}) => {

  const {general, experience} = state;

  const handleGeneral = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState({...state, general: {...general, [e.target.name]: e.target.value}})
  }

  const initialItem = {
    position: 'Your Designation (E.g. Software Engineer)',
    company: 'Company Name',
    description: "Express your skills and experience you've acquired from this job.",
    year: 'Year'
  }


  return (
    <div className={clsx("experience", className)}>
      <div className="experience__header">
        <h1>
          {editMode
            ? <input
                type="text"
                name='name'
                value={general.name}
                onChange={handleGeneral}
                placeholder='Your name'
              />
            : general.name
          }
        </h1>
        <h6>
          {editMode
            ? <input
                type="text"
                name='profession'
                value={general.profession}
                onChange={handleGeneral}
                placeholder='Your profession'
              />
            : general.profession
          }
        </h6>
        <p>
          <TextareaAutosize
            value={general.summary}
            name='summary'
            minRows={1}
            placeholder='Summary of Yourself'
            readOnly={!editMode}
            onChange={handleGeneral}
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
                        field='experience'
                        i={i}
                        setState={setState}
                        state={state}
                      />
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
                                  isDragDisabled={!editMode}
                                >
                                  {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                                    <div
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      key={el.id}
                                      ref={provided.innerRef}
                                      className={`item ${snapshot.isDragging ? 'active' : ''}`}
                                    >
                                      <div className='d-flex' style={{position: 'relative', paddingRight: '32px'}}>
                                        <ItemTitle
                                          state={state}
                                          setState={setState}
                                          i={i}
                                          j={j}
                                          editMode={editMode}
                                          title={el.position}
                                          name='position'
                                          length={item.items.length}
                                          field='experience'
                                        />
                                        <input
                                          type="text"
                                          placeholder='Year'
                                          style={{width: '150px', textAlign: 'right'}}
                                        />
                                      </div>
                                      <p>
                                        {editMode
                                          ? <input
                                              type="text"
                                              value={el.company}
                                              onChange={(e) => handleItemsState(e, i, j, 'company', setState, state, 'experience')}
                                              placeholder='Enter value'
                                            />
                                          : el.company
                                        }
                                      </p>
                                      <p>
                                        <TextareaAutosize
                                          value={el.description}
                                          minRows={1}
                                          placeholder='Enter value'
                                          readOnly={!editMode}
                                          onChange={(e) => handleItemsState(e, i, j, 'description', setState, state, 'experience')}
                                        />
                                      </p>
                                      {editMode && (
                                        <div className="remove" onClick={() => removeItem(i, el.id, setState, state, 'experience')}>
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
                        <Button className="addMore" variant='outlined' onClick={() => addItems(i, setState, state, 'experience', initialItem)}>
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

export default Experience;