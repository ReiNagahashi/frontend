import { useState,useEffect } from "react";
import { Link,useParams,useHistory } from "react-router-dom";
import FetchData from "../../fetch/fetchData";
import Follow from "../../methods/follow";
import Modal from "../layout/Modal";

const Profile = ({authUser}) => {
    const {id} = useParams();
    const history = useHistory()
    //fetch user data
    const {data:user,error,loading} = FetchData(`accounts/${id}`);
    const [init, setInit] = useState(true)
    const [modalToggle, setModalToggle] = useState(false)   ; 
    
    const [isFollowed, setIsFollowed] = useState(false)
    const [followingsCnt, setFollowingsCnt] = useState(0)
    const [followersCnt, setFollowersCnt] = useState(0)

    // Initialize follow status
    useEffect(() => {
        try{            
            if(user.user.id === authUser.id && !authUser.fullname) history.push('/profile/create');
            
            user.user.followers.length?                
                setIsFollowed(user.user.followers.find(follower => follower.user_id === authUser.id) !== undefined)              
                :
                setIsFollowed(false)
            
            setFollowersCnt(user.user.followers.length);
            setFollowingsCnt(user.user.following.length);
        }
        catch(err){
            console.log(err);
        }
    }, [user,authUser,modalToggle])

    // Open modal
    const openModal = (msg) => {
        setInit(msg === "follow");
        setModalToggle(true);
    }
    //  Follow the user
    const followOrUnfollow = async(param) => {        
        Follow(param,id);      
        setIsFollowed(!isFollowed);
        setFollowersCnt(followersCnt+(param === "follow" ? 1 : -1));
    }
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
                        <div className="flex items-center my-8">
                            <h4 className="text-xl">氏名：{user.user.fullname}</h4>
                            { user.user.id !== authUser.id && (
                                <div className="ml-2">
                                    { isFollowed?
                                        <button onClick={() => followOrUnfollow("unfollow") } className="btn bg-gray-500 text-sm">解除</button> :<button onClick={() => followOrUnfollow("follow") } className="btn bg-green-600 text-sm mx-auto">フォロー</button>    
                                    }                                    
                                </div>                            
                            ) }
                        </div>
                        <div className="border-r border-b border-gray-500 p-2 shadow-lg">
                            <span onClick={() => openModal("follow") } className="cursor-pointer">フォロー: {followingsCnt}</span> 
                            <span className="h-10 mx-4 border border-gray-700"></span>
                            <span onClick={() => openModal("follower") } className="cursor-pointer">フォロワー: {followersCnt}</span>
                        </div>
                        <p className="my-5">Eメール：{user.user.email}</p>
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