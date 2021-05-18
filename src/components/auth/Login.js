import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'
import { useForm } from "react-hook-form";
import Axios from 'axios'

const Login = ({setLogged_in}) => {
    const base_url = window.SERVER_ADDRESS;
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [userIsValid, setUserIsValid] = useState(true)  

    // EHF
    const { register,handleSubmit,formState:{ errors } } = useForm();
    
    const handleLogin = async() => {

        const data = {
          email:email,
          password:password
        }

        try{
          const msg = await Axios.post(base_url+'/accounts/check_user/',{
            'user':{
              'email':email,
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
          console.log(data)
          const res = await fetch(`${base_url}/token-auth/`,{
            crossDomain:true,
            withCredencials:true,
            async:true,
            method:'POST',
            headers:{
              'Content-Type':'application/json',
            },
            body:JSON.stringify(data)
          })
          const json = await res.json();
          localStorage.setItem('token',json.token);
          
          setLogged_in(true);
          setUserIsValid(true);
          history.push('/profile/create');
          
        }catch(err){
          console.log(err);
        }
        
      }
    
    return ( 
      <div>
        <h1 className="text-2xl">ログイン</h1>
        { userIsValid === false && <h3>ユーザー情報に誤りがあります</h3> }
        <form onSubmit={handleSubmit(handleLogin)} className="h-full flex flex-col items-center justify-center">
            {/* email */}
            <div className="flex">
              <div>
                <label htmlFor="login_email" className="label">メールアドレス:</label>
                <input
                    {...register("login_email",{ required:true })}
                    type="email"                
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    id="login_email"
                    className="form"
                    placeholder="abc@gmail.com"
                />
                {errors.login_email && <div className="text-red-500">入力必須項目です</div>}
              </div>
              
              {/* Password */}
              <div className="ml-5">
                <label htmlFor="login_pass" className="label">パスワード:</label>
                <input
                    {...register("login_password",{ required:true })}
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    id="login_pass"
                    className="form"
                    placeholder="Password"
                />
                {errors.login_password && <div className="text-red-500">入力必須項目です</div>}
              </div>
            </div>

            <button type="submit" className="btn bg-green-500 mt-10">ログイン</button>
        </form>
      </div>
     );
}
 
export default Login;