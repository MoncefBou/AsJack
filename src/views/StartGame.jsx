import React from "react";
import "../components/style/StartGame.css";

class StartGame extends React.Component {
  render() {
    return (
      <div className='game'>
        <h1>Black Jack</h1>
        <div>
          <button type="button" className=" buttonToStart btn btn-outline-warning rounded-pill" onClick={this.props.startGame}>Start</button>
        </div>
      </div>
    );
  }
}

export default StartGame;
