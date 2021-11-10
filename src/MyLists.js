import ListItem from "./ListItem.js";
import MyList from "./MyList.js";
import './MyList.css';
import React, {useState, useRef} from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import ButtonBar from "./ButtonBar.js";


function MyLists(props) {
    const [selectedListId, setSelectedListId] = useState(0);
    const [listName, setListName] = useState("");
    const listInput = useRef(null);

    function handleAddList() {
        const newList = {
            name: listName,
            id: generateUniqueID()
        }

        props.onListAdded(newList.name, newList.id);
        listInput.current.value = "";
    }


    function createListOfLists(){

    }

    console.log(props.list);
    const LoL = props.list.map(a =>
    <MyList list={props.list}
            name={listName}
        onItemAdded={props.onItemAdded}
        onDeleteListItem={props.onDeleteListItem}
        onListItemFieldChanged={props.onListItemFieldChanged}
        onDeleteAll={props.onDeleteAll}
        onSort={props.onSort}
        toggleSort={props.toggleSort}
        onListAdded={props.onListAdded}
        onRowClick={(id) =>
            setSelectedListId(id)}
        // onListItemFieldChanged={props.onListItemFieldChanged}
        listId={a.id === selectedListId}
        key={a.id}
        {...a} />);

    return (

        <div class="myLists">
            <h2> MY LISTS </h2>

    <div className="inputbar">
        <input type="text" ref={listInput} id="myListInput"
               onChange={(e) => setListName(e.target.value)}
               placeholder="Name your list"/>

        <div className="addList">
            <button type="button" name="add" id="add" onClick={handleAddList}
            >Create New List
            </button>
        </div>
    </div>
            <div className="LoL"> {LoL} </div>

        </div>

    );
}

export default MyLists;