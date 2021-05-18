import Signup from "./Signup";
import Login from "./Login";

const Auth = (props) => {
    return ( 
        <div className="flex justify-around">
            <div className="register">
                <Signup/>
            </div>
            <div className="middle_position self-center">
                OR
            </div>
                <Login
                    setLogged_in = {props.setLogged_in}
                />
        </div>
     );
}
 
export default Auth;