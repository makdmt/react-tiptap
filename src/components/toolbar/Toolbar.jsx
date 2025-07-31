import './Toolbar.css'
import {useState, useEffect} from "react";

export default function Toolbar({editor}) {

    const [, forceUpdate] = useState(0)

    useEffect(() => {
        if (!editor) return
        const rerender = () => forceUpdate(x => x + 1)

        editor.on('selectionUpdate', rerender)
        // editor.on('transaction', rerender)
        // editor.on('update', rerender)
        // editor.on('focus', rerender)
        // editor.on('blur', rerender)

        return () => {
            editor.off('selectionUpdate', rerender)
            // editor.off('transaction', rerender)
            // editor.off('update', rerender)
            // editor.off('focus', rerender)
            // editor.off('blur', rerender)
        }
    }, [editor])


    if (!editor) {
        return null
    }

    return (
        <div className="menu-bar">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'is-active' : ''}
            >
                Bold
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'is-active' : ''}
            >
                Italic
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
                className={editor.isActive('heading', {level: 1}) ? 'is-active' : ''}
            >
                H1
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                className={editor.isActive('heading', {level: 2}) ? 'is-active' : ''}
            >
                H2
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
                • List
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'is-active' : ''}
            >
                1. List
            </button>
            <button onClick={() => editor.chain().focus().undo().run()}>Undo</button>
            <button onClick={() => editor.chain().focus().redo().run()}>Redo</button>
        </div>
    )
}