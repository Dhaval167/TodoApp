import {combineReducers} from 'redux';
import todoReducer from './Reducers/TodoReducer';

const rootReducers = combineReducers({
  todoReducer,
});

export default rootReducers;
