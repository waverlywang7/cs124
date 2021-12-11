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
import {getDoc} from "firebase/firestore";


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
    const collectionOfLists = db.collection(collectionName);
    const [user, loading, error] = useAuthState(auth);

    function verifyEmail() {
        auth.currentUser.sendEmailVerification();
    }

    if (loading) {
        return <p>Checking...</p>;
    } else if (user) {
        return <div id="signin">
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


function SignIn() {
    const emailInput = useState(null);
    const passwordInput = useState(null);
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
               ref={emailInput}
               placeholder="Email"/>
        <input type="text" id="myInput"
               ref={passwordInput}
               placeholder="Password"/>
        <button onClick={() =>
            signInWithEmailAndPassword(emailInput.current.value, passwordInput.current.value)}>Login with Email/PW
        </button>
        <button onClick={() =>
            auth.signInWithPopup(googleProvider)}>Login with Google
        </button>
    </div>
}

function SignUp() {
    const emailInput = useState(null);
    const passwordInput = useState(null);
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
        <input type="text" id="myInput"
               ref={emailInput}
               placeholder="Email"/>
        <input type="text" id="myInput"
               ref={passwordInput}
               placeholder="Password"/>
        <button onClick={() =>
            createUserWithEmailAndPassword(emailInput.current.value, passwordInput.current.value)}>
             Create test user
        </button>

    </div>
}



function SignedInApp(props) {
    const collectionOfLists = db.collection(collectionName);

    const [selectedListId, setSelectedListId] = useState(null);
    const [currentListName, setCurrentListName] = useState(null);
    const [value, loading, error] = useCollection(collectionOfLists) // let MyList and myLists handle

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



    function handleItemAdded(item, newPriority, listId) {
        const newItem = {
            id: generateUniqueID(),
            priority: newPriority,
            name: item,
            creationDate: firebase.database.ServerValue.TIMESTAMP, //changed from 00-00-00
            completed: false
        };

        collectionOfLists.doc(listId).collection("tasks").doc(newItem.id).set(newItem);
    }

    function handleListItemFieldChanged(listId, listItemId, field, value) {
        console.log("field", field);
        console.log("value", value);
        collectionOfLists.doc(listId).collection("tasks").doc(listItemId).update({
            [field]: value,
        });
    }

    async function handleDeleteList(listId) {
        const docSnapshot = await getDoc(collectionOfLists.doc(props.listId));
        if (collectionOfLists.doc(listId).data().owner != props.user.uid){
            console.log("you cannot delete a list because you are not the owner")
        } else{
            collectionOfLists.doc(listId).delete();
        }

    }

    function setListIdAndName(id, list) {
        setSelectedListId(id);
        setCurrentListName(list.name);
        console.log(selectedListId, "selectedListId");
    }

    function returnHome() {
        setSelectedListId(null);
        setCurrentListName(null);
    }
    function handleAddList(listName, listInput) {
        const newList = {
            name: listName,
            id: generateUniqueID(),
            owner: props.user.uid,
            email: props.user.email,
            sharedWith: [props.user.email]
        }
        console.log(newList.sharedWith,"sharedWith");
        collectionOfLists.doc(newList.id).set(newList);
        listInput.current.value = "";
    }



    return <div>
        {loading && <h1>Loading</h1>}
        {selectedListId ? <MyList
                user={props.user}
                db={db}
                name={currentListName}
                sharedWith = {handleAddList.sharedWith}
                listId={selectedListId}
                returnHome={returnHome}
                onListDeleted={handleDeleteList}
                onItemAdded={handleItemAdded}
                onListItemFieldChanged={handleListItemFieldChanged}
                handleAddList={handleAddList}
            /> :
            <MyLists
                user={props.user}
                db={db}
                setListIdAndName={setListIdAndName}
                handleAddList={handleAddList}
                sharedWith = {handleAddList.sharedWith}
                list={data}
                // onListAdded={handleAddList}
            />
        }
    </div>;
};

export default App;
