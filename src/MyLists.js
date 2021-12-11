import './MyList.css';
import './MyLists.css';
import React, {useState, useRef} from 'react';
import {useCollection} from "react-firebase-hooks/firestore";



const collectionName = "waverlywang7-listitems-AuthenticationRequired";


function MyLists(props) {
    const collectionOfLists = props.db.collection(collectionName);
    const [listName, setListName] = useState("");
    const listInput = useRef(null);
    const [value, loading, error] = useCollection(collectionOfLists.where("sharedWith","array-contains", props.user.email));


    let data = [];
    if (value !== undefined) {
        data = value.docs.map(doc =>
            doc.data());
    }


    const listOfButtons = data.map(list => (
        <button
            name={list.name} id = "listNameButton"
            onClick={(e) => props.setListIdAndName(list.id, list)}
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
                        <button type="button" name="add" id="add" onClick={()=> props.handleAddList(listName, listInput)}
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