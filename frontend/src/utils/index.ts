import React from "react";
import {ICvBuilderState, IExperienceItem, IInfoItem, ISetCvBuilderState} from "../interfaces";
import {DropResult} from "react-beautiful-dnd";

export const handleElementsState = (e: React.ChangeEvent<HTMLInputElement>, i: number, setState: ISetCvBuilderState, state: ICvBuilderState, field: 'info' | 'experience') => {
  const newItems = {...state[field][i]};
  newItems.title = e.target.value;
  const newState = [...state[field].slice(0, i), newItems, ...state[field].slice(i + 1)];
  setState({...state, [field]: newState});
}

export const handleItemsState = (e: React.ChangeEvent<HTMLInputElement> | React.SyntheticEvent<Element, Event>, i: number, j: number, name: keyof Omit<IInfoItem, 'id'> | keyof Omit<IExperienceItem, 'id'>, setState: ISetCvBuilderState, state: ICvBuilderState, field: 'info' | 'experience') => {
  const newItems = JSON.parse(JSON.stringify(state[field][i]));
  newItems.items[j][name] = (e.target as HTMLInputElement).value;
  const newState = [...state[field].slice(0, i), newItems, ...state[field].slice(i + 1)];
  setState({...state, [field]: newState});
}

export const addItems = (i: number, setState: ISetCvBuilderState, state: ICvBuilderState, field: 'info' | 'experience', initialItem: any) => {
  const newItems = {...state[field][i]};
  newItems.items = [...newItems.items, {id: newItems.items.length + 1, ...initialItem}]
  const newState = [...state[field].slice(0, i), newItems, ...state[field].slice(i + 1)]
  setState({...state, [field]: newState});
}


export const removeItem = (i: number, id: number, setState: ISetCvBuilderState, state: ICvBuilderState, field: 'info' | 'experience') => {
  const newItems = JSON.parse(JSON.stringify(state[field][i]));
  newItems.items = newItems.items.filter((item: IInfoItem | IExperienceItem) => item.id !== id);
  const newState = [...state[field].slice(0, i), newItems, ...state[field].slice(i + 1)]
  setState({...state, [field]: newState});
}

export const onDragEndElements = (result: DropResult, setState: ISetCvBuilderState, state: ICvBuilderState, field: 'info' | 'experience') => {
  const {source, destination} = result;
  const copiedItems = [...state[field]];
  const [removed] = copiedItems.splice(source.index, 1);
  copiedItems.splice(destination!.index, 0, removed);
  setState({...state, [field]: copiedItems});
}

export const onDragEndItems = (result: DropResult, i: number, setState: ISetCvBuilderState, state: ICvBuilderState, field: 'info' | 'experience') => {
  const {source, destination} = result;
  if(destination){
    const newItems = JSON.parse(JSON.stringify(state[field][i]));
    const copiedItems = [...newItems.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    newItems.items = copiedItems;
    const newState = [...state[field].slice(0, i), newItems, ...state[field].slice(i + 1)];
    setState({...state, [field]: newState});
  }
}