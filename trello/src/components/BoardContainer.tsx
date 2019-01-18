import React, { Component } from 'react';
import Board from './Board';
import {BoardData, BoardState} from '../store/TrelloApp/types';
import {editBoardAction, deleteBoardAction, setBoardAction} from '../store/TrelloApp/actions';
import { connect } from 'react-redux';
import {Dispatch} from 'redux';

interface BoardContainerProps{
    boards?: BoardData[],
    setSelectedBoard: any,
    updateBoard: any,
    showSuccess: any,
    removeBoard: any
}

export class BoardContainer  extends Component<BoardContainerProps, any> {
    constructor(props: BoardContainerProps) {
        super(props);
    }
    render() {
      return this.props.boards ? (
        <section id="boards">
            <ul id="boardsContainer">
            {
            this.props.boards.map(board => {
                return <Board board={board} key={board.id} 
                showSuccess={this.props.showSuccess} onBoardSelect={this.props.setSelectedBoard} onBoardUpdate={this.props.updateBoard} removeBoard={this.props.removeBoard}/>
            })
            }  
            </ul>
        </section>
      ) : <h1>Loading....</h1>;
    }
  }

  const mapStateToProps = (state: BoardState) => {
    return {
        boards: state.boards
    }
  }
  const mapDispatchToProps = (dispatch:Dispatch) => {
    return{
        updateBoard:  (id: string, name: string) => {dispatch(editBoardAction(id, name))},
        removeBoard: (boardId: string) => {dispatch(deleteBoardAction(boardId))},
        setSelectedBoard: (board: BoardData) => {dispatch(setBoardAction(board))}
    }
  }
  export default connect (mapStateToProps, mapDispatchToProps) (BoardContainer);