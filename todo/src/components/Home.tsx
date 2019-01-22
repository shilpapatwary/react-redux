import React, { Component } from 'react';
import ToDoList from './ToDoList';
import { ItemState } from '../types';
import {ItemData, TodoActionTypes} from '../types';
import store from '..';

interface ItemProps{
  items?: ItemData[],
  currentItem?: ItemData
}

class Home  extends Component<ItemProps, ItemState> {
  
  constructor (props: ItemProps) {
    super(props);
    this.state = {
      items: props.items,
      currentItem: props.currentItem
    };
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.moveItem = this.moveItem.bind(this);
  }

  addItem(newItem: ItemData) {
    store.dispatch({type:TodoActionTypes.ADD_ITEM, payload: newItem});
  }

  removeItem(id: String) {
    store.dispatch({type: TodoActionTypes.DELETE_ITEM, payload: {id}});
  }

  editItem(id: String, name: String) {
    store.dispatch({type: TodoActionTypes.EDIT_ITEM, payload: {id, name}});
  }
  updateItem(id: String, isComplete: boolean) {
    isComplete ? store.dispatch({type: TodoActionTypes.MARK_ITEM_AS_INCOMPLETE, payload: {id}}) : store.dispatch({type: TodoActionTypes.MARK_ITEM_AS_COMPLETE, payload: {id}});
  }

  moveItem(id: String, index: number) {
    store.dispatch({type: TodoActionTypes.MOVE_ITEM, payload: {id, index}});
  }
  render() {

      return (
          <ToDoList items={this.state.items} currentItem={this.state.currentItem} moveItem={this.moveItem} editItem={this.editItem} updateItem={this.updateItem} addItem={this.addItem} removeItem={this.removeItem}></ToDoList>
      );
    }
  }
  
  export default Home;