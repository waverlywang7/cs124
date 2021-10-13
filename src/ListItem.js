import './ListItem.css';
import './MyList.js'
import handleChecked from "./MyList.js";

import ListItemField from './ListItemField.js'

function ListItem(props) {
    // console.log(props.completed);
    const classes = ["listItem "];
    // const checked = ["listItemChecked "]
    if (props.selected) {
        classes.push("selected");
    }
    // console.log("selected " + props.selected);
    // console.log("completed " + props.completed);
    // console.log("props outside handlechecked" + props)

    // function handleChecked(props){
    //     // const updatedList = this.state.checkedboxes.map(checkedbox => {
    //     //     if (checkedbox.id === id) {
    //     //         checkedbox.completed = !checkedbox.completed;
    //     //     }
    //     //     return checkedbox;
    //     // });
    //     // console.log("inside handleChecked " + props.selected);
    //     // console.log("inside handlechecked " + props.completed);
    //     //if (props.completed){
    //     let current = !props.completed;
    //
    //     console.log("current " + current);
    //     checked.push(current.toString());
    //     //}
    //     console.log("checked array " + checked);
    //     //props.completed = !props.completed;
    //     // setData(data.map(
    //     //     listItem => listItem.completed == completed
    //     //         ? false
    //     //         : true,
    //     // ))
    // }

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
                    //checked={props.completed}
                    //onClick={}
                    onChange={() => props.toggleListItemCompleted(props.id)}
                    id={props.id}
                    name=" listitem0"
                    defaultChecked={props.completed}
                    value="test"/>

                <ListItemField field="name" {...props}/>
            </div>
            {/*<ListItemField field="name" {...props}/>*/}
            {/*<ListItemField field="completed" {...props}/>*/}
            {/*<>*/}
            {/*    <input type = "checkbox" id = "listitem0" name =" listitem0" value="test" />*/}
            {/*    /!*<label htmlFor="listitem0">{props.name}</label>*!/*/}
            {/*    /!*<br />*!/*/}
            {/*</>*/}
        </div>
    )
}

export default ListItem;