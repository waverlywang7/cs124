import './App.css';
import firebase from "firebase/compat";
import MyList from './MyList';
import React from "react";
import { useState } from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import './ListItem.js'
import {useCollection} from "react-firebase-hooks/firestore";
import {orderByValue} from "react-firebase-hooks/firestore";
import {query} from "firebase/firestore";

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
    // query = listCollection.orderBy("name", "asc");
    const query = listCollection;
    // create a state
    const [order, setOrder] = useState({sortField:"name",sortDirection:"asc"});
    //const query = listCollection;
    //if (order) {

    //}
    const [value, loading, error] = useCollection(query.orderBy(order.sortField, order.sortDirection));
    // const [creationDateAscending, setCreationDateAscending] = useState(false);
    // const [priorityAscending, setPriorityAscending] = useState(false);
    // const [nameAscending, setNameAscending] = useState(false);
    let data = null;
    if (value !== undefined) {
        data = value.docs.map(doc =>
            doc.data());
    }


    function handleDeleteListItem(listItemId){
        // setData(data.filter(listItem => listItem.id !==listItemId))
        listCollection.doc(listItemId).delete();
    }

    function handleItemAdded(item) {
        //var uid =
        const newItem = {
                id: generateUniqueID(),
                priority: "low",
                name: item,
                creationDate: firebase.database.ServerValue.TIMESTAMP, //changed from 00-00-00
                completed: false
            };
            listCollection.doc(newItem.id).set(newItem);

        // const [value, loading, error] = useCollection(query);
        // setData([...data, item]);
    }

    function handleDeleteAll() {
        let filterList = data.filter(listItem => listItem.completed);
        for (let i = 0; i < filterList.length; i ++) {
            handleDeleteListItem(filterList[i].id);
        }
        // setData(filteredList);
    }

    function handleListItemFieldChanged(listItemId, field, value) {
        listCollection.doc(listItemId).update({
            [field]: value,
        });
    }

    function handleSort(name, direction) {
        setOrder({sortField: name, sortDirection: direction});
    }
        //  setData(data.map(
        //     listItem => listItem.id !==listItemId
        //         ? listItem
        //         : {...listItem, [field]: value},
        // ))


    return <div>
        {loading ? <div>Loading...</div> :
        <MyList list={data}
                onItemAdded={handleItemAdded}
                onDeleteListItem={handleDeleteListItem}
                onListItemFieldChanged={handleListItemFieldChanged}
                onDeleteAll={handleDeleteAll}
                onSort={handleSort}
        />}
        </div>;
    };

export default App;
