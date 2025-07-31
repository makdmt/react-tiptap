import {useEditor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Toolbar from "../toolbar/Toolbar.jsx";


export default function Editor(props, context) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: '<p>Привет, мир! Это Tiptap на React + Vite ✨</p>',
        onUpdate: ({editor}) => {
            const json = editor.getJSON();
        }
    })

    // useEffect(() => {
    //     if (editor) {
    //         const saved = localStorage.getItem('editorContent')
    //         if (saved) {
    //             editor.commands.setContent(JSON.parse(saved))
    //         }
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