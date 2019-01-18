import React, { Component } from 'react';
import Lists from './Lists';
import {BoardData, ListData, BoardState, CardData} from '../store/TrelloApp/types';
import {addCardAction, addListAction, moveCardAction, moveListAction, editCardAction, editListAction, setCurrentViewAction} from '../store/TrelloApp/actions';
import { connect } from 'react-redux';
import {Dispatch} from 'redux';

interface ListContainerProps{
    board?: BoardData,
    showBoards: any,
    addCardToList: any,
    onAddList: any,
    onlistNameEdited: any,
    editCardName: any,
    moveCard: any,
    moveList: any
}

export class ListContainer  extends Component<ListContainerProps, any> {
    constructor(props: ListContainerProps) {
        super(props);
    }

    render() {
      return this.props.board ? (
        <section id='Lists'>
            <section className="breadcrumb">
                <span id="linkBoards" onClick={this.props.showBoards}>Back to boards</span>
            </section>
            <section id={this.props.board.id} className="listSection">
                <Lists lists={this.props.board.lists} addCardToList={this.props.addCardToList} moveList={this.props.moveList} addListToBoard={this.props.onAddList} editListName={this.props.onlistNameEdited} editCardName={this.props.editCardName} moveCard={this.props.moveCard}></Lists> 
            </section>
    </section>
      ) : <div>Loading...</div>;
    }
  }
  
  const mapStateToProps = (state: BoardState) => {
    return {
        board: state.selectedBoard
    }
  }
  const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addCardToList: (listId:string, card: CardData) => {dispatch(addCardAction(listId, card))},
        moveList: (listId: string, index: number) => {dispatch(moveListAction(listId, index))},
        onAddList: (list: ListData) => {dispatch(addListAction(list))},
        onlistNameEdited: (listId: String, listName: String) => {dispatch(editListAction(listId, listName))},
        editCardName: (listId: String, cardId:String, name: String) => {dispatch(editCardAction(listId, cardId, name))},
        moveCard: (listId: string, cardId: string, index: number) => {dispatch(moveCardAction(listId, cardId,index))},
        showBoards: () => {dispatch(setCurrentViewAction(true, false))}
    }
  }
  export default connect (mapStateToProps, mapDispatchToProps) (ListContainer);