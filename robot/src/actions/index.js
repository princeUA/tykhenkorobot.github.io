export const INIT_BOARD = 'INIT_BOARD';
export const RIGHT_CLICK = 'RIGHT_CLICK';
export const LEFT_CLICK = 'LEFT_CLICK';
export const ROBOT_GOING = 'ROBOT_GOING';
export const ROBOT_START = 'ROBOT_START';


export const initBoard = (size) => {
  return{
    type: INIT_BOARD,
    payload: size
  }
};
export const robotStart = () => {
  return{
    type: ROBOT_START,
    payload: true
  }
}
export const robotGoing = (direction) => {
  return{
    type: ROBOT_GOING,
    payload: direction
  }
}
export const leftClick = (e, cell) => {
  return{
    type: LEFT_CLICK,
    payload: cell
  }
}
export const rightClick = (e, cell) => {
  e.preventDefault();
  return{
    type: RIGHT_CLICK,
    payload: cell
  }
};
