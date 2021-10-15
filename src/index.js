import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
const initialData = [];
<<<<<<< HEAD

// { name: "",
//     id: generateUniqueID(),
//     completed: false}
;
=======
>>>>>>> 21b8d3de6c5542daebe46cb796f6d1add36411be

ReactDOM.render(
    <React.StrictMode>
     <App initialList={initialData}/>
     </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
