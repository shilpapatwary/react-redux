import { action } from 'typesafe-actions';
import { TrelloActionTypes, BoardData, CardData, ListData } from './types';

export const addBoardAction = ( board : BoardData) => action(TrelloActionTypes.CREATE_BOARD, {board});
export const editBoardAction = (name: string, id:String) => action(TrelloActionTypes.EDIT_BOARD, {name, id});
export const deleteBoardAction = (boardId: String) => action(TrelloActionTypes.DELETE_BOARD, {boardId});

export const editListAction = (listId: String, listName: String) => action(TrelloActionTypes.EDIT_LIST, {listId, listName});
export const addListAction = (list: ListData) => action(TrelloActionTypes.ADD_LIST, {list});
export const moveListAction = (listId: string, index:number) => action(TrelloActionTypes.MOVE_LIST, {listId, index});

export const editCardAction = (listId: String, cardId:String, name: String) => action(TrelloActionTypes.EDIT_CARD, {listId, cardId, name});
export const addCardAction = (listId: string, card:CardData) => action(TrelloActionTypes.ADD_CARD, {listId, card});
export const moveCardAction = (listId: string, cardId:string, index:number) => action(TrelloActionTypes.MOVE_CARD, {listId, cardId, index});

export const setBoardAction = (board: BoardData) => action(TrelloActionTypes.SET_BOARD, {board});
export const setCurrentViewAction = (showBoards: boolean, showLists: boolean) => action(TrelloActionTypes.SET_CURRENT_VIEW, {showBoards, showLists});