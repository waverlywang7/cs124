import ListItem from "./ListItem.js";
import './MyList.css';
import React, {useState, useRef} from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import ButtonBar from "./ButtonBar.js";
import {useCollection} from "react-firebase-hooks/firestore";
import {getDoc} from "firebase/firestore";
import firebase from "firebase/compat";


const collectionName = "waverlywang7-listitems-AuthenticationRequired";


function MyList(props) {
    const collectionOfLists = props.db.collection(collectionName);
    const [newItem, setNewItem] = useState({name: "", id: 0, completed: false});
    const [selectedId, setSelectedId] = useState(null);
    const [showCompletedItems, setShowCompletedItems] = useState("All");
    const input = useState(null);
    const eInput = useState(null);
    const rInput = useState(null);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [sharedList, setSharedList] = useState("");
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
    // const listOfShared = data.map(list => (
    //     <button
    //         name={list.sharedWith} id = "listNameButton"
    //         // onClick={(e) => props.setListIdAndName(list.id, list)}
    //     >{list.sharedWith}</button>
    //
    // ))

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

    async function handleUnshareList(email) {
        const docSnapshot = await getDoc(collectionOfLists.doc(props.listId));
        if (props.user.uid != docSnapshot.data().owner) {
            console.log("You do not have permission to do this.");
        } else {
            if (docSnapshot.exists()) {
                if (props.user.email === email.current.value) {
                    console.log("You are the owner, you can't remove yourself.")
                } else {
                    let unshareEmail = docSnapshot.data().sharedWith
                    const newsharedEmails = unshareEmail.filter((oneEmail) => oneEmail != email.current.value)
                    console.log("unsharedEmail", newsharedEmails)
                    // docSnapshot.update({sharedWith: firebase.firestore.FieldValue.arrayRemove(email)})
                    await collectionOfLists.doc(props.listId).update({
                        sharedWith: newsharedEmails
                    })
                    setSharedList(docSnapshot.data().sharedWith)
                }
            } else {
                console.log("No document exists");
            }
        }
    }

    async function handleShareList(email) {
        // console.log("props.sharedWith", collectionOfLists.doc(props.listId).sharedWith);
        // collectionOfLists.doc(props.listId).update({
        //     sharedWith: firebase.firestore.FieldValue.arrayUnion(eInput.current.value)
        // })
        const docSnapshot = await getDoc(collectionOfLists.doc(props.listId));
        if (props.user.uid != docSnapshot.data().owner) {
            // return <div>"You don't have permission to share because you are not the owner"</div>
            console.log("You don't have permission to share because you are not the owner");
        } else {
            if (docSnapshot.exists()) {
                // for (let i = 0; i < docSnapshot.data().sharedWith.length; i++) {
                    console.log("email.current.value", email.current.value)
                    if (props.user.email === email.current.value) {
                        console.log("You already have access to the list");
                    } else {
                        await collectionOfLists.doc(props.listId).update({
                            sharedWith: [...docSnapshot.data().sharedWith, email.current.value]
                        })
                        setSharedList(docSnapshot.data().sharedWith.map(listName => listName + ",     " ))
                        console.log("Shared with:", docSnapshot.data().sharedWith, "sharedList", sharedList);
                    }
                // }

            } else {

                console.log("No document exists");
            }

        }
    }

//     async function listOfShared {
//         const list = await getDoc(collectionOfLists.doc(props.listId)).data().sharedWith;
//
//     return {
//     <div>{list}</div>
// }
// }


    function toggle0rder() {
        if (order.sortDirection === "asc") {
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
                <div className="shareButton">
                    <button type="button" name="shareList" id="shareList"
                            onClick={() => setButtonClicked(!buttonClicked)}
                    >Sharing
                    </button>
                    {buttonClicked && <div className="emailSubmit">
                        <input type="text" ref={eInput} id="shareEmail"
                               placeholder="Enter email to add"/>
                        <button type="button" name="submit" id="submit" onClick={() => handleShareList(eInput)}> Share
                            List
                        </button>
                        <input type="text" ref={rInput} id="unshareEmail"
                               placeholder="Enter email you want to remove"/>
                        <button type="button" name="unshareEmail" id="unshareEmail"
                                onClick={() => handleUnshareList(rInput)}> Unshare List
                        </button>
                    </div>}
                </div>
            </div>

            <div id = "sharedList"> <h4> Shared with: {sharedList} </h4></div>

            <h2 id="h2" role="heading" aria-level="1" aria-label={props.name}> {props.name} </h2>

            {buttonList}

            <div class="inputbar">
                <input type="text" ref={input} id="myInput"
                       onChange={(e) => setInputNotEmpty(checkInput(e.target.value))}
                       placeholder="I need to..."/>

                {inputNotEmpty && <div id="prioritycontainer">
                    <text id="priorityText"> Priority</text>
                    <div className="dropdown"
                         aria-label={' You are on the priority dropdown. You can choose low, medium or high'}>

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
                <label class="radio-inline">
                    <input type="radio" id="html" name="fav_language" value="HTML"
                           onClick={() => handleSort("priority", "asc")}/>Sort By Priority</label>
                <label className="radio-inline">
                    <input type="radio" id="css" name="fav_language" value="CSS" onClick={() => {
                        handleSort("name", "asc")
                    }}/>Sort By Name</label>
                <label className="radio-inline">
                    <input type="radio" id="javascript" name="fav_language" value="JavaScript" onClick={() => {
                        handleSort("creationDate", "asc")
                    }}/>Sort By Creation Date</label>
            </div>

            <button class="direction" onClick={toggle0rder} id="order"
                    aria-label={'Press this to Order by' + directionString + 'You can toggle between ascending and descending'}>{directionString}</button>
            <br/>
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