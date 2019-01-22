import { action } from 'typesafe-actions';
import { TodoActionTypes } from './types';

export const addItemAction = ( item : {}) => action(TodoActionTypes.ADD_ITEM, item);
export const editItemAction = (id: string, name:String) => action(TodoActionTypes.EDIT_ITEM, {id, name});
export const deleteItemAction = (id: String) => action(TodoActionTypes.DELETE_ITEM, {id});
export const markItemAsComplete = (id: String) => action(TodoActionTypes.MARK_ITEM_AS_COMPLETE, {id});
export const markItemAsInComplete = (id: String) => action(TodoActionTypes.MARK_ITEM_AS_INCOMPLETE, {id});
export const moveItemAction = (id: String, index: number) => action(TodoActionTypes.MOVE_ITEM, {id, index});