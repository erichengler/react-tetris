import { useState } from "react";
import { createStage, checkCollision } from "../gameHelpers";
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

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  const movePlayer = direction => {
    if (!checkCollision(player, stage, { x: direction, y: 0 })) {
      updatePlayerPos({ x: (direction / 2), y: 0 });
    }
  }

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    resetPlayer();
    setGameOver(false);
  }

  const drop = () => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      // ! CHANGED Y value from 1 to 0.5 - this might break stuff
      updatePlayerPos({ x: 0, y: 0.5, collided: false });
    } else {
      // Game Over
      if (player.pos.y < 1) {
        console.log('GAME OVER!!!');
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }

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
      } else if (keyCode === 38) {
        playerRotate(stage, 1);
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
