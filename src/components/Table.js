import React, { useState } from 'react';
import Record from "./Record";

function Table({allUsers}) {

 return (
     <div>
         <h2>The table goes here</h2>
         <table>
             <thead>
                <tr>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Email</th>
                    <th>User ID</th>
                    <th>Date joined</th>
                </tr>
             </thead>
             <tbody>
                {allUsers.map((v) => <Record record = {v}/>)}
            </tbody>   
         </table>                
     </div>
 )
}

export default Table;