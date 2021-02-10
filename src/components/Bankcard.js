import React from 'react';


function Bankcard(props) {
    function bookmark(bankCard){
        if (localStorage.getItem("bankmarks")){
            var old = localStorage.getItem("bankmarks")
            localStorage.setItem("bankmarks",old+";"+ JSON.stringify(bankCard.banks))
            window.location.reload();   
        }
        else{
            var old = "";
            localStorage.setItem("bankmarks", old +JSON.stringify((bankCard.banks)))
            window.location.reload();   
        }
    }
    return (
        <div className = "col-md-4" >
            <div className= "card main-card" style={{marginTop: "10px", marginBottom: "10px", minHeight: 210}}>
               <div className = "card-body">
                 <div className = "branch-name">{props.banks.branch}</div>
                 <div className = "branch-code">{props.banks.ifsc}</div>
                 <div className = "branch-address">{props.banks.address}</div>
                 <div className = "branch-state">{props.banks.state}</div>
                 <button type="button" className="btn mark-btn" onClick = {() => bookmark(props)}><i className="fas fa-bookmark"></i></button>
               </div>
            </div>
        </div>
    );
}

export default Bankcard;



