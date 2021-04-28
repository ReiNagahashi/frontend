import React, { useState } from 'react';
import Axios from 'axios'
import { useForm } from 'react-hook-form'
 
const Signup = () => {
  // window properties
  const base_url = window.SERVER_ADDRESS;
  // Validation properties from RHF
  const { register,handleSubmit,formState:{errors} } = useForm();
  // States
  const [username, setUsername] = useState(''),
        [password, setPassword] = useState(''),
        [password2, setPassword2] = useState(''),
        [signal,setSignal] = useState(false);

  const clearForm = () =>{
    setUsername('');
    setPassword('');
    setPassword2('');
  }

  const sendRegistration = async() => {
    
    if(password !== password2){
      setSignal(true);
      return;
    }
      try{
        await Axios.post(base_url+'/accounts/users/create',{
          'user':{
            'username':username,
            'password':password
          }
        })
      }catch(err){
        console.log(err);
    }

    clearForm();
  }
  
  return ( 
      <div>
        {/*  "handleSubmit" will validate your inputs by RHF before invoking "onSubmit"  */}
        <form onSubmit={handleSubmit(sendRegistration)} noValidate>
          <div>
            <label htmlFor="username">ユーザー名</label>
            <input type="text" name="username" id="username" 
            {...register("username",{ required:true })} value={username} onChange={e => setUsername(e.target.value)}/>
            {errors.username && <span>入力必須項目です</span>}
          </div>
          <div>
            <label htmlFor="password">パスワード</label>
            <input type="password" name="password" id="password" 
            {...register("password",{ required:true })} value={password} onChange={e => setPassword(e.target.value)}/>
            {errors.password && <span>入力必須項目です</span>}
          </div>
          <div>
            <label htmlFor="password">再入力パスワード</label>
            <input type="password" name="password2" id="password2" 
            {...register("password2",{ required:true })} value={password2} onChange={e => setPassword2(e.target.value)}/>
            {errors.password2 && <span>入力必須項目です</span>}
            {signal && <span>パスワードと一致しません。</span>}
          </div>
          <button type="submit">登録</button>
        </form>
      </div>
   );
}
 
export default Signup;