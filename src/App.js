import './App.css';
import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Posts from './components/Posts';
import Problems from './components/problem/Problems';
import Profile from './components/Profile';
import Auth from './components/auth/Auth';

function App() {
  const base_url = window.SERVER_ADDRESS;

  const [logged_in, setLogged_in] = useState(localStorage.getItem('token')? true : false)
  const [username, setUsername] = useState('')  

  console.log(username);

  const handleLogin = async(e,data) => {
    e.preventDefault();

    try{
      const res = await fetch(`${base_url}/token-auth/`,{
        crossDomain:true,
        withCredencials:true,
        async:true,
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
      })
      const json = await res.json();
      localStorage.setItem('token',json.token);

      setLogged_in(true);
      setUsername(json.user.username);
      
    }catch(err){ console.log(err);}
    
  }
  return (
    <Router>
      <div className="App">
        <Navbar
          logged_in = {logged_in}
          setLogged_in = {setLogged_in}
          username = {username}
          setUsername = {setUsername}
          />
          <h3>
            {
              logged_in? `Hello ${username}` : 'Please log in'
            }
          </h3>
          <div className="content">
              <Switch>
                <Route exact path="/">
                  <Profile/>
                </Route>
                <Route path="/posts">
                  <Posts/>
                </Route>
                <Route path="/problems">
                  <Problems/>
                </Route>
                <Route path="/auth">
                  <Auth 
                    handleLogin = {handleLogin}
                    username = {username}
                    setUsername = {setUsername}
                  />
                </Route>
              </Switch>
          </div>
      </div>
    </Router>
  );
}

export default App;
