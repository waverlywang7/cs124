import ListItem from "./ListItem.js";
import React, {useState, useRef} from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import setData from "./App.js";
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

    function toggleListItemCompleted(id){
        console.log(props.list[0]);
        const updatedMyList = props.list.map(a => {
            if (id == a.id) {
                return {...a, completed: !a.completed}
            }
            return a;
            setNewItem(updatedMyList);
        });

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
            <button> Show Uncompleted Tasks </button>
            <br />
            <input type="text" ref={input} id="myInput" placeholder="I need to..."/>
            <div class="container">
                <button onClick={handleAdd}>Add</button>
                {selectedId && <button type="button" onClick={
                    () => {
                        props.onDeleteListItem(selectedId);
                        setSelectedId(null);
                    }}>
                    Delete Task
                </button>
                }
            </div><br />


            {props.list.map(a=>
                <ListItem
                onRowClick={(id) =>
                    setSelectedId(id)}
                onListItemFieldChanged={props.onListItemFieldChanged}
                selected={a.id === selectedId}
                key={a.id}
                name={a.name}
                toggleListItemCompleted={toggleListItemCompleted}
                completed={a.completed} //needed?
                {...a} />)}

            </div>);
            }
export default MyList;