import ListItem from "./ListItem.js";
import './MyList.css';
import React, {useState, useRef} from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import ButtonBar from "./ButtonBar.js";


function MyLists(props) {
    const [selectedListId, setSelectedListId] = useState(0);
    const [listName, setListName] = useState("");
    const input = useRef(null);

    function handleAddList() {
        const newList = MyList{
            name: listName,
            id: generateUniqueID()
        }
        setNewList(newList);
        props.onListAdded(newItem.name, newItem.id);
        input.current.value = "";
    }

    const LoL = props.list.map(a =>
    <MyList
        onRowClick={(id) =>
            setSelectedId(id)}
        // onListItemFieldChanged={props.onListItemFieldChanged}
        listId={a.id === selectedListId}

        key={a.id}
        {...a} />);

    return (

        <div class="myLists">

        </div>


    );
}

export default MyLists;