
import { useState } from 'react';
import './App.css'
import useToggle from './hooks/useToggle'

function App() {
  //const [isOn, setON]=useState(false);
  const [isOn, toggleIsOn] = useToggle(false);

  return (
    <>
      <div>
      <h1>Custom Hooks</h1>
      <h2>Custom Hook Example: useToggle</h2>

      <p>
        The switch is: <strong>{isOn ? "ON" : "OFF"}</strong>
      </p>

      <button onClick={toggleIsOn}>
        Toggle
      </button>
      </div>
     
    </>
  )
}

export default App
