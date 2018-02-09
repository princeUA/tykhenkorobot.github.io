import {combineReducers} from "redux";
import boardReducer from './boardReducer';

const allReducers = combineReducers({
  boardReducer: boardReducer
})

export default allReducers;
