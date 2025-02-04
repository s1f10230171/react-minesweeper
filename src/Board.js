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
    };
    const handleRevealCell = (x,y) =>{
        if(gameData.gameStatus === 'You Lost' ||
            gameData.gameStatus === 'You Win'){return;}
        if(gameData.board[x][y].revealed ||
            gameData.board[x][y].flagged){return;}
            
        const newGameData = {...gameData};

        if(newGameData.board[x][y].value === 'X'){
            //クリックしたマスが地雷だった場合
            //すべての地雷マスをオープン
            newGameData.board.forEach((row) => {
                row.forEach((cell) => {
                    if (cell.value === 'X') {
                        cell.revealed = true;
                    }
                });
            });
            newGameData.gameStatus = 'You Lost';
        }else if(newGameData.board[x][y].value === 0){
            //クリックしたマスに地雷がない場合
            const newRevealedData = revealEmpty(x,y,newGameData);
            setGameData(newRevealedData);return;
        }else{
            //クリックしたマスに1個以上の地雷がある場合
            newGameData.board[x][y].revealed = true;
            newGameData.cellsWithoutMines--;
            if(newGameData.cellsWithoutMines === 0){
                newGameData.gameStatus = 'You Win';
            }
        }
            setGameData(newGameData);
    };
    const revealEmpty = (x,y,data) => {
        if(data.board[x][y].revealed){return;}

        data.board[x][y].revealed = true;
        data.cellsWithoutMines--;
        if(data.cellsWithoutMines === 0){
            data.gameStatus = 'You Win';
        }
         //マスの周辺に地雷がない場合は、周辺のマスをいっぺんに開示
        if(data.board[x][y].value === 0){
            for(let y2 = Math.max(y-1, 0); y2 < Math.min(y+2, col); y2++){
                for(let x2 = Math.max(x-1, 0); x2 < Math.min(x+2, row); x2++){
                    if(x2 != x || y2 != y ){revealEmpty(x2, y2, data);}
            }
        }
    }
    return data;
    };

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
                                    return <Cell details={singleCell} onUpdateFlag={handleUpdateFlag}
                                    onRevealCell={handleRevealCell} key={index2} />
                                })
                            }
                            </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Board;