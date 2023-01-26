
import './App.css';
import SearchME from  './components/SearchME'
import React, { useState } from 'react';
import axios from "axios";

function App() {
  const [cID,setCID]=useState("");
  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setCID(event.target.value);
  };
  const url = `https://api.helius.xyz/v1/active-listings?api-key=${process.env.REACT_APP_HELIUS_API}`;
  const [meData,setmeData]=useState([]);
  const getActiveListings = async () => {
    console.log(cID);
      const { data } = await axios.post(url, {
          "query": {
              // ABC collection GVkb5GuwGKydA4xXLT9PNpx63h7bhFNrDLQSxi6j5NuF
              "firstVerifiedCreators": [""+cID],
              "marketplaces": ["MAGIC_EDEN"]
          }
      });
      console.log("Active listings: ", data.result);
      setmeData(data.result);
  };
  
  
  
      return(
          <div className="middle" >
            <h1 className="middle">Get listed NFTs on Magic Eden!</h1>
              
              <div className="middle">
                <h3>Enter Collection ID:</h3>
                  <input type="text" id="inputBox" placeholder="Collection ID" onChange={handleChange} className="inputb"/>
                  <button className='button' onClick={getActiveListings}>Get</button>
              </div>
          <table className="tbl">
          <tbody>
          <tr className='styled-table'>
            <th>Name</th>
            <th>Mint</th>
            <th>Owner</th>
            <th>Price</th>
            
          </tr>
          {meData.map((item) => (
            <tr>
              <td>{item['name']}</td>
              <td>{item['mint']}</td>
              <td>{item['activeListings']['0']['seller']}</td>
              <td>{item['activeListings']['0']['amount']/1000000000 +" SOL"}</td>
            </tr>
          ))}
        </tbody>
        </table>
          </div>
      );
  }

export default App;
