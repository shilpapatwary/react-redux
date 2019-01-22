import { BoardState, TrelloActionTypes } from "../types";
import { AnyAction } from 'redux';

export function setBoardReducer(currentState: BoardState, action: AnyAction) {
    return Object.assign({}, currentState, {boards: currentState.boards, selectedBoard: action.payload.board, showBoards: false,
        showLists: true, error:''});
}

export function addBoardReducer(currentState: BoardState , action: AnyAction) {
    const oldBoards = currentState.boards || [];
    const newBoard = Object.assign({}, action.payload.board);
    const newBoards = [...oldBoards, newBoard];
    return Object.assign({}, currentState, {boards: newBoards, selectedBoard: newBoard, error:''});
}

export function editBoardReducer(currentState: BoardState , action: AnyAction) {
    if(action.payload.name === '') {
        return Object.assign({}, currentState, {error:'Enter Board Name'});
    }
    const oldBoards = currentState.boards || [];
    const oldBoard = oldBoards.filter(i => i.id === action.payload.id)[0];
    const newBoard = {...oldBoard, name: action.payload.name};
    const newBoards = oldBoards.map(i => i.id === action.payload.id ? newBoard : i);
    return Object.assign({}, currentState, {boards: newBoards, selectedBoard:newBoard, error:''});
}

export function removeBoardReducer(currentState: BoardState , action: AnyAction) {
    const oldBoards = currentState.boards || [];
    const newBoards = oldBoards.filter(i => i.id !== action.payload.boardId);
    return Object.assign({}, currentState, {boards: newBoards, selectedBoard: undefined, error:''});
}

export function setCurrentViewReducer(currentState: BoardState, action: AnyAction) {
    return Object.assign({}, currentState, {boards: currentState.boards, selectedBoard: currentState.selectedBoard, showBoards: action.payload.showBoards,
        showLists: action.payload.showLists, error:''});
}