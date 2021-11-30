import './App.css';
import firebase from "firebase/compat";
import MyList from './MyList';
import MyLists from './MyLists';
import React from "react";
import {useState} from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import './ListItem.js'
import {useCollection} from "react-firebase-hooks/firestore";
import {
    useAuthState,
    useCreateUserWithEmailAndPassword,
    useSignInWithEmailAndPassword
} from 'react-firebase-hooks/auth';


const firebaseConfig = {
    apiKey: "AIzaSyC5fXtmZ_AgxF6iO2tyLVbZGSLAkvSqpAQ",
    authDomain: "cs124lab5waverlyria.firebaseapp.com",
    projectId: "cs124lab5waverlyria",
    storageBucket: "cs124lab5waverlyria.appspot.com",
    messagingSenderId: "1050666858786",
    appId: "1:1050666858786:web:7cbb73999edafbcbbfcd7b",
    measurementId: "G-0BBJ256RS9"
};
console.log("before initialize")
firebase.initializeApp(firebaseConfig);
console.log("after initialize")
const db = firebase.firestore();

const collectionName = "waverlywang7-listitems";
const collectionOfLists = db.collection(collectionName);
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

function App(props) {
    const [selectedListId, setSelectedListId] = useState(null);
    const [currentListName, setCurrentListName] = useState(null);
    const [value, loading, error] = useCollection(collectionOfLists); // let MyList and myLists handle
    // const [user, loading, error] = useAuthState(auth);
    //
    // function verifyEmail() {
    //     auth.currentUser.sendEmailVerification();
    // }

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

    // return <div>
    //     {selectedListId ? <MyList
    //             name={currentListName}
    //             listId={selectedListId}
    //             returnHome={returnHome}
    //             onListDeleted={handleDeleteList}
    //             onItemAdded={handleItemAdded}
    //             onListItemFieldChanged={handleListItemFieldChanged}
    //         /> :
    //         <MyLists
    //             setListIdAndName={setListIdAndName}
    //             list={data}
    //             onListAdded={handleAddList}
    //         />
    //     }
    // </div>;
// };
//
//
//
// function SignUp() {
//     const [
//         createUserWithEmailAndPassword,
//         userCredential, loading, error
//     ] = useCreateUserWithEmailAndPassword(auth);
//
//     if (userCredential) {
//         // Shouldn't happen because App should see that
//         // we are signed in.
//         return <div>Unexpectedly signed in already</div>
//     } else if (loading) {
//         return <p>Signing up…</p>
//     }
//     return <div>
//         {error && <p>"Error signing up: " {error.message}</p>}
//         <button onClick={() =>
//             createUserWithEmailAndPassword(FAKE_EMAIL, FAKE_PASSWORD)}>
//             Create test user
//         </button>
//
//     </div>
// }
//
// const FAKE_EMAIL = 'foo@bar.com';
// const FAKE_PASSWORD = 'xyzzyxx';
//
// function SignIn() {
//     const [
//         signInWithEmailAndPassword,
//         userCredential, loading, error
//     ] = useSignInWithEmailAndPassword(auth);
//
//     if (userCredential) {
//         // Shouldn't happen because App should see that
//         // we are signed in.
//         return <div>Unexpectedly signed in already</div>
//     } else if (loading) {
//         return <p>Logging in…</p>
//     }
//     return <div>
//         {error && <p>"Error logging in: " {error.message}</p>}
//         <button onClick={() =>
//             signInWithEmailAndPassword(FAKE_EMAIL, FAKE_PASSWORD)}>Login with test user Email/PW
//         </button>
//         <button onClick={() =>
//             auth.signInWithPopup(googleProvider)}>Login with Google
//         </button>
//     </div>
// }
//
// function SignedInApp(props) {
//

    return <div>
        {selectedListId ? <MyList
                db={db}
                name={currentListName}
                listId={selectedListId}
                returnHome={returnHome}
                onListDeleted={handleDeleteList}
                onItemAdded={handleItemAdded}
                onListItemFieldChanged={handleListItemFieldChanged}
            /> :
            <MyLists
                db={db}
                setListIdAndName={setListIdAndName}
                list={data}
                onListAdded={handleAddList}
            />
        }
    </div>;
};

export default App;
