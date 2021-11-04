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

    console.log(props.list);
    const input = useRef(null);
    const pInput = useRef(null);

    function handleAdd() {
        const newItem = {name: input.current.value, id: generateUniqueID(), completed: false, priority: pInput.current.value}
        setNewItem(newItem);
        props.onItemAdded(newItem.name, newItem.priority);
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

    function checkIfContainsCompleted() {
        for (let i = 0; i < props.list.length; i++) {
            if (props.list[i].completed === true) {
                return true;
            }
        }
        return false;
    }


    function checkIfOneSelected() {
        let count = 0;
        for (let i = 0; i < props.list.length; i++) {
            if (props.list[i].completed === true) {
                count++;
            }
        }
        if (count === 1) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <div class = "myList">
            <h2> MY LIST </h2>
            {buttonList}
            <div class="inputbar">
                <input type="text" ref={input} id="myInput"
                       onChange={(e) => setIsNotEmpty(checkInput(e.target.value))}
                       placeholder="I need to..."/>

                {isNotEmpty && <div class="addTask">
                    <button type="button" name="add" onClick={handleAdd}>Add Task</button>
                </div>
                }

                <text id = "priorityText"> Priority </text>
                <div className="dropdown">
                    {/*<button className="dropbtn">Priority</button>*/}

                    <select name="Priority" ref={pInput} id="priorityInput">
                        <option value="c" selected>low</option>
                        <option value="b" >medium</option>
                        <option value="a" >high</option>
                    </select>
                </div>
            </div>

            <button type="button" name="sortbyname" onClick={() => {
                props.onSort("name", "asc");
            }}>Sort By Name
            </button>

            <button type="button" name="sortbycreationdate" onClick={() => {
                props.onSort("creationDate", "asc");

            }}>Sort By Creation Date
            </button>

            <button type="button" name="priority" onClick={() => {
                props.onSort("priority", "asc");
            }}>Sort By Priority
            </button>
            <br/>
            <div class="deleteButtons">
                {checkIfOneSelected() ? <div class="deleteTask">
                    <button type="button" name="delete" id="delete" onClick={
                        () => {
                            props.onDeleteListItem(selectedId);
                            setSelectedId(null);
                        }}>Delete Task
                    </button>
                </div> : null
                }
                {(!checkIfOneSelected()) && checkIfContainsCompleted() ? <div class="deleteAllButton">
                    <button type="button" id="deleteAll" onClick={
                        () => {
                            props.onDeleteAll(selectedId);
                        }}>
                        Delete All Completed Tasks
                    </button>
                </div> : null}
            </div>
            <div> {tasks} </div>
            <br/>
        </div>);
}

export default MyList;