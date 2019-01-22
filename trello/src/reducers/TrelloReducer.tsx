import { BoardState, TrelloActionTypes } from "../types";
import { AnyAction } from 'redux';
import { Reducer } from 'redux';

import {setBoardReducer, addBoardReducer, removeBoardReducer, editBoardReducer, setCurrentViewReducer} from './BoardReducer';
import {addListReducer, editListReducer, moveListReducer} from './ListReducer';
import {addCardReducer, editCardReducer, moveCardReducer} from './CardReducer';

const initialState: BoardState = {
    boards: undefined,
    selectedBoard: undefined,
    showBoards: undefined,
    showLists: undefined
}

const TodoApplicationReducer: Reducer<BoardState> = (currentState: BoardState = initialState, action: AnyAction) => {
    switch(action.type) {
        case TrelloActionTypes.CREATE_BOARD:
           return addBoardReducer(currentState, action);
        case TrelloActionTypes.DELETE_BOARD:
            return removeBoardReducer(currentState, action);
        case TrelloActionTypes.EDIT_BOARD:
           return editBoardReducer(currentState, action);
        case TrelloActionTypes.ADD_LIST:
            return addListReducer(currentState, action);
        case TrelloActionTypes.EDIT_LIST:
            return editListReducer(currentState, action);
        case TrelloActionTypes.MOVE_LIST:
            return moveListReducer(currentState, action);
        case TrelloActionTypes.ADD_CARD:
            return addCardReducer(currentState, action);
        case TrelloActionTypes.EDIT_CARD:
            return editCardReducer(currentState, action);
        case TrelloActionTypes.MOVE_CARD:
             return moveCardReducer(currentState, action);
        case TrelloActionTypes.SET_BOARD :
            return setBoardReducer(currentState, action);
        case TrelloActionTypes.SET_CURRENT_VIEW :
            return setCurrentViewReducer(currentState, action);
        default:
            return currentState;
        
    }
}


export default TodoApplicationReducer;