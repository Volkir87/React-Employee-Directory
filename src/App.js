import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Table from './components/Table';
import API from './utils/API';

function App() {

  const [allUsers, setUsers] = useState([]);

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
      }
      //setUsers(allUsers); 
    }
    )
    .catch(); 
  
  return (
    <div>
      <Navbar/>
      <Table allUsers = {allUsers}/>
    </div>
  );
}

export default App;
