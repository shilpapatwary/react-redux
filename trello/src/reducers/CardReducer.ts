import { BoardState, TrelloActionTypes } from "../types";
import { AnyAction } from 'redux';

export function addCardReducer(currentState: BoardState , action: AnyAction) {
    if(currentState.selectedBoard && currentState.boards) {
         const oldCardList = currentState.selectedBoard.lists.filter(i => i.id ===action.payload.listId)[0].cards || [];
         const newCard = Object.assign({}, action.payload.card, {index: oldCardList.length + 1} );
         const newCardList = [...oldCardList, newCard];
         const newLists = currentState.selectedBoard.lists.map(l => l.id === action.payload.listId ? {...l, cards: newCardList} : l);
         const boardId = currentState.selectedBoard.id;
 
         const newBoards = currentState.boards.map(i => i.id === boardId ? {...currentState.selectedBoard, lists: newLists} : i);
         const newCurrentBoard = {...currentState.selectedBoard, lists: newLists};
         return Object.assign({}, currentState, {boards: newBoards, selectedBoard: newCurrentBoard, error:''});
     }else{
         return currentState;
     }
 }
 
 export function editCardReducer(currentState: BoardState , action: AnyAction) {
     if(currentState.selectedBoard && currentState.boards) {
         const oldCardList = currentState.selectedBoard.lists.filter(i => i.id ===action.payload.listId)[0].cards || [];
         const newCardList = oldCardList.map(c => c.id === action.payload.cardId ? {...c, name: action.payload.name} : c);
         const newLists = currentState.selectedBoard.lists.map(l => l.id === action.payload.listId ? {...l, cards: newCardList} : l);
         const boardId = currentState.selectedBoard.id;
 
         const newBoards = currentState.boards.map(i => i.id === boardId ? {...currentState.selectedBoard, lists: newLists} : i);
         const newCurrentBoard = {...currentState.selectedBoard, lists: newLists};
         return Object.assign({}, currentState, {boards: newBoards, selectedBoard: newCurrentBoard, error:''});
     }else {
         return currentState;
     }
     
 }
 
 export function moveCardReducer(currentState: BoardState , action: AnyAction) {
     if(currentState.selectedBoard && currentState.boards) {
         const oldCardList = currentState.selectedBoard.lists.filter(i => i.id ===action.payload.listId)[0].cards || [];
         const currentCard = oldCardList.filter(c => c.id === action.payload.cardId)[0];
         const otherCards = oldCardList.filter(i => i.id !== action.payload.cardId);
 
         const leftCards = otherCards.slice(0, action.payload.index);
         const rightCards = otherCards.slice(action.payload.index);
         const newCards = [...leftCards, currentCard, ...rightCards];
         const newCardsWithUpdatedIndex = newCards.map((c, i) => {return {...c, index: i + 1}});
 
         const newLists = currentState.selectedBoard.lists.map(l => l.id === action.payload.listId ? {...l, cards: newCardsWithUpdatedIndex} : l);
         const boardId = currentState.selectedBoard.id;
 
         const newBoards = currentState.boards.map(i => i.id === boardId ? {...currentState.selectedBoard, lists: newLists} : i);
         const newCurrentBoard = {...currentState.selectedBoard, lists: newLists};
         return Object.assign({}, currentState, {boards: newBoards, selectedBoard: newCurrentBoard, error:''});
     }else {
         return currentState;
     }
 }