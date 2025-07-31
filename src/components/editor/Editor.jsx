import {useEditor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Toolbar from "../toolbar/Toolbar.jsx"
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import * as Y from 'yjs'
import {WebsocketProvider} from 'y-websocket'


import './Editor.css'

const ydoc = new Y.Doc()
const provider = new WebsocketProvider('wss://demos.yjs.dev', 'tiptap-collab-demo', ydoc)


let initialContent = '<p>Привет, мир! Это Tiptap ✨</p>'


export default function Editor(props, context) {

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                history: false, // важно: отключить встроенную историю, иначе конфликт
            }),
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
            Collaboration.configure({
                document: ydoc,
            }),
            CollaborationCursor.configure({
                provider: provider,
                user: {
                    name: 'Пользователь ' + Math.floor(Math.random() * 100),
                    color: '#' + Math.floor(Math.random() * 16777215).toString(16),
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

    // useEffect(() => {
    //     return () => {
    //         ydoc?.destroy();
    //         editor?.destroy();
    //     }
    // }, [])


    return (
        <div className="editor-container">
            <h1>📝 Мой Tiptap редактор</h1>
            <Toolbar editor={editor}/>
            <EditorContent editor={editor}/>
        </div>
    )
}