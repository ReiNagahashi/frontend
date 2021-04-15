import React, { useState } from 'react';

const Login = ({handleLogin,setUsername,username}) => {

    const [password, setPassword] = useState('');
    
    return ( 
        <form onSubmit={e => handleLogin(e,{
            username:username,
            password:password
        })}>
            {/* Username */}
            <label htmlFor="username">Username</label>
            <input
                type="text"
                onChange={e => setUsername(e.target.value)}
                value={username}
                name="username"
                id="username"
                placeholder="Username"
            />
            {/* Password */}
            <label htmlFor="pass">Password</label>
            <input
                type="password"
                onChange={e => setPassword(e.target.value)}
                value={password}
                name="pass"
                id="pass"
                placeholder="Password"
            />

            <button type="submit">Login</button>
        </form>
     );
}
 
export default Login;