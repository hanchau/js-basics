import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
    return (
      <button className="square" onClick={props.passClick} onMouseMove={props.passWinnner}>
         {props.value}
      </button>
);
}


class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          squares: Array(9).fill(null),
          lastWasX: false,
          whoWon: null,
        };
      }
      
      CheckIfStrike(squares) {
        function checkStrike(squares){
            function checkIfEqual(x, y, z){
                if (x===y && y===z) {
                    return x;
                }
                return null;
            }
            function checkHorizontal(squares){
                return (
                    checkIfEqual(squares[0], squares[1], squares[2]) || 
                    checkIfEqual(squares[3], squares[4], squares[5]) || 
                    checkIfEqual(squares[6], squares[7], squares[8])
                );
            }
            function checkVertical(squares){
                return (
                    checkIfEqual(squares[0], squares[3], squares[6]) || 
                    checkIfEqual(squares[1], squares[4], squares[7]) || 
                    checkIfEqual(squares[2], squares[5], squares[8])
                );
            }
            function checkDiagonal(squares){
                return (
                    checkIfEqual(squares[0], squares[4], squares[8]) || 
                    checkIfEqual(squares[2], squares[4], squares[6])
                );
            }    
            return (
                checkHorizontal(squares) || 
                checkVertical(squares) || 
                checkDiagonal(squares)
                );
        }
        // debugger;
        return checkStrike(squares);

    }

    CheckwhoWon(){
        const squares = this.state.squares.slice();
        const whoWon = this.CheckIfStrike(squares);
        if (whoWon) {
            console.log("Voila! " + whoWon + " has won the Match!");
            alert("Voila! " + whoWon + " has won the Match!");
        }

    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        squares[i] = this.state.lastWasX ? 'o' : 'x';
        this.setState({
          squares: squares,
          lastWasX: !this.state.lastWasX,
        });
        // debugger;
        console.log(this.state.lastWasX, this.state.squares, this.state.whoWon)
      }
    


    renderSquare(i) {
        return (
            <Square 
                value={this.state.squares[i]}
                passClick={() => this.handleClick(i)}
                passWinnner={() => this.CheckwhoWon()}
            />
        );
    }
  
    render() {
      const status = 'Next player: ' + (this.state.lastWasX ? 'o': 'x');
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  

  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }

  
  
  
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  