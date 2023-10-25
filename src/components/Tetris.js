import { useState } from "react";
import { createStage } from "../gameHelpers";
// Components
import Display from "./Display";
import Stage from "./Stage";
import StartButton from "./StartButton";
// Styled components
import { StyledTetris, StyledTetrisWrapper } from "./styles/StyledTetris";
// Custom hooks
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer] = usePlayer();
  const [stage, setStage] = useStage(player);

  const movePlayer = direction => {
    updatePlayerPos({ x: direction, y: 0 })
  }

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    resetPlayer();
  }

  const drop = () => {
    updatePlayerPos({ x: 0, y: 1, collided: false })
  }

  const dropPlayer = () => {
    drop();
  }

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      }
    }
  }

  return (
    <StyledTetrisWrapper 
      role="button" 
      tabIndex="0" 
      onKeyDown={ e => move(e) }
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {/* if game is over, display game over */}
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
          // if game is not over, display the score, rows and level
            <div>
              <Display text="Score" />
              <Display text="Rows" />
              <Display text="Level" />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
