import './ListItem.css';
import './MyList.js'

import ListItemField from './ListItemField.js'
import React, {useState, useRef} from 'react';
function ListItem(props) {
    const classes = ["listItem "];

    if (props.selected) {
        classes.push("selected");
    }

    return (
        <div className={classes.join(" ")}
             key={props.id}
             id={props.id}
             onClick={(e) => {
                 props.onRowClick(e.currentTarget.id);
             }}
        >
            <div class= "container2">
                <input
                    type="checkbox"
                    onChange={(e) => {
                        props.onListItemFieldChanged(props.id, "completed", e.target.checked);
                    }
                    }

                    id={props.id}
                    checked={props.completed}
                />
            <ListItemField field="name" {...props}/>
            </div>

        </div>
    )
}

export default ListItem;