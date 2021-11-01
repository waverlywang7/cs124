import ListItem from "./ListItem.js";
import './MyList.css';
import React, {useState, useRef} from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import ButtonBar from "./ButtonBar.js";
import query from "./App.js"
//import {onSnapshot} from "firebase/firebase-firestore";

function MyList(props) {
   const [newItem, setNewItem] = useState({name: "", id: 0, completed: false});
   const [selectedId, setSelectedId] = useState(null);
   const [showCompletedItems, setShowCompletedItems] = useState("All");
   const [isNotEmpty, setIsNotEmpty] = useState(false);
   const [containsCompleted, setContainsCompleted] = useState(false);

    const input = useRef(null);

    function handleAdd() {
        const newItem = {name: input.current.value, id: generateUniqueID(), completed: false}
        setNewItem(newItem);
        // query.onSnapshot(querySnapshot => query.update(newItem)
        //     )
       props.onItemAdded(newItem.name);
        input.current.value = "";
       setIsNotEmpty(false);

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


    const filteredList = props.list.filter(listItemFilterMap[showCompletedItems]);
    const tasks = filteredList
        .map(a =>
            <ListItem
                onRowClick={(id) =>
                    setSelectedId(id)}
                onListItemFieldChanged={props.onListItemFieldChanged}
                selected={a.id === selectedId}

                key={a.id}
                {...a} />,
            );

    const checkInput = (value) => {
        return (value !== "");
    }

    return (
        <div>
            <h2> My List </h2>
            {buttonList}
            <br/>
            <input type="text" ref={input} id="myInput"
                   onChange={(e) => setIsNotEmpty(checkInput(e.target.value))}
                   placeholder="I need to..."/>
            {isNotEmpty && <div class="addTask">
                <button type="button" name="add" onClick={handleAdd}>Add Task</button>
            </div>
            }

            <button type="button" name="sortbyname" onClick={() => {
                props.onSort("name", "asc");
            }}>Sort By Name</button>

            <button type="button" name="sortbycreationdate" onClick={() => {
                props.onSort("creationDate", "asc");


            }}>Sort By Creation Date</button>

            <button type="button" name="priority" onClick={() => {
                props.onSort("name", "asc");
            }}>Sort By Priority</button>
                {selectedId && <div class="deleteTask">
                    <button type="button" name="delete" id="delete" onClick={
                        () => {
                            props.onDeleteListItem(selectedId);
                            setSelectedId(null);
                        }}>Delete Task
                    </button>
                </div>
                }

            <br/>
            <div> {tasks} </div>
            <br/>
            {containsCompleted && <div class="deleteAllButton">
                <button type="button" onClick={
                    () => {
                        props.onDeleteAll(selectedId);
                    }}>
                    Delete All Completed Tasks
                </button>
            </div>}
        </div>);
}

export default MyList;