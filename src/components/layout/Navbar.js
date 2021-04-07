import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        if(localStorage.getItem('token') !== null) setIsAuth(true);
    },[])

    const logout = () =>{
        
    }

    return ( 
        <nav>
            <h1>Django React Auth</h1>
                { isAuth? (
                    <ul>
                        <li>
                            <Link to='/dashboard'>DashBoard</Link>
                        </li>
                        <li>
                            <button onSubmit={ logout }>Logout</button>
                        </li>
                    </ul>
                ) : (
                    <ul>
                        <li>
                            <Link to='/login'>Login</Link>
                        </li>
                        <li>
                            <Link to='/signup'>Signup</Link>
                        </li>
                    </ul>
                )}
        </nav>
     );
}
 
export default Navbar;