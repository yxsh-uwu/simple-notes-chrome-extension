import {useEffect, useState } from 'react'
import './App.css'

type Note={id: number; text: string};

function App() {
  const [text, setText]=useState<string>("");
  const [notes, setNotes]=useState<Note[]>([]);

  useEffect(()=>{
    chrome.storage.sync.get({notes:[]}, (data)=>{
      setNotes(data.notes);
    });
  },[])

  useEffect(()=>{
    chrome.storage.sync.set({ notes })
  }, [notes]);


  const addNote=()=>{
    if (!text.trim()) return;
    const newNote: Note = { id: Date.now(), text: text.trim() };
    setNotes([newNote, ...notes]);
    setText("");
  };


  const deleteNote=(id:number)=>{
    setNotes(notes.filter((n) => n.id !== id));
  };


  return (
      <div className='w-72 p-4 bg-gray-50 rounded-lg shadow-md font-sans'>
        <h2 className='text-xl font-bold mb-2 text-gray-800'>Simple Notes</h2>
        <div className="flex gap-2 mb-4">
          <input
            className="flex-1 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Add a note..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            onClick={addNote}
          >
            Add
          </button>
        </div>

        <div className="max-h-64 overflow-y-auto">
        {notes.length === 0 && (
          <p className="text-gray-500 text-sm">No notes yet</p>
        )}
        {notes.map((note) => (
          <div
            key={note.id}
            className="flex justify-between items-center mb-2 p-2 bg-white rounded shadow-sm"
          >
            <span className="break-words">{note.text}</span>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => deleteNote(note.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      </div>
  )
}

export default App
