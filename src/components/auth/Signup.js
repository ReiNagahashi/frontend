import React, { useState } from 'react';
import Axios from 'axios'
import { useForm } from 'react-hook-form'
 
const Signup = () => {
  // window properties
  const base_url = window.SERVER_ADDRESS;
  // Validation properties from RHF
  const { register,handleSubmit,formState:{errors} } = useForm();
  // States
  const [email, setEmail] = useState(''),
        [password, setPassword] = useState(''),
        [password2, setPassword2] = useState(''),
        [signal,setSignal] = useState(false);

  const clearForm = () =>{
    setEmail('');
    setPassword('');
    setPassword2('');
  }

  const sendRegistration = async() => {
    
    if(password !== password2){
      setSignal(true);
      return;
    }
      try{
        await Axios.post(base_url+'/accounts/user/create',{
          'user':{
            'email':email,
            'password':password
          }
        })
      }catch(err){
        console.log(err);
    }
    alert("登録を完了しました。ログインをして様々な機能を使いましょう。")
    clearForm();
  }
  
  return ( 
      <div>
        {/*  "handleSubmit" will validate your inputs by RHF before invoking "onSubmit"  */}
        <h1 className="text-2xl">登録</h1>
        <form onSubmit={handleSubmit(sendRegistration)} noValidate>
          <div className="my-6">
            <div></div>
            <label htmlFor="email" className="label">メールアドレス :</label>
            <input type="email" name="email" id="email" className="form" placeholder="abc@gmail.com"
            {...register("email",{ required:true })} value={email} onChange={e => setEmail(e.target.value)}/>
            {errors.email && <span className="text-red-500">入力必須項目です</span>}
          </div>
          <div className="my-6">
            <label htmlFor="password" className="label">パスワード:</label>
            <input type="password" name="password" id="password" className="form" placeholder="Password"
            {...register("password",{ required:true })} value={password} onChange={e => setPassword(e.target.value)}/>
            {errors.password && <span className="text-red-500">入力必須項目です</span>}
          </div>
          <div className="my-6">
            <label htmlFor="password" className="label">再入力パスワード:</label>
            <input type="password" name="password2" id="password2" className="form" placeholder="Password"
            {...register("password2",{ required:true })} value={password2} onChange={e => setPassword2(e.target.value)}/>
            {errors.password2 && <span className="text-red-500">入力必須項目です</span>}
            {signal && <span className="text-red-500">パスワードと一致しません</span>}
          </div>
          <button type="submit" className="btn bg-green-300 mt-4">登録</button>
        </form>
      </div>
   );
}
 
export default Signup;