import React, { Component } from 'react';
import Board from './containers/board'

class App extends Component {
  render() {
    return (
      <div className="App">
       <Board />
       <div className="instuct">
        <h2>Left Click - open cell</h2>
        <h2>Right Click - put Robot</h2>
       </div>
     </div>
    );
  }
}

export default App;
