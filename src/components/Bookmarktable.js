import React from 'react';
import Bookmarkcard from './Bookmarkcard'
function Bookmarktable(props) {
    return (
        <div className = "container" style = {{width: "100%", marginTop: 30}}>
           <b>Bookmarks</b>
           <div className = "row">
                {(props.data).map((items) => {
                   let val = JSON.parse(items)
                   return (
                         <Bookmarkcard key = {val.ifsc} banks = {val}/>
                    )
                })}
          </div>
        </div>  
    );
}

export default Bookmarktable;