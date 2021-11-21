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

    // const [inputName, setInputName] = useState("");
    const input = useState(null);
    const pInput = useState(null);
    const [order, setOrder] = useState({sortField: "name", sortDirection: "asc"});
    const [sortSelected, setSortSelected] = useState(false);
    const [inputNotEmpty, setInputNotEmpty] = useState(false);
    const [value, loading, error] = useCollection(collectionOfLists.doc(props.listId).collection("tasks").orderBy(order.sortField, order.sortDirection));
    const [directionString, setDirectionString] = useState("Descending");
    let data = [];
    if (value !== undefined) {
        data = value.docs.map(doc =>
            doc.data());
    }

    function handleSort(name, direction) {
        setOrder({sortField: name, sortDirection: direction});
        setSortSelected(true);
    }

    // uses database to handle deleting an item
    function handleDeleteListItem(listId, listItemId) {
        collectionOfLists.doc(listId).collection("tasks").doc(listItemId).delete();
    }

    function handleDeleteAll() {
        console.log("data", data);
        const completedItems = data.filter(listItem => listItem.completed);

        console.log("completedItems", completedItems);
        for (let i = 0; i < completedItems.length; i++) {
            handleDeleteListItem(props.listId, completedItems[i].id);
        }
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
        setInputNotEmpty(false);
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

    const filteredList = data.filter(listItemFilterMap[showCompletedItems]);

    const tasks = filteredList
        .map(a =>
            <ListItem
                listId={props.listId}
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
        const completedItems = data.filter(listItem => listItem.completed);
        return completedItems.length > 0;
    }

    function checkIfOneSelected() {
        const completedItems = data.filter(listItem => listItem.completed);
        return completedItems.length === 1;
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


    function toggle0rder(){
        if (order.sortDirection === "asc"){
            setOrder({sortField: order.sortField, sortDirection: "desc"});
            setDirectionString("Descending");
        } else {
            setOrder({sortField: order.sortField, sortDirection: "asc"});
            setDirectionString("Ascending");
        }
    }

    return (

        <div class="myList">
            <div className="topRowButtons">
                <button type="button" name="delete" id="deleteList" onClick={() => props.onListDeleted(props.listId)}
                >Delete List
                </button>
                <button type="button" name="Home" id="home" onClick={props.returnHome}> Return Home</button>
            </div>

            <h2> {props.name} </h2>

            {buttonList}
            <div class="inputbar">
                <input type="text" ref={input} id="myInput"
                       onChange={(e) => setInputNotEmpty(checkInput(e.target.value))}
                       placeholder="I need to..."/>

                {inputNotEmpty && <div id="prioritycontainer">
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


                {inputNotEmpty && <div class="addTask">
                    <button type="button" name="add" id="add" onClick={handleAdd}
                    >Add Task
                    </button>
                </div>
                }
            </div>

            <div className="itemDropdown">
                <p>Sort by: </p>
                <select name="Priority"
                        id="priorityInput">
                    <option value="name" id="sortButton1" onChange={() => {
                        handleSort("name", "asc");
                    }}> Name </option>

                    <option value="creationdate" id="sortButton2" onChange={() => {
                        handleSort("creationDate", "asc");

                    }}> Creation Date </option>

                    <option value="priority" id="sortButton3" onChange={() => {
                        handleSort("priority", "asc");}}> Priority </option>
                </select>
            </div>

            {/*<div className="itemDropdown">*/}
            {/*    /!*<button onClick={toggleDropdown} className="sortDropdown" id="sort">Sort*!/*/}
            {/*    /!*    <i class="fa fa-caret-down"></i>*!/*/}
            {/*    /!*</button>*!/*/}
            {/*    <select name="sortdrop"*/}
            {/*            id="sort"*/}
            {/*            >Sort</select>*/}
            {/*    /!*<div id="myDropdown" className="dropdown-content">*!/*/}
            {/*        <option value="name" name="sortbyname" id="sortButton1" onClick={() => {*/}
            {/*            handleSort("name", "asc");*/}
            {/*        }}> Sort by Name*/}
            {/*        </option>*/}

            {/*        <option value="creationdate" name="sortbycreationdate" id="sortButton2" onClick={() => {*/}
            {/*            handleSort("creationDate", "asc");*/}

            {/*        }}> Sort by Creation Date*/}
            {/*        </option>*/}
            {/*        <option value="priority" name="sortbypriority" id="sortButton3" onClick={() => {*/}
            {/*            handleSort("priority", "asc");*/}
            {/*        }}> Sort by Priority*/}
            {/*        </option>*/}
            {/*    */}


            {/*</div>*/}
            <button onClick ={toggle0rder} id="order" >{directionString}</button>

            <div class="deleteButtons">
                {checkIfOneSelected() ? <div class="deleteTask">
                    <button type="button" name="delete" id="delete" onClick={
                        () => {
                            handleDeleteListItem(props.listId, selectedId);
                            setSelectedId(null);
                        }}> Delete Task
                    </button>
                </div> : null
                }
                {(!checkIfOneSelected()) && checkIfContainsCompleted() ? <div class="deleteAllButton">
                    <button type="button" id="deleteAll" onClick={
                        () => {
                            handleDeleteAll();
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