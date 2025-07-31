import './App.css'
import Editor from "./components/editor/Editor.jsx";
import TextInput from "./components/textInput/TextInput.jsx";
import {useState} from "react";
import UsernameInput from "./components/usernameInput/UsernameInput.jsx";

function App() {
    const [username, setUsername] = useState();

    return (
        <>
            {!username && <UsernameInput setUsername={setUsername}/>}
            {!!username && <Editor username={username}/>}
        </>
    )
}

export default App
