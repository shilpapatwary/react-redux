import { ItemState, TodoActionTypes } from "../types";
import { AnyAction } from "redux";

const initialState={
    items: undefined,
    currentItem: undefined
}

const TodoApplicationReducer = (currentState: ItemState = initialState, action: AnyAction) => {
    switch(action.type) {
        case TodoActionTypes.ADD_ITEM:
            return addItemReducer(currentState, action);
        case TodoActionTypes.DELETE_ITEM:
            return removeItemReducer(currentState, action);
        case TodoActionTypes.MARK_ITEM_AS_COMPLETE:
            return markItemAsComplete(currentState, action);
        case TodoActionTypes.MARK_ITEM_AS_INCOMPLETE:
            return markItemAsInComplete(currentState, action);
        case TodoActionTypes.MOVE_ITEM:
            return moveItemReducer(currentState, action);
        case TodoActionTypes.EDIT_ITEM:
            return editItemReducer(currentState, action);
        default:
            return currentState;
        
    }
}

function addItemReducer(currentState: ItemState , action: AnyAction) {
    const oldItems = currentState.items || [];
    const newItem = Object.assign({}, action.payload, {index: oldItems.length+1})
    const newItems = [...oldItems, newItem];
    return Object.assign({}, currentState, {items: newItems, currentItem: newItem});
}

function markItemAsComplete(currentState: ItemState , action: AnyAction) {
    const oldItems = currentState.items || [];
    const oldItem = oldItems.filter(i => i.id === action.payload.id)[0];
    const newItem = Object.assign({}, oldItem, {isComplete: true});
    const newItems = oldItems.map(i => i.id === action.payload.id ? newItem : i);
    return Object.assign({}, currentState, {items: newItems, currentItem: newItem});
}

function removeItemReducer(currentState: ItemState , action: AnyAction) {
    const oldItems = currentState.items || [];
    const newItems = oldItems.filter(i => i.id !== action.payload.id);
    return Object.assign({}, currentState, {items: newItems, currentItem: undefined});
}

function markItemAsInComplete(currentState: ItemState , action: AnyAction) {
    const oldItems = currentState.items || [];
    const oldItem = oldItems.filter(i => i.id === action.payload.id)[0];
    const newItem = Object.assign({}, oldItem, {isComplete: false});
    const newItems = oldItems.map(i => i.id === action.payload.id ? newItem : i);
    return Object.assign({}, currentState, {items: newItems, currentItem: newItem});
}

function editItemReducer(currentState: ItemState , action: AnyAction) {
    const oldItems = currentState.items || [];
    const oldItem = oldItems.filter(i => i.id === action.payload.id)[0];
    const newItem = Object.assign({}, oldItem, {name: action.payload.name});
    const newItems = oldItems.map(i => i.id === action.payload.id ? newItem : i);
    return Object.assign({}, currentState, {items: newItems, currentItem:newItem});
}

function moveItemReducer(currentState: ItemState , action: AnyAction) {
    const oldItems = currentState.items || [];
    const item = oldItems.filter(i => i.id === action.payload.id)[0];
    const otherItems = oldItems.filter(i => i.id !== action.payload.id);
    const leftItems = otherItems.slice(0, action.payload.index);
    const rightItems = otherItems.slice(action.payload.index);
    const newItems = [...leftItems, item, ...rightItems];
    const newItemsWithUpdatedIndex = newItems.map((l, i) => {return {...l, index: i + 1}});
    const newItem = newItemsWithUpdatedIndex.filter(i => i.id === action.payload.id)[0];
    return Object.assign({}, currentState, {items: newItemsWithUpdatedIndex, currentItem: newItem});
}

export default TodoApplicationReducer;