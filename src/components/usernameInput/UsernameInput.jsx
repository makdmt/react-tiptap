import {useState} from "react";
import TextInput from "../textInput/TextInput.jsx";

import styles from './UsernameInput.module.css';

export default function UsernameInput({setUsername}) {
    const [value, onChange] = useState();

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setUsername(value);
        }
    };

    return (
        <div className={styles.usernameInputContainer}>
            <TextInput label={'Ваше имя: '} onChange={onChange} onKeyDown={handleKeyDown} value={value}/>
            <button onClick={() => setUsername(value)}>Войти</button>
        </div>
    )
}