import {useEditor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Toolbar from "../toolbar/Toolbar.jsx";
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import './Editor.css'

let initialContent = '<p>Привет, мир! Это Tiptap ✨</p>'


export default function Editor(props, context) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ['heading', 'paragraph', 'listItem']
            }),
            Link.configure({
                openOnClick: false,      // чтобы клик не уводил фокус из редактора
                autolink: true,          // автодобавление ссылок при наборе
                linkOnPaste: true,       // превращать вставленные URL в ссылку
                HTMLAttributes: {
                    target: '_blank',
                    rel: 'noopener noreferrer nofollow',
                },
                validate: href => {
                    try {
                        const u = new URL(/^(https?:)?\/\//i.test(href) ? href : `https://${href}`)
                        return !!u.hostname
                    } catch {
                        return false
                    }
                },
            }),
        ],
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