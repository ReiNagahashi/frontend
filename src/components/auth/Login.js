import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'
import { useForm } from "react-hook-form";
import Axios from 'axios'

const Login = ({setLogged_in}) => {
    const base_url = window.SERVER_ADDRESS;
    const history = useHistory()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [userIsValid, setUserIsValid] = useState(true)  

    // EHF
    const { register,handleSubmit,formState:{ errors } } = useForm();
    
    const handleLogin = async() => {

        const data = {
          username:username,
          password:password
        }

        try{
          const msg = await Axios.post(base_url+'/accounts/check_user/',{
            'user':{
              'username':username,
              'password':password
            }
          })
          if(msg.data.response === "error"){
            setUserIsValid(false);
            return;
          }
        }catch(err){
          console.log(err);      
      }
    
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
          setUserIsValid(true);
          history.push('/');
          
        }catch(err){
          console.log(err);
        }
        
      }
    
    return ( 
      <div>
        { userIsValid === false && <h3>ユーザー情報に誤りがあります</h3> }
        <form onSubmit={handleSubmit(handleLogin)} >
            {/* Username */}
            <label htmlFor="username">Username</label>
            <input
                {...register("username",{ required:true })}
                type="text"                
                onChange={e => setUsername(e.target.value)}
                value={username}
                id="username"
                placeholder="Username"
            />
            {errors.username && <span>入力必須項目です</span>}
            
            {/* Password */}
            <label htmlFor="pass">Password</label>
            <input
                {...register("password",{ required:true })}
                type="password"
                onChange={e => setPassword(e.target.value)}
                value={password}
                id="pass"
                placeholder="Password"
            />
            {errors.password && <span>入力必須項目です</span>}

            <button type="submit">Login</button>
        </form>
      </div>
     );
}
 
export default Login;