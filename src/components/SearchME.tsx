import React, { useState } from 'react';
import axios from "axios";


const SearchME = (props:any) => {

const url = `https://api.helius.xyz/v1/active-listings?api-key=848e6147-3aae-4b26-af06-b1d4174f3cf9`;
const [meData,setmeData]=useState([]);
const getActiveListings = async () => {
    const { data } = await axios.post(url, {
        "query": {
            // ABC collection
            "firstVerifiedCreators": ["GVkb5GuwGKydA4xXLT9PNpx63h7bhFNrDLQSxi6j5NuF"],
            "marketplaces": ["MAGIC_EDEN"]
        }
    });
    console.log("Active listings: ", data.result);
    setmeData(data.result);
};



    return(
        <div className='tc bg-light-gray dib br3 pa3 ma2 grow bw2 shadow-5'>
            
            <div>
                <button onClick={getActiveListings}>Get</button>
            </div>
        <table>
        <tbody>
        <tr className='stock'>
          <th>Name</th>
          <th>Mint</th>
          <th>Owner</th>
          
        </tr>
        {meData.map((item) => (
          <tr>
            <td>{item['name']}</td>
            <td>{item['mint']}</td>
            <td>{item['activeListings']['0']['seller']}</td>
          </tr>
        ))}
      </tbody>
      </table>
        </div>
    );
}

export default SearchME;