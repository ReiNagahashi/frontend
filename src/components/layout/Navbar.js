import { Link,useHistory } from "react-router-dom";
import React, { useEffect } from 'react';

const Navbar = ({logged_in,setLogged_in,setUsername,setUser_id}) => {
    // check if user exists
    const history = useHistory();
    useEffect(() => {
      const base_url = window.SERVER_ADDRESS;

        const initializeUser = async() =>{
          console.log("User was initialized")
          if(logged_in){
            try{
              const res = await fetch(`${base_url}/accounts/current_user/`,{
                method:'GET',
                headers : {
                  Authorization : `JWT ${localStorage.getItem('token')}`
                }
              })
              const data = await res.json()              
              setUser_id(data.id)
              setUsername(data.username)
            }catch(err){
              setLogged_in(false);
              console.log(err)
              history.push("/auth")
            };
          }
        }
        initializeUser();
      }, [history,logged_in,setUsername,setUser_id,setLogged_in])
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        setLogged_in(false);
        setUsername('');
        console.log("Logged out");
    }
      
    return ( 
        <div className="navBar">
            <Link to="/posts">投稿</Link>
            <br/>
            <Link to="/problems">問題提起</Link>
            <br/>
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