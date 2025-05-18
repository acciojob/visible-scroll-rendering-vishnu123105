
import React, { useRef } from "react";
import './../styles/App.css';

const App = () => {
  const arr = useRef(Array.from({length:15},()=>0))
  return (
    <div style={{height:"500px",overflowY:"scroll"}}>
        {arr.current.map((_,i)=><Item n={i} key={i+1}/>)}
    </div>
  )
}
const Item=({n})=>(
  <>
  <h1>Item {n}</h1>
  <p>Lorem iposum dolor sit amet</p>
  </>
)

export default App
