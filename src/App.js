import React, { useState, useEffect } from 'react';
import io from 'socket.io-client'
import { TextField } from '@mui/material';
import './App.css';

const socket = io.connect('http://localhost:4000')

function App() {
  const [state, setState] = useState({ message: '', name: '' })
  const [chat, setChat] = useState([])

  useEffect(() => {
    socket.on('message', ({ message, name }) => {
      setChat([...chat, {message, name}])
    })
  }, [chat])
  

  const onMessageSubmit = (e) => {
    e.preventDefault()
    const { message, name } = state

    socket.emit('message', { message, name })
    setState({ message, name })

    console.log('state', state);
    console.log('chat', chat);
  }

  const onTextChange = (e) => setState({ ...state, [e.target.name]: e.target.value })
  
  return (
    <div className="card">
      <form onSubmit={onMessageSubmit}>
        <h1>Messanger</h1>
        <div className='name-field' >
          <TextField name='name' onChange={(e => onTextChange(e))} value={state.name} label='Name' id="standard-basic" variant="standard" />
        </div>
        <div className='name-field' >
          <TextField name='message' onChange={(e => onTextChange(e))} id='outlined-multiline-static' variant="outlined" value={state.message} label='Name' />
        </div>
        <button>Send message</button>
        

      </form>
      <div className='render-chat'>
        <h1>Chat Log</h1>
        {chat.map(({ message, name }, index) => (
            <div key={index} >
               <h3>{name}: <span>{message}</span></h3>
            </div>
        ))}
      </div>
      
    </div>
  );
}

export default App;
