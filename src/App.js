import React, { useState } from "react";
import "./style.css";

function TowerOfHanoiGame() {
  const [diskCount, setDiskCount] = useState(3);
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);
  const [auxiliary, setAuxiliary] = useState([]);
  const [moves, setMoves] = useState([]);

  // Helper function to initialize the game state
  function initializeGame() {
    const disks = Array.from({ length: diskCount }, (_, i) => i + 1);
    setSource(disks);
    setDestination([]);
    setAuxiliary([]);
    setMoves([]);
  }

  // Recursive function to solve the Tower of Hanoi puzzle
  function solveTowerOfHanoi(n, source, destination, auxiliary) {
    if (n === 1) {
      setMoves((moves) => [...moves, `Move disk 1 from ${source} to ${destination}`]);
      destination.push(source.pop());
      return;
    }
    solveTowerOfHanoi(n - 1, source, auxiliary, destination);
    setMoves((moves) => [...moves, `Move disk ${n} from ${source} to ${destination}`]);
    destination.push(source.pop());
    solveTowerOfHanoi(n - 1, auxiliary, destination, source);
  }

  // Event handler for clicking the "Start" button
  function handleStartClick() {
    initializeGame();
    solveTowerOfHanoi(diskCount, source, destination, auxiliary);
  }

  // Event handler for changing the number of disks
  function handleDiskCountChange(event) {
    const count = parseInt(event.target.value);
    setDiskCount(count);
  }

  return (
    <div>
      <h1>Tower of Hanoi Game</h1>
      <label>
        Number of Disks:
        <input type="number" value={diskCount} onChange={handleDiskCountChange} />
      </label>
      <button onClick={handleStartClick}>Start</button>
      <div className="tower">
        <div className="peg">
          {source.map((disk) => (
            <div key={disk} className={`disk disk-${disk}`}></div>
          ))}
        </div>
        <div className="peg">
          {destination.map((disk) => (
            <div key={disk} className={`disk disk-${disk}`}></div>
          ))}
        </div>
        <div className="peg">
          {auxiliary.map((disk) => (
            <div key={disk} className={`disk disk-${disk}`}></div>
          ))}
        </div>
      </div>
      <div className="moves">
        {moves.map((move, i) => (
          <div key={i}>{move}</div>
        ))}
      </div>
    </div>
  );
}

export default TowerOfHanoiGame;
