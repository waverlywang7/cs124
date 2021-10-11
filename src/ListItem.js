import './ListItem.css';
import handleListItemFieldChanged from "./MyList.js";

import ListItemField from './ListItemField.js'

function ListItem(props) {
    const classes = ["listItem "];
    if (props.selected) {
        classes.push("selected");
    }
    console.log(props.completed);
    return (
        <div className={classes.join(" ")}
             key={props.id}
             id={props.id}
             onClick={(e) => {
                 props.onRowClick(e.currentTarget.id);
             }}
        ><input type="checkbox" onChange={handleListItemFieldChanged}
                id="listitem0" name=" listitem0" value="test"/><ListItemField field="name" {...props}/>
            <ListItemField field="name" {...props}/>
            <ListItemField field="completed" {...props}/>
            {/*<>*/}
            {/*    <input type = "checkbox" id = "listitem0" name =" listitem0" value="test" />*/}
            {/*    /!*<label htmlFor="listitem0">{props.name}</label>*!/*/}
            {/*    /!*<br />*!/*/}
            {/*</>*/}
        </div>
    )
}

export default ListItem;