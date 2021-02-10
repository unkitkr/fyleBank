import React from "react";
import {useState, useEffect} from 'react';
import Resulttable from './Resulttable'
import Bookmarktable from './Bookmarktable'
import useSWR from 'swr'

function Searchbar(props) {
  const [searchQuery, setQuery] = useState("");
  const [cityName, setCity] = useState("Bangalore");
  const [limitValue, setLimit] = useState(25);
  const [offsetValue, setOffset] = useState(0);
  const [currentPage, setPage] = useState(1);
  const [pageTotalSize, setTotalSize] = useState(92);


  useEffect(calculateOffset, [currentPage,cityName,limitValue])


  function calculateOffset(){
    if(cityName === "Bangalore"){
      let pageSize = Math.ceil(2320/limitValue)
      setTotalSize(pageSize)
    }
    if(cityName === "Chennai"){
      let pageSize = Math.ceil(1964/limitValue)
      setTotalSize(pageSize)
    }
    if(cityName === "Pune"){
      let pageSize = Math.ceil(1865/limitValue)
      setTotalSize(pageSize)
    }
    if(cityName === "Delhi"){
      let pageSize = Math.ceil(3842/limitValue)
      setTotalSize(pageSize)
    }
    if(cityName === "Ranchi"){
      let pageSize = Math.ceil(418/limitValue)
      setTotalSize(pageSize)
    }

    let currentOffset = Number((currentPage*limitValue) - limitValue);
    setOffset(currentOffset);
  }

  function incrementPage(){
    if (currentPage < pageTotalSize){
      setPage(Number(Number(currentPage) + 1));
    }
  }

  function decrementPage(){
    if (currentPage > 1) setPage(Number(Number(currentPage) - 1));
  }

  function search(dataVals){
    return dataVals.filter((allData) => 
    allData.branch && allData.branch.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1 ||
    allData.ifsc && allData.ifsc.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1 ||
    allData.address && allData.address.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1 ||
    allData.city && allData.city.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1  ||
    allData.district && allData.district.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1 ||
    allData.state && allData.state.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
    )}
  
  const  fetcher = async () => await fetch(`https://fylebanking.herokuapp.com/api/branches?q=${cityName}&limit=${limitValue}&offset=${offsetValue}`).then(res => res.json())
  const { data, error } = useSWR(`http://127.0.0.1:5000/api/branches?q=${cityName}&limit=${limitValue}&offset=${offsetValue}`, fetcher, { refreshInterval: 0 })
  return (
    <div>
      <div className="card container" style={{marginTop: 10, borderRadius: 10 }}>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4" >
            <div className = "search-header">City:</div>
              <div className="input-group mb-2 mr-sm-2">
                <div className="input-group-prepend">
                  <div className="input-group-text" style={{ backgroundColor: "white", color: "rgb(92, 22, 255)",}}>
                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                  </div>
                </div>
                <select type="dropdown" className="form-control py-0" onChange={(e) =>  {setCity(e.target.value); setOffset(0)}}>
                    <option value = "Bangalore" defaultValue>Bangalore</option>
                    <option value = "Chennai">Chennai</option>
                    <option value = "Pune">Pune</option>
                    <option value = "Delhi">Delhi</option>
                    <option value = "Ranchi">Ranchi</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
            <div className = "search-header">Search:</div>
              <div className="input-group mb-2 mr-sm-2">
                <div className="input-group-prepend">
                  <div className="input-group-text" style={{backgroundColor: "white", color: "rgb(92, 22, 255)"}}>
                    <i className="fas fa-search"></i>
                  </div>
                </div>
                <input type="dropdown" className="form-control py-0" id="inlineFormInputGroupUsername2"placeholder="Keyword" onChange = {(e) => {setQuery(e.target.value)}}></input>
              </div>
            </div>
            <div className="col-md-2">
                <div className = "search-header">Entries/page:</div>
                <div className="input-group mb-2 mr-sm-2">
                    <div className="input-group-prepend">
                    <div className="input-group-text" style={{backgroundColor: "white", color: "rgb(92, 22, 255)"}}>
                        <i className="fa fa-list" aria-hidden="true"></i>
                    </div>
                    </div>
                    <input min = "1"  className = "form-control" type = "number"  value = {limitValue} onChange = {(e) => {if (e.target.value == 0){ e.target.value = 1; setPage(1)} else { setLimit(e.target.value); ; setPage(1)}}}></input>
                </div>
            </div>
          </div>
        </div>
      </div>
      {(() => {
        if(localStorage.getItem("bankmarks")){
          let bookmarkData = localStorage.getItem("bankmarks");
          let filter = bookmarkData.split(";");
          
          return ( 
            <Bookmarktable data = {(filter)}/>
          )
        }
        
      })()}
      {(() => {
        if(!data){
          return (
          <>
          <div className = "container">
            <p style = {{textAlign: "center", fontWeight: 700, fontSize: 20, marginTop: 30}}>Lodaing <span className="fa-x"><i className="fas fa-circle-notch fa-spin"></i></span></p>
          </div>
          </>
          )
        }
        else{
          return (
            <>
              <Resulttable data = {search(data.branches)}/>
              <div className = "container" style = {{marginBottom: 15, paddingBottom: 15, paddingTop: 20}}>
                  <div className="input-group mb-2" style = {{width: 200, margin: "auto"}}>
                    <button style = {{border: "none", backgroundColor: "transparent", marginRight: "10px", color: "rgb(92, 22, 255)"}} onClick = {decrementPage}><i className="fa fa-arrow-circle-o-left" aria-hidden="true"></i></button>
                      <input type="number" min = "1" max = "94" className="form-control" id="inlineFormInputGroup" placeholder="" value = {currentPage} onChange = {(e) => {
                        if (currentPage < pageTotalSize){
                            setPage(e.target.value); 
                          }
                         }}></input>
                      <div className="input-group-append">
                        <span className="input-group-text outof">{pageTotalSize}</span>
                      </div>
                      <button style = {{border: "none", backgroundColor: "transparent", marginLeft: "10px", color: "rgb(92, 22, 255)"}} onClick = {incrementPage}><i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i></button>
                    </div>
              </div>
            </>
          )
        }
      })()}

    </div>
  );
}

export default Searchbar;
