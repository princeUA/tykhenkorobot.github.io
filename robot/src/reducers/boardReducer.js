import {INIT_BOARD, RIGHT_CLICK, LEFT_CLICK, ROBOT_GOING, ROBOT_START} from '../actions';

const defaultCell = {
  coordinate: 0,
  isOpen: false,
  hasRobot: false
}

const defaultSize = 15;
let coordinates;

export default (state = null, action) => {
  let board = [];
  let maze = {};
  switch (action.type) {
    case INIT_BOARD:
      for (let row = 0; row < defaultSize; row++) {
        board[row] = [];
        for (let col = 0; col < defaultSize; col++) {
          let coordinate = row+'.'+col;
          board[row][col] = {...defaultCell};
          board[row][col].coordinate = coordinate;
        }
      }
      maze = {
        board: board,
        running: false,
        dirrection: 'down',
        path: []
      }

    return {...state, maze};

    case RIGHT_CLICK:
      coordinates = action.payload.coordinate.split('.');
      if(state.maze.run || !state.maze.board[coordinates[0]][coordinates[1]].isOpen){
        return {...state};
      }
      maze = {...state.maze};
      maze.robotX = coordinates[0];
      maze.robotY = coordinates[1];
      return {...state, maze};
      break;

    case ROBOT_START:
      maze = {...state.maze};
      maze.running = true;
      return {...state, maze};
      break;

    case ROBOT_GOING:
      maze = {...state.maze};
      let robotX = +maze.robotX;
      let robotY = +maze.robotY;
      if(robotX == 0 || robotY == 0 || robotX == 14 || robotY == 14){
        maze.running = false;
        return {...state, maze};
      }
      const ternLeft = maze.board[robotX] && maze.board[robotX][robotY - 1] && maze.board[robotX][robotY - 1].isOpen;
      const ternRight = maze.board[robotX] && maze.board[robotX][robotY + 1] && maze.board[robotX][robotY + 1].isOpen;
      const ternUp = maze.board[robotX - 1] && maze.board[robotX - 1][robotY] && maze.board[robotX - 1][robotY].isOpen;
      const ternDown = maze.board[robotX + 1] && maze.board[robotX + 1][robotY] && maze.board[robotX + 1][robotY].isOpen;
      switch (action.payload) {
        case 'down':
          if(ternDown && (!maze.path.includes((robotX+1)+'.'+robotY) ||
          ((!ternLeft || (maze.path.includes(robotX+'.'+(robotY-1)) && maze.path.lastIndexOf((robotX+1)+'.'+robotY) < maze.path.lastIndexOf(robotX+'.'+(robotY-1)))) &&
          (!ternRight || (maze.path.includes(robotX+'.'+(robotY+1)) && maze.path.lastIndexOf((robotX+1)+'.'+robotY) < maze.path.lastIndexOf(robotX+'.'+(robotY+1))))))){
            maze.path.push(robotX+'.'+robotY);
            maze.robotX = robotX + 1;
          } else if(ternLeft && (!maze.path.includes(robotX+'.'+(robotY-1)) || (maze.path.includes(robotX+'.'+(robotY+1)) && maze.path.lastIndexOf(robotX+'.'+(robotY-1)) < maze.path.lastIndexOf(robotX+'.'+(robotY+1))))){
            maze.dirrection = 'left';
          } else if(ternRight){
            maze.dirrection = 'right';
          } else {
            maze.dirrection = 'up';
          }
          return {...state, maze};
          break;
        case 'left':
          if(ternLeft && (!maze.path.includes(robotX+'.'+(robotY-1)) ||
          ((!ternUp || (maze.path.includes((robotX-1)+'.'+robotY) && maze.path.lastIndexOf(robotX+'.'+(robotY-1)) < maze.path.lastIndexOf((robotX-1)+'.'+robotY))) &&
          (!ternDown || (maze.path.includes((robotX+1)+'.'+robotY) && maze.path.lastIndexOf(robotX+'.'+(robotY-1)) < maze.path.lastIndexOf((robotX+1)+'.'+robotY)))))){
            maze.path.push(robotX+'.'+robotY);
            maze.robotY = robotY - 1;
          } else if(ternUp && (!maze.path.includes((robotX-1)+'.'+robotY) || (maze.path.lastIndexOf((robotX+1)+'.'+robotY) && maze.path.lastIndexOf((robotX-1)+'.'+robotY) < maze.path.lastIndexOf((robotX+1)+'.'+robotY)))) {
            maze.dirrection = 'up';
          } else if(ternDown){
            maze.dirrection = 'down';
          } else {
            maze.dirrection = 'right';
          }
          return {...state, maze};
          break;
        case 'up':
          if(ternUp && (!maze.path.includes((robotX-1)+'.'+robotY) ||
          ((!ternLeft || (maze.path.includes(robotX+'.'+(robotY-1)) && maze.path.lastIndexOf((robotX-1)+'.'+robotY) < maze.path.lastIndexOf(robotX+'.'+(robotY-1)))) &&
          (!ternRight || (maze.path.includes(robotX+'.'+(robotY+1)) && maze.path.lastIndexOf((robotX-1)+'.'+robotY) < maze.path.lastIndexOf(robotX+'.'+(robotY+1))))))){
            maze.path.push(robotX+'.'+robotY);
            maze.robotX = robotX - 1;
          } else if(ternRight && (!maze.path.includes(robotX+'.'+(robotY+1)) || (maze.path.lastIndexOf(robotX+'.'+(robotY-1)) && maze.path.lastIndexOf(robotX+'.'+(robotY+1)) < maze.path.lastIndexOf(robotX+'.'+(robotY-1))))) {
            maze.dirrection = 'right';
          } else if(ternLeft){
            maze.dirrection = 'left';
          } else {
            maze.dirrection = 'down';
          }
          return {...state, maze};
          break;
        case 'right':
          if(ternRight && (!maze.path.includes(robotX+'.'+(robotY+1)) ||
          ((!ternUp || (maze.path.includes((robotX-1)+'.'+robotY) && maze.path.lastIndexOf(robotX+'.'+(robotY+1)) < maze.path.lastIndexOf((robotX-1)+'.'+robotY))) &&
          (!ternDown || (maze.path.includes((robotX+1)+'.'+robotY) && maze.path.lastIndexOf(robotX+'.'+(robotY+1)) < maze.path.lastIndexOf((robotX+1)+'.'+robotY)))))){
            maze.path.push(robotX+'.'+robotY);
            maze.robotY = robotY + 1;
          } else if(ternDown && (!maze.path.includes((robotX+1)+'.'+robotY) || (maze.path.lastIndexOf((robotX-1)+'.'+robotY) && maze.path.lastIndexOf((robotX+1)+'.'+robotY) < maze.path.lastIndexOf((robotX-1)+'.'+robotY)))) {
            maze.dirrection = 'down';
          } else if(ternUp){
            maze.dirrection = 'up';
          } else {
            maze.dirrection = 'left';
          }
          return {...state, maze};
          break;
        default:

      }
      return {...state};
      break;

    case LEFT_CLICK:
      if(state.maze.run){
        return {...state};
      }
      coordinates = action.payload.coordinate.split('.');
      maze = {...state.maze};
      maze.board[coordinates[0]][coordinates[1]].isOpen = true;
      return {...state, maze};
      break;

    default:
      for (let row = 0; row < defaultSize; row++) {
        board[row] = [];
        for (let col = 0; col < defaultSize; col++) {
          let coordinate = row+'.'+col;
          board[row][col] = {...defaultCell};
          board[row][col].coordinate = coordinate;
        }
      }
      maze = {
        board: board,
        running: false,
        dirrection: 'down',
        path: []
      }

    return {...state, maze};
  }
}
