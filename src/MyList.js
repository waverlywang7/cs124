import ListItem from "./ListItem.js";
import './MyList.css';
import React, {useState, useRef} from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import ButtonBar from "./ButtonBar.js";
import {useCollection} from "react-firebase-hooks/firestore";
import firebase from "firebase/compat";


const firebaseConfig = {
    apiKey: "AIzaSyCd9qqxvMpEKpBzwfWcc2tlRFa6ICaLH_s",
    authDomain: "hmc-cs124-fa21-labs.firebaseapp.com",
    projectId: "hmc-cs124-fa21-labs",
    storageBucket: "hmc-cs124-fa21-labs.appspot.com",
    messagingSenderId: "949410042946",
    appId: "1:949410042946:web:0113b139a7e3cd1cc709db"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


const collectionName = "waverlywang7-listitems";
const collectionOfLists = db.collection(collectionName);

function MyList(props) {
    const [newItem, setNewItem] = useState({name: "", id: 0, completed: false});
    const [selectedId, setSelectedId] = useState(null);
    const [showCompletedItems, setShowCompletedItems] = useState("All");
    const [isNotEmpty, setIsNotEmpty] = useState(false);
    const [inputName, setInputName] = useState("");
    const input = useRef(null);
    const pInput = useRef(null);
    // const [currentList, setCurrentList] = props.listId;
    const [order, setOrder] = useState({sortField:"name",sortDirection:"asc"});
    const [sortSelected, setSortSelected] = useState(false);
    console.log("props.listId" ,props.listId)
    const [value, loading, error] = useCollection(collectionOfLists.doc(props.listId).collection("tasks").orderBy(order.sortField, order.sortDirection));

    let data = [];
    if (value !== undefined) {
        data = value.docs.map(doc =>
            doc.data());
    }

    function handleSort(name, direction) {
        setOrder({sortField: name, sortDirection: direction});
        setSortSelected(true);
    }

    function toggleSort(direction) {
        setOrder({sortField: order.sortField, sortDirection: direction});
    }

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

    console.log(props);
    const filteredList = data.filter(listItemFilterMap[showCompletedItems]);

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
        for (let i = 0; i < data.length; i++) {
            if (data[i].completed === true) {
                return true;
            }
        }
        return false;
    }

    function checkIfOneSelected() {
        let count = 0; //filter
        for (let i = 0; i < data.length; i++) {
            if (data[i].completed === true) {
                count++;
            }
        }
        return count == 1;
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

            <h2> {props.name} </h2>
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
                        handleSort("name", "asc");
                    }}> Sort by Name
                    </option>

                    <option type="button" name="sortbycreationdate" id="sortButton2" onClick={() => {
                        handleSort("creationDate", "asc");

                    }}> Sort by Creation Date
                    </option>
                    <option type="button" name="priority" id="sortButton3" onClick={() => {
                        handleSort("priority", "asc");
                    }}> Sort by Priority
                    </option>
                </div>


                <button onClick={toggleOrderDropdown} className="sortDropdown" id="order">Order
                    <i className="fa fa-caret-down"></i>
                </button>
            <div id="togglesort" className="dropdown-content">
                <option type="button" name="ascending" id="ascending" onClick={() => {
                    toggleSort("asc");
                }}> Ascending
                </option>

                <option type="button" name="descending" id="descending" onClick={() => {
                    toggleSort("desc");

                }}> Descending
                </option>

            </div>
            </div>
            <div class="deleteButtons">
                {checkIfOneSelected() ? <div class="deleteTask">
                    <button type="button" name="delete" id="delete" onClick={
                        () => {
                            props.onDeleteListItem(props.listId, selectedId);
                            setSelectedId(null);
                        }}> Delete Task
                    </button>
                </div> : null
                }
                {(!checkIfOneSelected()) && checkIfContainsCompleted() ? <div class="deleteAllButton">
                    <button type="button" id="deleteAll" onClick={
                        () => {
                            props.onDeleteAll(selectedId); // Is this what we want?
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