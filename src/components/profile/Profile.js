import { Link,useParams } from "react-router-dom";
import FetchData from "../../fetch/fetchData";

const Profile = ({authUser}) => {
    const {id} = useParams();
    // fetch user data
    const {data:user,error,loading} = FetchData(`accounts/${id}`)
    // const follow = async() => {
        
    // }
    return (        
        <div className="profile">
            {loading && <span>読み込み中...</span> }
            { error && <div>読み込みに失敗しました😢</div> }            
            { user.id === authUser.id && <Link to="/profile/create">プロフィールの編集</Link> }
            {/* User information */}
            <h1>ユーザー情報</h1>
            <h4>氏名：{user.fullname}</h4>
            <p>Eメール：{user.email}</p>
            {/* <button onClick={follow}>フォロー</button> */}
            <p>{user.introduction}</p>            
            <img src={user.avatar} alt="avatar"/>
        </div>
     );
}
 
export default Profile;