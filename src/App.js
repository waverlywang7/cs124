import logo from './logo.svg';
import './App.css';
import MyList from './MyList';
import React from "react";
import { useState } from 'react';


function App(props) {
    const [data, setData] = useState(props.initialList);

    function handleDeleteListItem(listItemId){
        setData(data.filter(listItem => listItem.id !==listItemId))
    }

    function handleItemAdded(item) {
        console.log("item" + item)
        setData([...data, item]);
    }

    function handleListItemFieldChanged(listItemId, field, value) {
        setData(data.map(
            listItem => listItem.id !==listItemId
                ? listItem
                : {...listItem, [field]: value}

            listItem =>

                value = true;
            }
        ))

    }


    return <div>
        <MyList list={data}
                onItemAdded={handleItemAdded}
                onDeleteListItem={handleDeleteListItem}
                onListItemFieldChanged={handleListItemFieldChanged}
        /></div>;
};


export default App;
