import React from 'react';
import "./Entry.css";

function EntryContentPropsAreEqual(prev, next) {
    console.log("checking")
  return prev.content === next.content;
}
  

function Entry({content,onTypeChange,number}) {
console.log(content,"rerendered")
  return(
   
    <input className="inputentry" placeholder="Type Choice" onChange={e => onTypeChange(e, number)} value={content}/>
    
    )

}
export default React.memo(Entry, EntryContentPropsAreEqual);