import { useState } from "react";
import { Link,useParams } from "react-router-dom";
import FetchData from "../../fetch/fetchData";
import Modal from "../layout/Modal";

const Profile = ({authUser}) => {
    const base_url = window.SERVER_ADDRESS;
    const {id} = useParams();
    //fetch user data
    const [init, setInit] = useState(true)
    const {data:user,error,loading} = FetchData(`accounts/${id}`);
    const [modalToggle, setModalToggle] = useState(false)   ; 

    // Open modal
    const openModal = (msg) => {
        setInit(msg === "follow");
        setModalToggle(true);
    }
    //  Follow the user
    // const follow = (params) => {
    //     fetch(`${base_url}/accounts/user/follow/`,{

    //     })
    // }
    return (        
        <div className="profile">
            { error && <span>読み込みに失敗しました😢</span> }
            {  loading || !user ? <div>読み込み中...</div> :         
            <div className="px-6">
                <h1 className="text-3xl text-left pb-12">プロフィール</h1>
                { user.user.id === authUser.id && <Link to="/profile/create">プロフィールの編集</Link> }
                    <div className="flex flex-col items-center">
                        {/* User information */}                        
                        <img src={`http://127.0.0.1:8000${user.user.avatar}`} className="w-40 rounded" alt="avatar"/>
                        <h4 className="text-xl my-4">氏名：{user.user.fullname}</h4>
                        <div>
                            <span onClick={() => openModal("follow") } className="cursor-pointer">フォロー: {user.user.following.length}</span> 
                            <span className="h-10 mx-4 border border-gray-700"></span>
                            <span onClick={() => openModal("follower") } className="cursor-pointer">フォロワー: {user.user.followers.length}</span>
                        </div>
                        <p>Eメール：{user.user.email}</p>
                        {/* { user.user.id !== authUser.id && (
                            <div>
                                { user.user.followers.find(follower => follower.id === authUser.id)?
                                    <button onClick={() => follow("unfollow") }>解除</button> :<button onClick={() => follow("follow") }>フォロー</button>    
                                }
                                
                            </div>                            
                        ) } */}
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
                    <div className="modal">
                        { modalToggle && <Modal user={user} setModalToggle={setModalToggle} init={init}/> }
                    </div>            
                </div>
                
        }        
        </div>
     );
}
 
export default Profile;