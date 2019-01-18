import React, { Component } from 'react';
import BoardContainer from './BoardContainer';
import ListContainer from './ListContainer';
import {BoardState, BoardData, CardData, ListData, TrelloActionTypes} from '../store/TrelloApp/types';
import { store } from '..';
import { Provider } from 'react-redux';
interface HomeState{ 
    boards?: BoardData[],
    selectedBoard?: BoardData,
    showBoards?: boolean,
    showLists?: boolean,
    showSuccess: boolean
}

class Home  extends Component<any, HomeState> {
  constructor (props: any) {
    super (props);
    this.state = {
      boards: store.getState().boards,
      selectedBoard: store.getState().selectedBoard,
      showBoards: store.getState().showBoards ,
      showLists: store.getState().showLists ,
      showSuccess: false
    };
    this.createBoard = this.createBoard.bind(this);
    
  }
  
  createBoard() {
    const board = {
     id:Math.random() * 10000000,
     name:"New Board",
      "lists": []
    }
    store.dispatch({type:TrelloActionTypes.CREATE_BOARD, payload: {board}});
  }

  componentDidMount() {
    store.subscribe(() => {
      this.setState({
        boards: store.getState().boards,
        selectedBoard: store.getState().selectedBoard,
        showBoards: store.getState().showBoards ,
        showLists: store.getState().showLists
      })
    })
  }

    render() {
      return (
        <Provider store={store}>
          <header>
            <section><h2>Trello</h2></section>
            <section className="addboard"><span className="info">Create a Board</span><span id="createBoardIcon" onClick={this.createBoard}>+</span></section>
          </header>
          <section id="content">
            { this.state.showBoards && this.state.boards? <BoardContainer showSuccess={this.state.showSuccess}>
            </BoardContainer> : null}
            { this.state.showLists && this.state.selectedBoard? <ListContainer key={Math.random()*1234}></ListContainer> : null }
          </section>
        </Provider>
      );
    }
  }
  
  export default Home;