import React from 'react';
import ReactDOM from 'react-dom';
import TodoApplicationReducer from '../../reducers/reducer'; 
import initialState from './initialState.json';

import {createStore} from 'redux';
const store = createStore(TodoApplicationReducer, initialState);

export default store;