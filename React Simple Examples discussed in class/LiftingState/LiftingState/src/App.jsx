import './App.css'
import AddUser from './components/AddUser'
import DisplayUser from './components/DisplayUser'
import { useState } from 'react';

function App() {
 
const [user, setUser] = useState('Baljeet');
  return (
    <>
      <div>
       <h1>Lifting State Example </h1>
        <AddUser 
        setUser={setUser}
        user = {user}/>
        <DisplayUser user = {user}/>
      </div>
      
    </>
  )
}

export default App
