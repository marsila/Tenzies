import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Die from "./Die";

function App() {

  function generateDiceNumbers() {
    const allDiceNums = [];
    for (let i = 0; i < 10; i++) {
      allDiceNums.push({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid(),
      }); // OR Math.ciel(Math.random()*6)
    }
    return allDiceNums;
    // Another way to create an array
    // return new Array(10)
    //         .fill(0)
    //         .map(() => Math.ceil(Math.random() * 6))
  }
  const [diceArray, setDiceArray] = useState(() => generateDiceNumbers());

  const firstVal = diceArray[0].value;

  const newGameFocuse = useRef(null);

  const gameWon =
    diceArray.every((die) => die.isHeld) &&
    diceArray.every((die) => die.value === firstVal);

  useEffect(()=> {
    gameWon && newGameFocuse.current.focus()
    ,[gameWon]

  });
  

  //React confetti
  //npm install react-confetti

  

  const rollDice = () => {
    setDiceArray((oldDice) =>
      oldDice.map((die) =>
        die.isHeld === false
          ? { ...die, value: Math.ceil(Math.random() * 6) }
          : die
      )
    );
    if (gameWon) {
      setDiceArray(generateDiceNumbers);
      console.log(gameWon);
    }
  };

  const holdDice = (id) => {
    setDiceArray((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  };
  return (
    <main>
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {gameWon && (
          <p>Congratulations! You won! Press "New Game" to start again.</p>
        )}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        {gameWon
          ? `You Won! Congrats !`
          : `Roll until all dice are the same. Click each die to freeze it at its current value between rolls.`}
      </p>
      <div className="die-container">
        {diceArray.map((item) => (
          <Die
            key={item.id}
            value={item.value}
            isHeld={item.isHeld}
            holdDice={holdDice}
            id={item.id}
          />
        ))}
      </div>
      <button 
        className="play-button" 
        onClick={rollDice}
        ref={newGameFocuse}
      >
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
