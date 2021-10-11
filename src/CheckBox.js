import './App.js';
import './MyList.js';
import React from 'react';
export const CheckBox = props => {
    return (
        <li>
            <input key={props.id}
                   onChange={() => props.handleChecked(props.id)}
                   type="checkbox"
                   id={props.id}
                   checked ={props.checked}/>
        </li>
    )
}
export default CheckBox;