import React, { useRef, useState, useEffect } from "react";
import "./../styles/App.css";

const ITEM_HEIGHT = 100; 
const VISIBLE_COUNT = 10;

const App = () => {
  const containerRef = useRef(null);
  const allItems = useRef(Array.from({ length: 100 }, (_, i) => i));
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = () => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop);
    }
  }
  
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const startIndex = Math.floor(scrollTop / ITEM_HEIGHT);
  const visibleItems = allItems.current.slice(startIndex, startIndex + VISIBLE_COUNT);

  return (
    <div
      ref={containerRef}
      style={{ height: "500px", overflow: "auto" }}
    >
      <div style={{ height: `${allItems.current.length * ITEM_HEIGHT}px`, position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: `${startIndex * ITEM_HEIGHT}px`,
            width: "100%",
          }}
        >
          {visibleItems.map((item) => (
            <Item key={item} index={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Item = ({ index }) => (
  <div
    style={{
      height: `${ITEM_HEIGHT}px`,
      padding: "10px",
      boxSizing: "border-box",
      background: index % 2 === 0 ? "#f9f9f9" : "#fff",
    }}
  >
    <h2>Item {index}</h2>
    <p>Lorem ipsum dolor sit amet.</p>
  </div>

);

export default App;

// import React, { useRef } from "react";
// import './../styles/App.css';

// const App = () => {
//   const arr = useRef(Array.from({length:15},()=>0))
//   return (
//     <div style={{height:"500px",overflowY:"scroll"}}>
//         {arr.current.map((_,i)=><Item n={i} key={i+1}/>)}
//     </div>
//   )
// }
// const Item=({n})=>(
//   <>
//   <h1>Item {n}</h1>
//   <p>Lorem iposum dolor sit amet</p>
//   </>
// )

// export default App
