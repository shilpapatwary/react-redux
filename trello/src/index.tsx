import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/Home';

import initialState from './initialState.json';
import TrelloApplicationReducer from './store/TrelloApp/reducer';
import {createStore} from 'redux';

export const store = createStore(TrelloApplicationReducer, initialState);

ReactDOM.render(<Home/>, document.getElementById('root'));