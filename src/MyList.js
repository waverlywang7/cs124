import ListItem from "./ListItem.js";
import './MyList.css';
import React, {useState, useRef} from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import ButtonBar from "./ButtonBar.js";


function MyList(props) {
    const [newItem, setNewItem] = useState({name: "", id: 0, completed: false});
    const [selectedId, setSelectedId] = useState(null);
    const [showCompletedItems, setShowCompletedItems] = useState("All");
    const [isNotEmpty, setIsNotEmpty] = useState(false);


    const input = useRef(null);
    const pInput = useRef(null);


    function handleAdd() {
        const newItem = {
            name: input.current.value,
            id: generateUniqueID(),
            completed: false,
            priority: pInput.current.value
        }
        setNewItem(newItem);
        props.onItemAdded(newItem.name, newItem.priority, props.listId);
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

    function toggleDropdown() {
        document.getElementById("sortButton1").classList.toggle("hideButton");
        document.getElementById("sortButton2").classList.toggle("hideButton");
        document.getElementById("sortButton3").classList.toggle("hideButton");
    }

    function toggleOrderDropdown() {
        document.getElementById("ascending").classList.toggle("hideButton");
        document.getElementById("descending").classList.toggle("hideButton");
    }

    //Close the dropdown if the user clicks outside of it
    window.onclick = function (e) {
        if (!e.target.matches('.sortDropdown')) {
            var myDropdown = document.getElementById("myDropdown");
            if (myDropdown.classList.contains('show')) {
                myDropdown.classList.remove('show');
            }
        }
    }


    return (

        <div class="myList">

            <h2> MY LIST </h2>
            {buttonList}
            <div class="inputbar">
                <input type="text" ref={input} id="myInput"
                       onChange={(e) => setIsNotEmpty(checkInput(e.target.value))}
                       placeholder="I need to..."/>

                {isNotEmpty && <div id="prioritycontainer">
                    <text id="priorityText"> Priority</text>
                    <div className="dropdown">

                        <select name="Priority" ref={pInput} id="priorityInput">
                            <option value="c">low</option>
                            <option value="b">medium</option>
                            <option value="a">high</option>
                        </select>
                    </div>
                </div>
                }


                {isNotEmpty && <div class="addTask">
                    <button type="button" name="add" id="add" onClick={handleAdd}
                    >Add Task</button>
                </div>
                }
            </div>
            <div className="dropdown">
                <button onClick={toggleDropdown} className="sortDropdown" id="sort">Sort
                    <i class="fa fa-caret-down"></i>
                </button>
                <div id="myDropdown" className="dropdown-content">
                    <option type="button" name="sortbyname" id="sortButton1" onClick={() => {
                        props.onSort("name", "asc");
                    }}> Sort by Name
                    </option>

                    <option type="button" name="sortbycreationdate" id="sortButton2" onClick={() => {
                        props.onSort("creationDate", "asc");

                    }}> Sort by Creation Date
                    </option>
                    <option type="button" name="priority" id="sortButton3" onClick={() => {
                        props.onSort("priority", "asc");
                    }}> Sort by Priority
                    </option>
                </div>


                <button onClick={toggleOrderDropdown} className="sortDropdown" id="order">Order
                    <i className="fa fa-caret-down"></i>
                </button>
            <div id="togglesort" className="dropdown-content">
                <option type="button" name="ascending" id="ascending" onClick={() => {
                    props.toggleSort("asc");
                }}> Ascending
                </option>

                <option type="button" name="descending" id="descending" onClick={() => {
                    props.toggleSort("desc");

                }}> Descending
                </option>

            </div>
            </div>
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
            <div class="taskList"> {tasks} </div>
            <br/>
        </div>

    );
}

export default MyList;