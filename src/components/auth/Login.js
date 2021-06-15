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
    const [pending, setPending] = useState(false)  

    // EHF
    const { register,handleSubmit,formState:{ errors } } = useForm();
    
    const handleLogin = async() => {

        setPending(true);

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

          setTimeout(() => {
            setPending(false);
            setLogged_in(true);
            setUserIsValid(true);
            history.push('/profile/create');
          }, 2000);          

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
            { pending?  (
            <button type="submit" className="btn bg-green-500 mt-10 hoverLight w-36 flex justify-around">
              {/* svg */}
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <g fill="none">
                  <path id="track" fill="#C6CCD2" d="M24,48 C10.745166,48 0,37.254834 0,24 C0,10.745166 10.745166,0 24,0 C37.254834,0 48,10.745166 48,24 C48,37.254834 37.254834,48 24,48 Z M24,44 C35.045695,44 44,35.045695 44,24 C44,12.954305 35.045695,4 24,4 C12.954305,4 4,12.954305 4,24 C4,35.045695 12.954305,44 24,44 Z"/>
                  <path id="section" fill="#3F4850" d="M24,0 C37.254834,0 48,10.745166 48,24 L44,24 C44,12.954305 35.045695,4 24,4 L24,0 Z"/>
                </g>
              </svg>
              ログイン
            </button>
            ) : (<button type="submit" className="btn bg-green-500 mt-10 hoverLight">ログイン</button>) }                

        </form>        
      </div>
     );
}
 
export default Login;