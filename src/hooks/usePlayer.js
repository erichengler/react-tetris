import { useCallback, useState } from "react";

import { TETROMINOS, randomTetromino } from '../tetrominos';
import { STAGE_WIDTH } from "../gameHelpers";

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0 },
        tetromino: TETROMINOS[0].shape,
        collided: false,
    });

    const updatePlayerPos = ({ x, y, collided }) => {
        setPlayer(prev => ({
            ...prev,
            pos: { x: (prev.pos.x += x), y: (prev.pos.y += y )},
            collided,
        }));
    };

    // ! THIS IS THE PROBLEM RIGHT NOW - "resetPlayer is not a function"
    // When tetromino hits bottom of screen, resetPlayer is supposed to be called
    // See useStage.js line 27 to see where resetPlayer is called
    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
            tetromino: randomTetromino().shape,
            collided: false,
        });
    }, []);

    return [player, updatePlayerPos, resetPlayer];
}