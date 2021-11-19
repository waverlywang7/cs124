import './App.css';
import firebase from "firebase/compat";
import MyList from './MyList';
import MyLists from './MyLists';
import React from "react";
import {useState} from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import './ListItem.js'
import {useCollection} from "react-firebase-hooks/firestore";


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

function App(props) {
    const [selectedListId, setSelectedListId] = useState(null);
    const [currentListName, setCurrentListName] = useState(null);
    const [value, loading, error] = useCollection(collectionOfLists); // let MyList and myLists handle

    let data = null;
    if (value !== undefined) {
        data = value.docs.map(doc =>
            doc.data());
        if (selectedListId !== null && (!data.find(function (element) {
            return element.id === selectedListId;
        }))) {
            setSelectedListId(null);
        }
    }


    function handleAddList(listName, listId) {
        const newList = {
            id: listId,
            name: listName
        }
        collectionOfLists.doc(listId).set(newList);

    }


    function handleItemAdded(item, newPriority, listId) {
        const newItem = {
            id: generateUniqueID(),
            priority: newPriority,
            name: item,
            creationDate: firebase.database.ServerValue.TIMESTAMP, //changed from 00-00-00
            completed: false
        };

        console.log("add item", newItem);
        collectionOfLists.doc(listId).collection("tasks").doc(newItem.id).set(newItem);
    }



    function handleListItemFieldChanged(listId, listItemId, field, value) {
        console.log("field", field);
        console.log("value", value);
        collectionOfLists.doc(listId).collection("tasks").doc(listItemId).update({
            [field]: value,
        });
    }

    function handleDeleteList(listId) {
        collectionOfLists.doc(listId).delete();
    }

    function setListIdAndName(id, name) {
        setSelectedListId(id);
        setCurrentListName(name);
    }

    function returnHome() {
        setSelectedListId(null);
        setCurrentListName(null);
    }

    return <div>
        {selectedListId ? <MyList
                name={currentListName}
                listId={selectedListId}
                returnHome={returnHome}
                onListDeleted={handleDeleteList}
                onItemAdded={handleItemAdded}
                // onDeleteListItem={handleDeleteListItem}
                onListItemFieldChanged={handleListItemFieldChanged}
                // onDeleteAll={handleDeleteAll}
            /> :
            <MyLists
                // selectedListId={selectedListId}
                setListIdAndName={setListIdAndName}
                list={data}
                onListAdded={handleAddList}

            />

        }
    </div>;
};

export default App;
