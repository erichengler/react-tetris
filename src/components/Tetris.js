import { useState } from "react";
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

  const [player] = usePlayer();
  const [stage, setStage] = useStage(player);

  return (
    <StyledTetrisWrapper>
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
          <StartButton />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
