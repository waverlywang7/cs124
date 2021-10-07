import './ListItem.css';

function ListItem(props) {
    const classes = ["listItem "];
    if (props.selected) {
        classes.push("selected");
    }

    return (
        <input type = "checkbox" id = "listitem0" name =" listitem0" ></input>
    <label htmlFor="listitem0">{props.name}</label>
    <br></br>
)}

    //             className={classes.join(" ")}
    //             name={props.name}
    //             key={props.id}
    //             id={props.id}
    //             completed={props.completed}
    //             onClick={(e) => {
    //                 props.onRowClick(e.currentTarget.id);
    //             }}
    // >

        export default ListItem;