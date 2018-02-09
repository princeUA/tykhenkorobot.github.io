import {RESET_SIZE} from '../actions';

const defaultBoard = {
  board: [],
  defaultCell: {
    coordinate: 0,
    isOpen: false,
    hasRobot: false
  },
  size: 15
}

export default (state = defaultBoard, action) => {
  switch (action.type) {
    case RESET_SIZE:

      return {...state, size: action.payload}
      break;
    default:
      return {...state}
  }
};
