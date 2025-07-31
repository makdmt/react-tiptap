import {useEditor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Toolbar from "../toolbar/Toolbar.jsx";
import './Editor.css'

let initialContent = '<p>Привет, мир! Это Tiptap ✨</p>'


export default function Editor(props, context) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: initialContent,
        onUpdate: ({editor}) => {
            const json = editor.getJSON();
        }
    })

    // useEffect(() => {
    //     if (editor) {
    //
    //         const saved = localStorage.getItem('editorContent');
    //
    //         if (saved) {
    //             try {
    //                 initialContent = raw ? JSON.parse(raw) : initialContent
    //             } catch {
    //                 // если в localStorage лежит HTML-строка, оставим initialContent по умолчанию
    //             }
    //         }
    //
    //     }
    // }, [editor])


    return (
        <div className="editor-container">
            <h1>📝 Мой Tiptap редактор</h1>
            <Toolbar editor={editor}/>
            <EditorContent editor={editor}/>
        </div>
    )
}