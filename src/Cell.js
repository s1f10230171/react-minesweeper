const Cell = ({details, onUpdateFlag}) => {
    const cellStyle = {
        width: 40, height: 40, background: "lightgray",
        borderWidth: 3, borderStyle: "outset", display: "flex",
        justifyContent: "center", alignItems: "center", cursor: "pointer"
    }
    const getCellDisplay = () => {
        if(!details.revealed) {return details.flagged ? '🚩':null;}
        if(details.value === 'X'){return '💣';}
        if(details.value === 0){return null;}
        return details.value;
    }
    return(
        <div style={cellStyle} 
        onContextMenu={(e) => {e.preventDefault(); onUpdateFlag(e,details.x, details.y);}}>
            {getCellDisplay()}
        </div>
    );
}

export default Cell;