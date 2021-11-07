import './App.css';
import firebase from "firebase/compat";
import MyList from './MyList';
import React from "react";
import { useState } from 'react';
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
const listCollection = db.collection(collectionName);
function App(props) {
    const query = listCollection;
    // create a state
    const [order, setOrder] = useState({sortField:"name",sortDirection:"asc"});
    //const query = listCollection;
    const[sortSelected, setSortSelected] = useState(false);
    const [value, loading, error] = useCollection(query.orderBy(order.sortField, order.sortDirection));

    let data = null;
    if (value !== undefined) {
        data = value.docs.map(doc =>
            doc.data());
    }

    function handleDeleteListItem(listItemId){
        listCollection.doc(listItemId).delete();
    }

    function handleItemAdded(item, newPriority) {
        const newItem = {
                id: generateUniqueID(),
                priority: newPriority,
                name: item,
                creationDate: firebase.database.ServerValue.TIMESTAMP, //changed from 00-00-00
                completed: false
            };
            listCollection.doc(newItem.id).set(newItem);
    }

    function handleDeleteAll() {
        let filterList = data.filter(listItem => listItem.completed);
        for (let i = 0; i < filterList.length; i ++) {
            handleDeleteListItem(filterList[i].id);
        }
    }

    function handleListItemFieldChanged(listItemId, field, value) {
        listCollection.doc(listItemId).update({
            [field]: value,
        });
    }

    function handleSort(name, direction) {
        setOrder({sortField: name, sortDirection: direction});
        setSortSelected(true);
    }

    function toggleSort(direction) {
        console.log(order.name);
        setOrder({sortField: order.sortField, sortDirection: direction});
    }

    return <div>
        {loading ? <div>Loading...</div> :
        <MyList list={data}
                onItemAdded={handleItemAdded}
                onDeleteListItem={handleDeleteListItem}
                onListItemFieldChanged={handleListItemFieldChanged}
                onDeleteAll={handleDeleteAll}
                onSort={handleSort}
                toggleSort={toggleSort}
        />}
        </div>;
    };

export default App;
