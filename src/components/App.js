import React, { useRef, useState, useEffect } from "react";
import './../styles/App.css';

const ITEM_HEIGHT = 100; 
const CONTAINER_HEIGHT = 500;

const App = () => {
  const containerRef = useRef(null);
  const itemsRef = useRef(Array.from({ length: 15 }, (_, i) => i));
  const [visibleStart, setVisibleStart] = useState(0);

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      const start = Math.floor(scrollTop / ITEM_HEIGHT);
      setVisibleStart(start);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const visibleCount = Math.ceil(CONTAINER_HEIGHT / ITEM_HEIGHT);
  const visibleItems = itemsRef.current.slice(visibleStart, visibleStart + visibleCount + 1);

  return (
    <div
      ref={containerRef}
      style={{
        height: `${CONTAINER_HEIGHT}px`,
        overflowY: "auto",
        border: "1px solid #ccc"
      }}
    >
      <div style={{ height: `${itemsRef.current.length * ITEM_HEIGHT}px`, position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: `${visibleStart * ITEM_HEIGHT}px`,
            width: "100%"
          }}
        >
          {visibleItems.map((i) => (
            <Item n={i} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Item = ({ n }) => (
  <div style={{ height: `${ITEM_HEIGHT}px`, padding: '10px', boxSizing: 'border-box' }}>
    <h1>Item {n}</h1>
    <p>Lorem ipsum dolor sit amet</p>
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
