import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Table from './components/Table';
import API from './utils/API';

function App() {
  const [allUsers, setUsers] = useState([]);

  useEffect(() => {
    API.search()
    .then(response => {
      let allUsersRaw = response.data.results;
      let allUsers = [];
      for (let user of allUsersRaw) {
        allUsers.push({name: user.name.first + ' ' + user.name.last, 
                      img: user.picture.thumbnail, 
                      email: user.email, 
                      userId: user.login.username, 
                      date: user.registered.date})
      };

      setUsers(allUsers); 
    }
    )
    .catch(error => {throw error}); 
  }, []);
  
  return (
    <div>
      <Navbar/>
      <div className='mt-5 ml-3 mr-3'>
        <h5>Welcome to the employee directory</h5>
        <h7>Click on the field to sort it ascending, click another time to sort descending.</h7><br></br>
        <h7>Use the input fields under the field names to filter corresponding field values.</h7>
        <Table allUsers = {allUsers}/>
      </div>
    </div>
  );
}

export default App;
