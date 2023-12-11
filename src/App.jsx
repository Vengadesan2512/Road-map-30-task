
import { useNavigate } from "react-router-dom";
import "./App.css"

import React, { useState, useEffect } from "react";

const API_URL = 'https://jsonplaceholder.typicode.com/users'; // Replace with your mock API URL
const navigate=useNavigate
const App = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ 
    name: "",
   email: "" ,
   username: "",
 
  
  });



  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      setUsers([...users, data]);
      setNewUser({ name: "", email: "",username: "" });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleEditUser = async (id, updatedUserData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      });
      const data = await response.json();
      setUsers(users.map(user => (user.id === id ? data : user)));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async id => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="search">
      <h1 className="h1"><b>USER MANAGEMENT</b></h1>
      <div>
       <br/>


      <div className="m-input">
         <div className="mail">
           <p className="p">NAME:</p> <input
           type="text"
            placeholder="YOUR GOOD NAME"
             className="input  w-full max-w-xs"
              value={newUser.name}
          onChange={e => setNewUser({ ...newUser, name: e.target.value })}
        />
         </div>
    <div className="mail">
        <p className="p">E-MAIL:</p>  <input
       type="text"
            placeholder="E-MAIL"
             className="input  w-full max-w-xs"
          value={newUser.email}
          onChange={e => setNewUser({ ...newUser, email: e.target.value })}
        />
    </div>
      <div className="mail">
          <p className="p">USER NAME:</p> <input
           type="text"
            placeholder="USER-NAME"
             className="input  w-full max-w-xs"
              value={newUser.username}
          onChange={e => setNewUser({ ...newUser, username: e.target.value })}
        />
         </div> 
       
       
        

      </div> 
      </div>
<br/>
      <div className="btns"><button  className="btn btn-primary " onClick={handleAddUser}>ADD USERS</button></div>
     <br/>  <br/>   <br/>   <br/>           

    
   <div className="ss card w-96 glass">
       <ul>
        {users.map(user => (
          <li key={user.id}>
           <p className="p2">Name : {user.name}</p> <br></br>
           <p className="p2">Email : {user.email}</p><br></br>
           <p className="p2">UserNAme : {user.username}</p><br></br>
          <br />
            <button className="btn btn-info" onClick={() => handleEditUser(user.id, { name: "" })}>Edit</button>
            <button className="btn btn-outline btn-error" onClick={() => handleDeleteUser(user.id)}>Delete</button>
         <br/><br/>
          <hr className="hr"/>
          </li>
        ))}
      </ul>
   </div>
    </div>
  );
};

export default App;
