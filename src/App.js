import './App.css';
import React, { useState,useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch,useHistory,Redirect } from "react-router-dom";
import Posts from './components/Posts';
import Problems from './components/problem/Problems';
import Profile from './components/profile/Profile';
import Auth from './components/auth/Auth';
import Single from './components/problem/Single';
import Edit from './components/problem/Edit';
import Form from './components/profile/Form';
import Axios from 'axios';
import './index.css';


function App() {
  const [logged_in, setLogged_in] = useState(localStorage.getItem('token')? true : false)
  const [user, setUser] = useState({})
  const history = useHistory();
  // check if user exists
  useEffect(() => {
    const base_url = window.SERVER_ADDRESS;

      const initializeUser = async() =>{
        console.log("User initialized")
        if(logged_in){
          const token = localStorage.getItem('token')          
          // Check if token is verified
          try{
            await Axios.post(base_url+'/token-verify/',{
              'token':token              
            })
          }catch(err){
            // If token is expired, redirect to login page
            console.log("Verifying Error:",err);
            handleLogout();                 
            return ;
          }
          // Refresh token
          try{
            await Axios.post(base_url+'/token-refresh/',{
              'token':token              
            })
          }catch(err){          
            console.log("Refreshing Error:",err);                                  
          }
          // Get current user's information
          try{
            const res = await fetch(`${base_url}/accounts/current_user/`,{
              method:'GET',
              headers : {
                Authorization : `JWT ${token}`
              }
            })
            const data = await res.json()          
            setUser(data)
          }catch(err){
            console.log(err)
          };
        }
      }
      initializeUser();
    }, [history,logged_in,setUser,setLogged_in])
    // Log out
    function handleLogout(){
      localStorage.removeItem('token');
      setLogged_in(false);
      setUser({});
      console.log("Logged out");
  }
  return (
    <Router>
      <div className="App font-body text-gray-600 pt-40">
        <Navbar
          logged_in = {logged_in}
          handleLogout={handleLogout}
          user = {user}
          />
          <div className="content">
              <Switch>
                <Route exact path="/">
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
                  <Single user = {user}/>
                </Route>                
                {/* Auth */}
                <Route path="/auth">
                  <Auth 
                    setLogged_in = {setLogged_in}                  
                  />
                </Route>                
                <Route path="/profile/create">                  
                  <Form user = {user}/>
                </Route>
                <Route path="/profile/:id">                  
                  {logged_in ? user.fullname ? <Profile authUser={user}/> :  <Redirect to="/profile/create"/> : <Redirect to="/auth"/>}
                </Route>
              </Switch>
          </div>
      </div>
    </Router>
  );
}

export default App;
