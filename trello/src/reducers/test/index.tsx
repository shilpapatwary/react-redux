
import initialState from './initialState.json';
import TrelloApplicationReducer from '../TrelloReducer';
import {createStore} from 'redux';

const store = createStore(TrelloApplicationReducer, initialState);
export default store;