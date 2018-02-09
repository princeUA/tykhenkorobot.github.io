import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {initBoard, leftClick, rightClick, robotStart, robotGoing} from '../actions';
import _ from 'lodash';

class Board extends Component{

  constructor(props){
    super(props);
    this.state = {
      size: 15
    }
  }

  componentWillMount(){
    document.removeEventListener('contextmenu', this._handleContextMenu);
  }

  createBoard(){
    return _.map(this.props.maze.board, (row, indexRow) => {
      return(
        <div key={indexRow} className="row">
          {this.createRow(row, indexRow)}
        </div>
      );
    });
  }
  createRow(row, indexRow){
    return _.map(row, (cell, indexCol) => {
      return(
        <div cell={cell} key={indexRow + '.' + indexCol} className={indexRow == this.props.maze.robotX && indexCol == this.props.maze.robotY ? 'cell cell-robot' : cell.isOpen ? 'cell cell-opened' : 'cell'}
        onClick={(e) => this.props.leftClick(e, cell)}
        onContextMenu={(e) => this.props.rightClick(e, cell)} ></div>
      )
    })
  }

  onSizeChange(e){
    this.setState({
      size: e.target.value
    });
  }

  componentDidUpdate(){
    if(this.props.maze.running){
      setTimeout(() => this.props.robotGoing(this.props.maze.dirrection), 200);
    }
  }

  render(){
    return(
      <div>
        <button className="start-btn" type="button" onClick={() => this.props.robotStart()}>Start</button>
        <button className="start-btn" type="button" onClick={() => this.props.initBoard(this.state.size)}>Restart</button>
        <span> Size: </span>
        <input type="number" name="size" value={this.state.size} onChange={(e) => this.onSizeChange(e)} />
        <div>
          {this.createBoard()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    maze: state.boardReducer.maze
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    initBoard: initBoard,
    leftClick: leftClick,
    rightClick: rightClick,
    robotGoing: robotGoing,
    robotStart: robotStart
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
