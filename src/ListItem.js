import './ListItem.css';
import './MyList.js'
import ListItemField from './ListItemField.js'
import React, {useState, useRef} from 'react';

function ListItem(props) {
    const classes = ["listItem "];
    if (props.selected) {
        classes.push("selected");
    }

    function checkifSelected(level) {
        return level === props.priority;
    }

    return (
        <div className={classes.join(" ")}
             key={props.id}
             id={props.id}
             onClick={(e) => {
                 props.onRowClick(e.currentTarget.id);
             }}
        >
            <div class="container2">
                <input
                    type="checkbox"
                    onChange={(e) => {
                        props.onListItemFieldChanged(props.listId, props.id, "completed", e.target.checked);
                    }
                    }
                    id={props.id}
                    checked={props.completed}
                />
                <ListItemField field="name" {...props}/>
                <div className="itemDropdown">
                    <select name="Priority"
                            id="priorityInput"
                            onChange={(e) => {
                                props.onListItemFieldChanged(props.listId, props.id, "priority", e.target.value);
                            }}>
                        <option value="c" id="low" selected={checkifSelected("c")}>low</option>

                        <option value="b" id="medium" selected={checkifSelected("b")}>medium</option>

                        <option value="a" id="high" selected={checkifSelected("a")}>high</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default ListItem;