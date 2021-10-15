import "./ButtonBar.css"
function ButtonBar(props){
    return(
    <button
        type="button"
        className={props.isSelected ? "selected1" : "unselected1"}
        onClick={() => props.setShowCompletedItems(props.name)}
    >
        <span className="visually-hidden">Show&nbsp;</span>
        <span>{ props.name }</span>
    </button>
    )
}

export default ButtonBar;