import Signup from "./Signup";
import Login from "./Login";

const Auth = (props) => {
    return ( 
        <div className="auth_forms">
            <div className="register">
                <Signup/>
            </div>
            <div className="login">
                <Login
                    setLogged_in = {props.setLogged_in}
                />
            </div>
        </div>
     );
}
 
export default Auth;