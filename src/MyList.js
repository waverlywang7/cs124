import ListItem from "./ListItem.js";
import React, {useState, useRef} from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

function MyList(props) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [newItem, setNewItem] = useState({name: "", id: 0, completed: false});
    const [selectedId, setSelectedId] = useState(null);
    const [showCompletedItems, setShowCompletedItems] = useState(false);

    const input = useRef(null);

    function handleAdd() {
        console.log("INPUT value " + input.current.value);
        const newItem= {name:input.current.value, id:generateUniqueID(), completed:false}
        // var input = document.getElementById("myInput").value;
        setNewItem(newItem);
        props.onItemAdded(newItem);
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
            <button onClick={() => setShowCompletedItems(!showCompletedItems)}> Show Completed Tasks </button>
            <h3> Show Uncompleted Tasks </h3>
            <input type="text" ref={input} id="myInput" placeholder="I need to..."/>
            <button onClick={handleAdd}>Add</button>

            {props.list.map(a=> <ListItem
                onRowClick={(id) =>
                    setSelectedId(id)}
                onListItemFieldChanged={props.onListItemFieldChanged}
                selected={a.id === selectedId}
                key={a.id}
                onChecked={props.onChecked}
                {...a} />)}

            {selectedId && <button type="button" onClick={
                () => {
                    props.onDeleteListItem(selectedId);
                    setSelectedId(null);
                }}>
                Delete Task
            </button>}

            {/*<ul>*/}
            {/*    {props.list.map(e =>*/}
            {/*            <ul key = {e.id}>*/}
            {/*                <ListItem {...e}/>*/}
            {/*            </ul>*/}
            {/*        )}*/}
            {/*</ul>*/}
            {/*<div>*/}
            {/*    {props.list.map(element => <div>{element}</div>)}*/}
            {/*</div>*/}
            </div>);
            }
export default MyList;