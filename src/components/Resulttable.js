import React from 'react';
import Bankcard from './Bankcard'
function Resulttable(props) {
    return (
        <div className = "container" style = {{width: "100%", marginTop: 30}}>
           <b>Search results</b>
           <div className = "row">
                {(props.data).map((items) => {
                   return (
                         <Bankcard key = {items.ifsc} banks = {items}/>
                    )
                })}
          </div>
        </div>  
    );
}

export default Resulttable;