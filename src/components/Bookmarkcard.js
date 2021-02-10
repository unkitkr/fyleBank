import React from 'react';


function Bookmarkcard(props) {
    function deleteBookmark(bankCard,key){
        if (localStorage.getItem("bankmarks")){
            var bookmarks = localStorage.getItem("bankmarks")
            bookmarks = bookmarks.split(";")
            let dets = []
            bookmarks.forEach((data) => {
                dets.push(JSON.parse(data))
            })
            let results = []
            dets.forEach((items) => {
                if(items.ifsc != key){
                    results.push(items)
                }
            })
            let preResult = []
            results.forEach((data) => {
                preResult.push(JSON.stringify(data))
            })
            let finalResult = preResult.join(";")
            localStorage.setItem("bankmarks",finalResult)
            window.location.reload()
        }
        else{
            window.location.reload(); 
        }
    }
    return (
        <div className = "col-md-4">
            <div className= "card main-card" style={{marginTop: "10px", marginBottom: "10px", minHeight: 210}}>
               <div className = "card-body">
                 <div className = "branch-name">{props.banks.branch}</div>
                 <div className = "branch-code">{props.banks.ifsc}</div>
                 <div className = "branch-address">{props.banks.address}</div>
                 <div className = "branch-state">{props.banks.state}</div>
                 <button type="button" className="btn mark-btn" onClick = {() => deleteBookmark(props.banks,props.banks.ifsc)}><i className="fa fa-trash" aria-hidden="true"></i></button>
               </div>
            </div>
        </div>
    );
}

export default Bookmarkcard;



