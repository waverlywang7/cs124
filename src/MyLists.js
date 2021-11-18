import ListItem from "./ListItem.js";
import MyList from "./MyList.js";
import './MyList.css';
import './MyLists.css';
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

function MyLists(props) {
    // const [selectedListId, setSelectedListId] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [listName, setListName] = useState("");
    const listInput = useRef(null);
    const [value, loading, error] = useCollection(collectionOfLists);

    let data = [];
    if (value !== undefined) {
        data = value.docs.map(doc =>
            doc.data());
    }

    function handleAddList() {
        const newList = {
            name: listName,
            id: generateUniqueID()
        }
        props.onListAdded(newList.name, newList.id);
        listInput.current.value = "";
    }



    const listOfButtons = data.map(list => (
        <button
            name={list.name}
            onClick={(e)=> props.onClickWrapper(list.id, list.name)}
        >{list.name}</button>
    ))

    return (
    <div>{loading ? <div>Loading...</div> :
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
            <div className="LoL"> {listOfButtons} </div>
        </div>
    }</div>
    );
}

export default MyLists;