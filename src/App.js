import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

function App() {

  const [text, setText] = useState("")
  const [send, setSend] = useState(null)

  function typing(e){
    console.log(e.target.value)
    setText(e.target.value)
  }

  const submit = async (text) => {
    const response = await axios.post('/api/comment', { text: text })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hi, I'm Anna
        </p>
        <a
          className="App-link"
        >
          Say something...
        </a>
        <form >
          <TextareaAutosize id="text" name="text" onChange={typing} value={text}></TextareaAutosize>
          <button onClick={() => submit(text)}>Say</button>
        </form>
      </header>
    </div>
  );
}

export default App;
