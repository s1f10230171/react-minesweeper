import React, { useRef } from "react"; 

const Cell = ({details, onUpdateFlag, onRevealCell}) => {
    const cellStyle = {
        width: 40, height: 40, background: "lightgray",
        borderWidth: 3, borderStyle: "outset", display: "flex",
        justifyContent: "center", alignItems: "center", cursor: "pointer",
        useSelect: "none", fontSize: "20px"
    }

// スマホ対応
    const longPressTimer = useRef(null);
    const didLongPress = useRef(false);

    const handleTouchStart = (e) => {
        didLongPress.current = false;
        longPressTimer.current = setTimeout(() => {
          didLongPress.current = true;
          onUpdateFlag(e, details.x, details.y); // 🚩トグル
        }, 500);
      };
    
    const handleTouchEnd = (e) => {
        clearTimeout(longPressTimer.current);
        // 長押し中だったらクリック無視
        if (!didLongPress.current) {
          onRevealCell(details.x, details.y); // 通常タップならマスを開ける
        }
      };

    const handleTouchTap = (e) => {
        // 長押しでなければ普通に開く
        onRevealCell(details.x, details.y);
      };

//

    const getCellDisplay = () => {
        if(!details.revealed) {return details.flagged ? '🚩':null;}
        if(details.value === 'X'){return '💣';}
        if(details.value === 0){return null;}
        return details.value;
    }
    return(
        <div style={{...cellStyle, borderStyle: details.revealed ? 'inset' : 'outset'}} 
        onContextMenu={(e) => {
            e.preventDefault();
             onUpdateFlag(e,details.x, details.y);}}//PC右クリック
        onClick={() => onRevealCell(details.x, details.y)} //PCクリック
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onTouchMove={handleTouchEnd}//スクロール防止
        onTouchEndCapture={handleTouchTap} // タップで開く
        > 
        {getCellDisplay()}
        </div>
    );
}

export default Cell;