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
                    handleLogin={props.handleLogin}
                    username = {props.username}
                    setUsername = {props.setUsername}
                />
            </div>
        </div>
     );
}
 
export default Auth;