import initialState from './initialState.json';
import SlackApplicationReducer from '../SlackReducer';
import {createStore} from 'redux';

export const store = createStore(SlackApplicationReducer, initialState);

export default store;