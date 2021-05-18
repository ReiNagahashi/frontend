import { Link } from "react-router-dom";

const Navbar = ({logged_in,handleLogout,user}) => {
      
    return ( 
        <nav className="flex justify-center pb-28">            
            <Link to="/">投稿</Link>
            <br/>
            <Link to="/problems" className="ml-28">問題提起</Link>
            <br/>
            <Link to={`/profile/${user.id}`} className="ml-28">プロフィール</Link>
            { logged_in? 
                // ログイン
                <button onClick={handleLogout} className="ml-28">Logout</button>
                :
                <Link to="/auth" className="ml-28">ログイン/登録</Link>
                // ログアウト
            }
        </nav>
     );
}
 
export default Navbar;