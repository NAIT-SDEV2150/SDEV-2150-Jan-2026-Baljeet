

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/*
function Hello()
{
  console.log('Hello from funtion in main');
  const x = hello();
  // const c = <hello /> doesn't work 
  return <h1> Hello from Component function in main which call normal hello fuction: {x} </h1>;

}

*/


//createRoot(document.getElementById('root')).render(Hello())
//createRoot(document.getElementById('root')).render(Hello());

createRoot(document.getElementById('root')).render(<App />);

function hello()
{
  return 10+10;
  //return <h1> We are inside normal funtion</h1>  
}
