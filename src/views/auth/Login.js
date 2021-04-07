import { useState,useEffect } from 'react'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(true);
    // ここのeffect後で消す。不要な存在
    useEffect(() => {
        if(localStorage.getItem('token') !== null)
            window.location.replace('http://localhost:3000/dashboard')
        else setLoading(false);
    },[])

    const onSubmit = async (e) => {
        e.preventDefault();

        const user = {
            email:email,
            password:password
        };

       const res = await fetch('http://127.0.0.1:8000/api/v1/users/auth/login/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user)
        })

        const data = await res.json();

        if(data.key){
            localStorage.clear();
            localStorage.setItem('token',data.key);
            window.location.replace('http://localhost:3000/dashboard');
        }else{
            setEmail('');
            setPassword('');
            localStorage.clear();
            setErrors(true);
        }
    }

    return ( 
        <div>
            { !loading && <h1>Login</h1>}
            { errors && <h2>Cannnot log in with provided credencials</h2>}
            { !loading && (
                <form onSubmit={onSubmit}>
                    <label htmlFor="email">Email address:</label><br/>
                    <input type="email" name="email" value={email} required 
                    onChange={e => setEmail(e.target.value)}/>

                    <br/>

                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" value={password} required 
                    onChange={e => setPassword(e.target.value)}/>
                    <br/>
                    <input type="submit" value="Login"/>
                </form>
            )}
       </div>
     );
}
 
export default Login;