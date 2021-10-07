import logo from './logo.svg';
import './App.css';
import MyList from './MyList';
import React from "react";
import { useState } from 'react';
//
// function createInputBar() {
//     var x = document.createElement("INPUT");
//     x.setAttribute("type", "text");
//     x.setAttribute("value", "What do you want to do?...");
// }

function App(props) {
    const [data, setData] = useState(props.initialList);
    function handleItemAdded(item) {
        setData([...data, item]);
    }
    return <div>
        <MyList list={data} onItemAdded={handleItemAdded} /></div>; // onAddChange
};


export default App;
