import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
    return (
      <button className="square" onClick={props.passClick}>
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

    CheckwhoWon(i){
        let squares = this.handleClick(i);
        const whoWon = this.CheckIfStrike(squares);
        if (whoWon) {
            console.log("Voila! " + whoWon + " has won the Match!");
            setTimeout(function() { alert("Voila! " + whoWon + " has won the Match!")}, 0);
            // (async () => {
            //   console.log(await alert("Voila! " + whoWon + " has won the Match!"));
            // })();
          
            this.setState({
              whoWon: whoWon
            });
        }

    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (!squares[i]){
          squares[i] = this.state.lastWasX ? 'o' : 'x';
          this.setState({
            squares: squares,
            lastWasX: !this.state.lastWasX,
          });
        }
        console.log('second', this.state.lastWasX, 'state squares ->', this.state.squares, 'squares ->', squares, this.state.whoWon)
        return squares;
    }


    renderSquare(i) {
        return (
            <Square 
                value={this.state.squares[i]}
                passClick={() => this.CheckwhoWon(i)}
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
  