import ListItem from "./ListItem.js";
import React, {useState, useRef} from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import ButtonBar from "./ButtonBar.js";

function MyList(props) {
    const [newItem, setNewItem] = useState({name: "", id: 0, completed: false});
    const [selectedId, setSelectedId] = useState(null);
    const [showCompletedItems, setShowCompletedItems] = useState("All");

    const input = useRef(null);

    function handleAdd() {
        console.log("INPUT value " + input.current.value);
        if (!input) {
            alert("Please enter a task");
            return false;
        }
        const newItem = {name: input.current.value, id: generateUniqueID(), completed: false}
        setNewItem(newItem);
        props.onItemAdded(newItem);
        input.current.value = "";
    }

    function deleteAll() {
        props.onDeleteAll();
    }

    const listItemFilterMap = {
        All: () => true,
        Uncompleted: listItem => !listItem.completed,
        Completed: listItem => listItem.completed
    }

    const listItemFilterNames = Object.keys(listItemFilterMap);
    const buttonList = listItemFilterNames.map(name => (
        <ButtonBar
            name={name}
            aria-pressed={props.isSelected}
            isSelected={name === showCompletedItems}
            setShowCompletedItems={setShowCompletedItems}/>
    ))

    console.log(props)
    console.log(props.list)

    const filteredList = props.list.filter(listItemFilterMap[showCompletedItems]);
    console.log(filteredList);
    const tasks = filteredList
        .map(a =>
            <ListItem
                onRowClick={(id) =>
                    setSelectedId(id)}
                onListItemFieldChanged={props.onListItemFieldChanged}
                selected={a.id === selectedId}
                key={a.id}
                {...a} />);

    const checkInput = () => {
        return (props.name !== "");
    }

    const checkCompleted = () => {
        for (let i = 0; i < props.list.length; i++) {
            if (props.list[i].completed) {
                return true;
            }
        }
        return false;
    }

    return (

        <div>
            <h2> My List </h2>
            {buttonList}
            <br/>
            <input type="text" ref={input} id="myInput" placeholder="I need to..."/>
            <div class="container">
                {<button onClick={handleAdd}>Add Task</button>}
                {selectedId && <div class="deleteTask">
                    <button type="button" name="delete" id="delete" onClick={
                        () => {
                            props.onDeleteListItem(selectedId);
                            setSelectedId(null);
                        }}>
                        Delete Task
                    </button>
                </div>
                }
            </div>
            <br/>
            <div> {tasks} </div>

            {selectedId && <div class="deleteAllButton">
                <button type="button" onClick={
                    () => {
                        props.onDeleteAll(selectedId);
                        setSelectedId(null);
                    }}>
                    Delete All Completed Tasks
                </button>
                {/*{ <div className="deleteAllButton">*/}
                {/*    <button onClick={deleteAll}>Delete All Completed Tasks</button>*/}
            </div>}

        </div>);
}

export default MyList;