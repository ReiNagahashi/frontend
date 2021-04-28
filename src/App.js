import './App.css';
import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Posts from './components/Posts';
import Problems from './components/problem/Problems';
import Profile from './components/Profile';
import Auth from './components/auth/Auth';
import Single from './components/problem/Single';
import Edit from './components/problem/Edit';

function App() {
  const [logged_in, setLogged_in] = useState(localStorage.getItem('token')? true : false)
  const [username, setUsername] = useState('')
  const [user_id, setUser_id] = useState(null)

  return (
    <Router>
      <div className="App">
        <Navbar
          logged_in = {logged_in}
          setLogged_in = {setLogged_in}
          setUser_id = {setUser_id}
          username = {username}
          setUsername = {setUsername}
          />
          { logged_in && <h2>Hello {username}</h2> }
          <div className="content">
              <Switch>
                <Route exact path="/">
                  <Profile/>
                </Route>
                <Route path="/posts">
                  <Posts/>
                </Route>
                {/* Problems */}
                <Route path="/problems">
                  <Problems
                    logged_in={logged_in}
                  />
                </Route>
                <Route path="/problem/edit/:id">
                  <Edit/>
                </Route>
                <Route path="/problem/:id">
                  <Single user_id={user_id}/>
                </Route>                
                {/* Auth */}
                <Route path="/auth">
                  <Auth 
                    setLogged_in = {setLogged_in}                  
                  />
                </Route>
              </Switch>
          </div>
      </div>
    </Router>
  );
}

export default App;
