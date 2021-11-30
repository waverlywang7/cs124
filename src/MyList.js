import ListItem from "./ListItem.js";
import './MyList.css';
import React, {useState, useRef} from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import ButtonBar from "./ButtonBar.js";
import {useCollection} from "react-firebase-hooks/firestore";
import firebase from "firebase/compat";



const collectionName = "waverlywang7-listitems";


function MyList(props) {
    const collectionOfLists = props.db.collection(collectionName);
    const [newItem, setNewItem] = useState({name: "", id: 0, completed: false});
    const [selectedId, setSelectedId] = useState(null);
    const [showCompletedItems, setShowCompletedItems] = useState("All");
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
            <div role="group" alt="poopy"></div>
            <h2 id ="h2" role="heading" aria-level= "1" aria-label={props.name}> {props.name} </h2>

            {buttonList}
            <div class="inputbar">
                <input type="text" ref={input} id="myInput"
                       onChange={(e) => setInputNotEmpty(checkInput(e.target.value))}
                       placeholder="I need to..."/>

                {inputNotEmpty && <div id="prioritycontainer">
                    <text id="priorityText"> Priority</text>
                    <div className="dropdown"
                         aria-label = {' You are on the priority dropdown. You can choose low, medium or high' }>

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

            <div className="sortRadio">
                <label class = "radio-inline">
                <input type="radio" id="html" name="fav_language" value="HTML" onClick={() => handleSort("priority", "asc")}/>Sort By Priority</label>
                <label className="radio-inline">
                <input type="radio" id="css" name="fav_language" value="CSS" onClick={() => {handleSort("name", "asc")}}/>Sort By Name</label>
                    <label className="radio-inline">
                        <input type="radio" id="javascript" name="fav_language" value="JavaScript" onClick={() => {handleSort("creationDate", "asc")}}/>Sort By Creation Date</label>
            </div>

            <button class= "direction" onClick ={toggle0rder} id="order" aria-label={'Press this to Order by'+ directionString + 'You can toggle between ascending and descending'}>{directionString}</button>
            <br />
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