import { useState, useEffect } from "react";
import createBoard from "./createBoard";
import Cell from "./Cell";

const Board = ({row, col, mines}) => {
    const [gameData, setGameData] = useState({});

    useEffect(()=>{
        const newBoard = createBoard(row, col, mines);
        console.log(newBoard);
        setGameData({
            board: newBoard,
            gameStatus: 'Game in Progress',
            cellsWithoutMines: row * col - mines,
            numOfMines: mines
        });
    },[]);
    const handleUpdateFlag = (e, x, y)=> {
        //右クリックメニューを無効化
        e.preventDefault();
        //ゲーム終了時にフラグの更新が行われないようにする
        if(gameData.gameStatus === 'You Lost' ||
            gameData.gameStatus === 'You Win'){return;}
        if(gameData.board[x][y].revealed){return;}

        setGameData((prev)=> {
            //newBoardに現在のboardのコピーを作成
            const newBoard = [...prev.board];
            //フラグの状態を反転
            const newFlag = !newBoard[x][y].flagged;
            //残りの地雷の数を定義
            let newNumOfMines = prev.numOfMines;
            //newflagがtrue(追加)で残数を-1、false(削除)で残数を+1する
            newNumOfMines = newFlag ? newNumOfMines - 1 : newNumOfMines + 1;
            //指定されたマスをnewflagにわたす
            newBoard[x][y].flagged = newFlag;

            return {
                //boardと地雷数が更新されたものを返す
                ...prev,
                numOfMines: newNumOfMines,
                board: newBoard
            }
        });
    }

    if(!gameData.board){ return <div>Loading...</div>}

    return(
        <div>
            <div>残りの地雷数:{gameData.numOfMines}</div>
            <div>Game Status: {gameData.gameStatus}</div>
            <div>
                {gameData.board.map((singleRow, index1)=>{
                    return(
                        <div style={{display:'flex'}} key={index1}>
                            {
                                singleRow.map((singleCell,index2)=>{
                                    return <Cell details={singleCell} 
                                    onUpdateFlag={handleUpdateFlag} key={index2} />
                                })
                            }
                            </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Board;