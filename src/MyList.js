import ListItem from "./ListItem.js";
import React, {useState, useRef} from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

function MyList(props) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [newItem, setNewItem] = useState("");
    const [selectedId, setSelectedId] = useState(null);

    const input = useRef(null);

    function handleAdd() {
        const newItem= {name:input.current.value, id:generateUniqueID(), completed:false}
        console.log("handleAdd");
        // var input = document.getElementById("myInput").value;
        setNewItem([...newItem, {id: Math.floor(Math.random() * 1001)}])
        console.log(input.current.value);
        // data.push(input.current.value);
        // console.log(data);
    }

    // function handleUpdateData(id, field, newValue) {
    //     var newData = data.map( p => parseInt(p.id) === parseInt(id) ? {...p, [field]: [newValue]} : p);
    //     setNewItem(newData);
    // }
    console.log(props)
    console.log(props.list)
    return (
        <div>
            <h2> My List </h2>
            {/*{data.map(a => <listItem*/}
            {/*    onRowClick={(id) =>*/}
            {/*        setSelectedId(id)}*/}
            {/*    selected={a.id === selectedId}*/}
            {/*    onChange={(id, field, newValue) => handleUpdateData(id, field, newValue)}*/}
            {/*    key={a.id}*/}
            {/*    {...a} />)}*/}
            <h3> Show Completed Tasks </h3>
            <h3> Show Uncompleted Tasks </h3>
            <input type="text" ref={input} id="myInput" placeholder="I need to..."/>
            <button onClick={handleAdd}>Add</button>
            <ul>
                {props.list.map(e =>
                        <li key = "{e}"> <ListItem {...e}/></li>
                    )}
            </ul>
            </div>);
            }
export default MyList;