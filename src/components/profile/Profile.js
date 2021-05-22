import { Link,useParams } from "react-router-dom";
import FetchData from "../../fetch/fetchData";

const Profile = ({authUser}) => {
    const {id} = useParams();
    // fetch user data
    const {data:user,error,loading} = FetchData(`accounts/${id}`)    

    return (        
        <div className="profile">
            { error && <span>読み込みに失敗しました😢</span> }
            {  loading || !user ? <div>読み込み中...</div> :         
            <div className="px-6">
                <h1 className="text-3xl text-left pb-12">プロフィール</h1>
                {/* { user.user.id === authUser.id && <Link to="/profile/create">プロフィールの編集</Link> } */}
                    <div className="flex flex-col items-center">
                        {/* User information */}                        
                        <img src={`http://127.0.0.1:8000${user.user.avatar}`} className="w-40 rounded" alt="avatar"/>
                        <h4 className="text-xl my-4">氏名：{user.user.fullname}</h4>
                        <p>Eメール：{user.user.email}</p>
                        {/* <button onClick={follow}>フォロー</button> */}
                        <p>{user.user.introduction}</p>            
                    </div>
                    <div className="py-24">
                        <h4 className="text-3xl text-left pb-12">保存した問題:</h4>                
                        {
                        user.savedProblems.length && user.savedProblems.map((problem,i) => (
                                <div key={i} className="flex flex-col items-center pb-10">
                                    <img src={`http://127.0.0.1:8000${problem.thumb}`} className="w-80 rounded" alt="thumb"/>
                                    <h6 className="text-lg my-6">{problem.title}</h6>
                                    <p>{problem.description}</p>
                                </div>
                            ))
                        }
                    </div>
            </div>            
        }
        </div>
     );
}
 
export default Profile;