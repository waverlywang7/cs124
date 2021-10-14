
function ButtonBar(props){
    return(
        // <button type="button" onClick={props.onToggleCompletedItems}> Show Completed Tasks </button>
    <button
        type="button"
        onClick={() => props.setShowCompletedItems(props.name)}
    >
        <span className="visually-hidden">Show&nbsp;</span>
        <span>{ props.name }</span>
        <span className="visually-hidden">&nbsp;Tasks</span>
    </button>
    )
}

export default ButtonBar;