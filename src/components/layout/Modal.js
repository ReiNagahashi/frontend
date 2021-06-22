import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import FetchData from '../../fetch/fetchData';
import Follow from '../../methods/follow';

const Modal = ({user,setModalToggle,init}) => {
    const [toggle, setToggle] = useState(init)
    const {data:followData,error,loading} = FetchData(`accounts/user/followers/${user.user.id}`)    
    const [followings, setFollowings] = useState([])
    // Initialize follow status
    useEffect(() => {
        if(followData){
            try{
                setFollowings(followData.following.map(followedUser => followedUser.id))
            }
            catch(err){
                console.log(err);
            }
        }
    }, [setFollowings,followData])
    // Close modal
    const done = (e) => {
        if(e.target.classList.contains('backdrop')){            
            setModalToggle(false);
        }
    }
    //  Follow the user
    const followOrUnfollow = async(param) => {                
        Follow(param,user.user.id);      
        setFollowings(followData.following.filter(followedUser => followedUser.id !== user.user.id));        
    }

    return ( 
        <div onClick={done} className="backdrop fixed flex justify-center items-center inset-0 bg-black bg-opacity-75">
            <div className="card w-4/6 h-4/5 p-5">
                <div className="flex mb-20">
                    <button onClick={() => setToggle(!toggle)} className={`flex-1 text-center block rounded py-2 px-4 focus:outline-none  hover:bg-green-200 ${ toggle? 'bg-green-500 text-white' : 'text-black hover:text-white'}`}>フォロー</button>
                    <button onClick={() => setToggle(!toggle)} className={`flex-1 text-center block rounded py-2 px-4 focus:outline-none hover:bg-green-200 ${ !toggle? 'bg-green-500 text-white' : 'text-black hover:text-white'}`}>フォロワー</button>
                </div>
                { loading? 
                
                    <div>ユーザ情報を取得中...</div>        
                    :
                    <div className="overflow-scroll">
                        
                        { toggle?             
                        // Users you following
                        (<div className="following">
                            {followData.following.length ? (followData.following.map(followedUser => (
                                <div key={followedUser.id}>
                                    <hr className="my-5"/>
                                    <div className="grid grid-cols-5 items-center">                                    
                                        <Link to={`/profile/${followedUser.id}`} className="col-span-4 flex items-center hover:bg-gray-100 rounded">                            
                                                <img src={`http://127.0.0.1:8000${followedUser.avatar}`} className="w-20 rounded" alt="avatar"/>
                                                <div className="mx-16">{followedUser.fullname}</div>
                                                <div className="text-xs">{followedUser.introduction}</div>
                                        </Link>
                                        <div className="justify-self-end">
                                            { followings.includes(followedUser.id)? 
                                                    <button onClick={() => followOrUnfollow('unfollow')} className="btn bg-gray-500 text-sm mx-auto">取り消し</button> : 
                                                    <button onClick={() => followOrUnfollow('follow')} className="btn bg-green-600 text-sm mx-auto">フォロー</button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))) : 
                            <p>フォローしているユーザーはまだいません</p>
                            }
                        </div>)    
                        :
                        // Users following you
                        (<div className="followers">
                            {followData.followers.length ? (followData.followers.map(follower => (
                                 <div key={follower.id}>
                                    <hr className="my-5"/>
                                    <div className="flex items-center">                                    
                                        <Link to={`/profile/${follower.id}`} className="flex items-center  hover:bg-gray-100 rounded">                            
                                            <img src={`http://127.0.0.1:8000${follower.avatar}`} className="w-20 rounded" alt="avatar"/>
                                            <div className="mx-16">{follower.fullname}</div>
                                            <div className="text-xs">{follower.introduction}</div>
                                        </Link>
                                        { followings.includes(follower.id)? 
                                            <button onClick={() => followOrUnfollow('unfollow')} className="btn bg-gray-500 text-sm mx-auto">取り消し</button> : 
                                            <button onClick={() => followOrUnfollow('follow')} className="btn bg-green-600 text-sm mx-auto">フォロー</button>
                                        }                                        
                                    </div>
                                </div> 
                            ))) : 
                            <p>フォローしているユーザーはまだいません</p>
                            }
                        </div>)
                        }                        
                    </div>
                }                
                { error && <div>エラーが発生しました😭</div> }
            </div>
        </div>
     );
}
 
export default Modal;