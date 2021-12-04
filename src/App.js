import './App.css';
import firebase from "firebase/compat";
import MyList from './MyList';
import MyLists from './MyLists';
import React from "react";
import {useState} from 'react';
import TabList from './TabList';
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

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

const collectionName = "waverlywang7-listitems-AuthenticationRequired";

function App(props) {

    const [user, loading, error] = useAuthState(auth);

    function verifyEmail() {
        auth.currentUser.sendEmailVerification();
    }

    if (loading) {
        return <p>Checking...</p>;
    } else if (user) {
        return <div>
            {user.displayName || user.email}
            <SignedInApp {...props} user={user}/>
            <button type="button" onClick={() => auth.signOut()}>Logout</button>
            {!user.emailVerified && <button type="button" onClick={verifyEmail}>Verify email</button>}
        </div>
    } else {
        return <>
            {error && <p>Error App: {error.message}</p>}
            <TabList>
            <SignIn key="Sign In"/>
            <SignUp key="Sign Up"/>
            </TabList>

        </>
    }

};

const FAKE_EMAIL = 'foo@bar.com';
const FAKE_PASSWORD = 'xyzzyxx';

function SignIn() {
    const [
        signInWithEmailAndPassword,
        userCredential, loading, error
    ] = useSignInWithEmailAndPassword(auth);

    if (userCredential) {
        // Shouldn't happen because App should see that
        // we are signed in.
        return <div>Unexpectedly signed in already</div>
    } else if (loading) {
        return <p>Logging in…</p>
    }
    return <div>
        {error && <p>"Error logging in: " {error.message}</p>}
        {/*//NOTE: i added these but maybe we should have these a little separate from the Google login... or only show up once you click sign in?*/}
        <input type="text" id="myInput"
               placeholder="Email"/>
        <input type="text" id="myInput"
               placeholder="Password"/>
        <button onClick={() =>
            signInWithEmailAndPassword(FAKE_EMAIL, FAKE_PASSWORD)}>Login with test user Email/PW
        </button>
        <button onClick={() =>
            auth.signInWithPopup(googleProvider)}>Login with Google
        </button>
    </div>
}

function SignUp() {
    const [
        createUserWithEmailAndPassword,
        userCredential, loading, error
    ] = useCreateUserWithEmailAndPassword(auth);

    if (userCredential) {
        // Shouldn't happen because App should see that
        // we are signed in.
        return <div>Unexpectedly signed in already</div>
    } else if (loading) {
        return <p>Signing up…</p>
    }
    return <div>
        {error && <p>"Error signing up: " {error.message}</p>}
        <button onClick={() =>
            createUserWithEmailAndPassword(FAKE_EMAIL, FAKE_PASSWORD)}>
            Create test user
        </button>

    </div>
}



function SignedInApp(props) {
    const collectionOfLists = db.collection(collectionName);

    const [selectedListId, setSelectedListId] = useState(null);
    const [currentListName, setCurrentListName] = useState(null);
    const [value, loading, error] = useCollection(collectionOfLists); // let MyList and myLists handle

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

    return <div>
        {loading && <h1>Loading</h1>}
        {data && selectedListId ? <MyList
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
