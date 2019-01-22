import { BoardState, TrelloActionTypes } from "../types";
import { AnyAction } from 'redux';

export function addListReducer(currentState: BoardState , action: AnyAction) {
    const oldBoards = currentState.boards || [];
    const oldCurrentBoard = currentState.selectedBoard || {id:"", name:"",lists: []};
    const oldLists = oldCurrentBoard.lists || [];
    const newList = Object.assign({}, action.payload.list, {index: oldLists.length + 1});
    const newLists = [...oldLists, newList];
    
    const newCurrentBoard = Object.assign({}, oldCurrentBoard, {lists: newLists});
    const newBoards = oldBoards.map(i => i.id === oldCurrentBoard.id ? newCurrentBoard : i);
    return Object.assign({}, currentState, {boards: newBoards, selectedBoard: newCurrentBoard, error:''});
}

export function editListReducer(currentState: BoardState , action: AnyAction) {
    if(currentState.selectedBoard && currentState.boards) {
        const boardId = currentState.selectedBoard.id ;
        const oldLists = currentState.selectedBoard.lists;
        const updatedLists = oldLists.map(l => l.id === action.payload.listId ? {...l, name: action.payload.listName} : l);
        
        const newBoards = currentState.boards.map(i => i.id === boardId ? {...currentState.selectedBoard, lists: updatedLists} : i);
        const newCurrentBoard = {...currentState.selectedBoard, lists: updatedLists};
        return Object.assign({}, currentState, {boards: newBoards, selectedBoard: newCurrentBoard, error:''});
    }else {
        return currentState;
    }
}

export function moveListReducer(currentState: BoardState , action: AnyAction) {
    if(currentState.selectedBoard && currentState.boards) {
        const boardId = currentState.selectedBoard.id ;

        const oldLists = currentState.selectedBoard.lists;
        const currentList = oldLists.filter(l => l.id === action.payload.listId)[0];
        const otherLists = oldLists.filter(l => l.id !== action.payload.listId);

        const leftLists = otherLists.slice(0, action.payload.index);
        const rightLists = otherLists.slice(action.payload.index);
        const newLists = [...leftLists, currentList, ...rightLists];
        const newListsWithUpdatedIndex = newLists.map((l, i) => {return {...l, index: i + 1}});
 
        const newBoards = currentState.boards.map(i => i.id === boardId ? {...currentState.selectedBoard, lists: newListsWithUpdatedIndex} : i);
        const newCurrentBoard = {...currentState.selectedBoard, lists: newListsWithUpdatedIndex};
        return Object.assign({}, currentState, {boards: newBoards, selectedBoard: newCurrentBoard, error:''});
    }else {
        return currentState;
    }
}