import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/Home';

import initialState from './initialState.json';
import SlackApplicationReducer from './store/SlackApp/reducer';
import {createStore} from 'redux';

export const store = createStore(SlackApplicationReducer, initialState);
ReactDOM.render(<Home/>, document.getElementById('root'));
