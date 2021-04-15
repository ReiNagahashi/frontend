import { Link } from "react-router-dom";
import React, { useEffect } from 'react';

const Navbar = ({logged_in,setLogged_in,setUsername}) => {
    const base_url = window.SERVER_ADDRESS;

    // check if user exists
    useEffect(() => {
        const initializeUser = async() =>{
            console.log(logged_in)
          if(logged_in){
            try{
              const res = await fetch(`${base_url}/accounts/current_user/`,{
                method:'GET',
                headers:{
                  Authorization:`JWT ${localStorage.getItem('token')}`
                }
              })
              const data = await res.json()
        
              setUsername(data.username)
              
            }catch(err){console.log(err)};
          }
      
        }
        initializeUser();
      }, [base_url,logged_in,setUsername])
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        setLogged_in(false);
        setUsername('');
        console.log("Logged out");
    }
      
    return ( 
        <div className="navBar">
            <Link to="/posts">投稿</Link>
            <Link to="/problems">問題提起</Link>
            <Link to="/">ホーム</Link>
            { logged_in? 
                // ログイン
                <button onClick={handleLogout}>Logout</button>
                :
                <Link to="/auth">ログイン/登録</Link>
                // ログアウト
            }
        </div>
     );
}
 
export default Navbar;