import { useState } from "react";
import confetti from "canvas-confetti";

import { Square } from "./components/Square.jsx";
import { Board } from "./components/Board.jsx";
import { TURNS } from "./constans.js";
import { checkWinnerFrom, checkEndGame } from "./logic/board.js";
import { WinnerModal } from "./components/WinnerModal.jsx";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  //estado para cambiar turno
  const [turn, setTurn] = useState(TURNS.x);

  //estado para detectar el ganador
  const [winner, setWinner] = useState(null); //null sin ganador, false hay empate, true hay ganador

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.x);
    setWinner(null);
  };

  const updateBoard = (index) => {
    // Si la posicion no esta vacia no actualizar
    if (board[index] || winner) return;
    //actualizar tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    // cambiar turno
    const newTurn = turn == TURNS.x ? TURNS.o : TURNS.x;
    setTurn(newTurn);
    //revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    }
    // check if game is over
    else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <main className="board">
      <h1>tic-tac-toe</h1>
      <button onClick={resetGame}>Restart</button>

      <Board board={board} updateBoard={updateBoard} />

      <section className="turn">
        <Square isSelected={turn == TURNS.x}>{TURNS.x}</Square>
        <Square isSelected={turn == TURNS.o}>{TURNS.o}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
