import ListItem from "./ListItem.js";
import React, {useState, useRef} from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import ButtonBar from "./ButtonBar.js";
import setData from "./App.js";
function MyList(props) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [newItem, setNewItem] = useState({name: "", id: 0, completed: false});
    const [selectedId, setSelectedId] = useState(null);
    const [showCompletedItems, setShowCompletedItems] = useState("All");
   // const [deleteAll, setDeleteAll] = useState(true);

    const input = useRef(null);

    function handleAdd() {
        console.log("INPUT value " + input.current.value);
        const newItem= {name:input.current.value, id:generateUniqueID(), completed:false}
        // var input = document.getElementById("myInput").value;
        setNewItem(newItem);
        props.onItemAdded(newItem);
        input.current.value = "";
        // data.push(input.current.value);
        // console.log(data);
    }

    function deleteAll(){
        props.onDeleteAll();
    }

    const listItemFilterMap = {
        All: () => true,
        Uncompleted: listItem => !listItem.completed,
        Completed: listItem => listItem.completed
    }

    const listItemFilterNames = Object.keys(listItemFilterMap);
    const buttonList = listItemFilterNames.map(name => (
        <ButtonBar
                   name={name}
                   aria-pressed={props.isPressed}
                   isPressed={name === showCompletedItems}
                   setShowCompletedItems={setShowCompletedItems}/>
    ))

    console.log(props)
    console.log(props.list)

    const tasks = props.list
        .filter(listItemFilterMap[showCompletedItems])
        .map(a=>
            <ListItem
                onToggleCompletedItems={toggleCompletedItems}
                onRowClick={(id) =>
                    setSelectedId(id)}
                onListItemFieldChanged={props.onListItemFieldChanged}
                selected={a.id === selectedId}
                key={a.id}
                name={a.name}
                completed={a.completed} //needed?
                {...a} />)

    function toggleCompletedItems(){
        // filter out completed items using setShowCompleted
        // display filtered list
        console.log("tasks ", props.list);
        let filteredList = props.list.filter(listItem => listItem.completed);
        console.log("filtered list ", filteredList);
        setShowCompletedItems(showCompletedItems);
        return filteredList;
    }

    return (

        <div>
            <h2> My List </h2>
            {buttonList}
            {/*<ButtonBar onToggleCompletedItems={() => setShowCompletedItems(!showCompletedItems)}> </ButtonBar>*/}
            {/*<ButtonBar onToggleCompletedItems={() => setShowCompletedItems(showCompletedItems)}> </ButtonBar>*/}
            {/*<button type="button" onClick={toggleCompletedItems}> Show Completed Tasks </button>*/}
            <br />
            <input type="text" ref={input} id="myInput" placeholder="I need to..."/>
            <div class="container">

                <button onClick={handleAdd}>Add</button>
                {selectedId && <div class="container3"> <button type="button" name= "delete" id= "delete" onClick={
                    () => {

                        props.onDeleteListItem(selectedId);
                        setSelectedId(null);
                    }}>
                    Delete Task
                </button>

                </div>
                }
            </div><br />
            <div> {tasks} </div>
            <div className="deleteAllButton">
                <button onClick={deleteAll}>Delete All Completed Tasks</button>
            </div>
            </div>);
            }
export default MyList;