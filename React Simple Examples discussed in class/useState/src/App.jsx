import { useState } from 'react'
import './App.css'


function App() {
 
  let count = 0;
  //let fruit = "Apple"
  const myvar = useState(0);
  const counter = myvar[0];
  const setCounter = myvar[1];
  //const [counter,setCounter] = useState(0)
  const [user,setUser]= useState({userName: "Baljeet", course : "SDEV", code: 2210});

  
  console.log(`Myvar has two array elements :  ${myvar}`);
  console.log(`First element in My var i.e. counter :  ${counter}`);
  const increment = () => {
  // Update the state using the previous value to prevent issues with multiple updates
  
  console.log(count);
  //console.log(fruit);
  
  count = count + 1; 
  setCounter(counter+1);
  
  //fruit = "Banana"
  
  console.log(count);
  //console.log(fruit);
  };



 
  return (
    <>
      <div className="flex items-center justify-between space-x-4">
        <h1> value of count is : {count} </h1> 
        <h1 className='text-sky-400'> value of counter is : {counter} </h1>
      </div>
       <div className="flex items-center justify-between space-x-4">
        <button 
          type='button'
          className="rounded border border-gray-300 px-4 py-2 text-sm font-semibold text-white-700 hover:bg-gray-50"
          onClick={increment}>
          NO-USESTATE count is : {count} 
        </button>
       
        <button className='text-sky-400'
          onClick={increment}>
          useState counter is : {counter} 
        </button>
     </div>
    </>
  )
}
export default App