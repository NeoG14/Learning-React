import { useState } from "react"
import confetti from "canvas-confetti"

const TURNS = {
  x: 'x',
  o: 'o'
}

const WINNER_COMBOS = [
  //horizontales
  [0,1,2],
  [3,4,5],
  [6,7,8],

  //verticales
  [0,3,6],
  [1,4,7],
  [2,5,8],

  //diagonales
  [0,4,8],
  [2,4,6]
]



const Square = ({ children, isSelected, updateBoard, index}) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`


  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))

  //estado para cambiar turno
  const [turn, setTurn] = useState(TURNS.x)

  //estado para detectar el ganador
  const [winner, setWinner] = useState(null) //null sin ganador, false hay empate, true hay ganador

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] == boardToCheck[b] &&
        boardToCheck[a] == boardToCheck[c]
      ){
        return boardToCheck[a]
      }
    }
    return null
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square != null)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setWinner(null)
  }

  const updateBoard = (index) => {
    // Si la posicion no esta vacia no actualizar
    if (board[index] || winner) return
    //actualizar tablero
    const newBoard = [... board]
    newBoard[index] = turn 
    setBoard(newBoard)
    // cambiar turno
    const newTurn = turn == TURNS.x ? TURNS.o : TURNS.x
    setTurn(newTurn)
    //revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner){
      confetti()
      setWinner(newWinner)
    }
    // check if game is over
    else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <main className="board">
      <h1>tic-tac-toe</h1>
      <button onClick={resetGame}>Restart</button>
      <section className="game">
        {
        board.map((square,index) =>  {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
              {square}
            </Square>
          )
        })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn == TURNS.x}>{TURNS.x}</Square>
        <Square isSelected={turn == TURNS.o}>{TURNS.o}</Square>
      </section>

      {
        winner != null && (
          <section className="winner">
            <div className="text">
              <h2>
                {
                  winner == false ? 'Empate' : 'Ganador '
                }
              </h2>

              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Restart</button>
              </footer>
            </div>
          </section>

        )
      }
    </main>
  )
}

export default App
