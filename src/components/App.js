import React, { useState, useEffect } from 'react'
import '../styles/App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortAscending, setSortAscending] = useState(true);

  const fetchUsers = async () => {
    setIsLoading(true);
    const response = await fetch("https://content.newtonschool.co/v1/pr/main/users");
    const data = await response.json();
    setIsLoading(false);
    setUsers(data);
  }

  const sortUsers = () => {
    const sortedUsers = users.sort((x, y) => {
      return sortAscending ? x.name.length - y.name.length : y.name.length - x.name.length;
    });
    setUsers(sortedUsers);
    setSortAscending(!sortAscending);
  }


  const fetchClicked = () => {
    fetchUsers();
  }



  return (
    <div id="main">
      <h2>User List</h2>
      <button className="fetch-data-btn" onClick={fetchClicked}>Fetch User Data</button>
      <button className="sort-btn" onClick={sortUsers}>
        {sortAscending ?
          "Sort by name length (ascending)"
          : "Sort by name length (descending)"
        }
      </button>
      {isLoading ?
        <p>Loading...</p>
        : ""
      }
      {
        <div className='users-section'>
          {users.map(({ id, name, email }) => (
            <li key={id}>
              <section className='id-section'>{id}</section>
              <section className='name-email-section'>
                <p className='name'>Name: {name}</p>
                <p className='email'>Email: {email}</p>
              </section>
            </li>
          ))}
        </div>

      }
    </div>
  )
}

export default App;