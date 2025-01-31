const Cell = ({details}) => {
    const cellStyle = {
        width: 40, height: 40, background: "lightgray",
        borderWidth: 3, borderStyle: "outset", display: "flex",
        justifyContent: "conter", alignItems: "conter", cursor: "pointer"
    }
    return(
        <div style={cellStyle}>
            {details.value}
        </div>
    );
}

export default Cell;