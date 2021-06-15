import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FetchData from '../../fetch/fetchData';

const Modal = ({user,setModalToggle,init}) => {
    const [toggle, setToggle] = useState(init)
    const {data:followData,error,loading} = FetchData(`accounts/user/followers/${user.user.id}`)    

    // Done
    const done = (e) => {
        if(e.target.classList.contains('backdrop')){            
            setModalToggle(false);
        }
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
                                    <Link to={`/profile/${followedUser.id}`} className="cursor-pointer">                            
                                        <div className="flex items-center  hover:bg-gray-100 rounded">                                    
                                            <img src={`http://127.0.0.1:8000${followedUser.avatar}`} className="w-20 rounded" alt="avatar"/>
                                            <div className="mx-16">{followedUser.fullname}</div>
                                            <div>{followedUser.introduction}</div>
                                        </div>
                                    </Link>
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
                                    <Link to={`/profile/${follower.id}`} className="cursor-pointer">                            
                                        <div className="flex items-center  hover:bg-gray-100 rounded">                                    
                                            <img src={`http://127.0.0.1:8000${follower.avatar}`} className="w-20 rounded" alt="avatar"/>
                                            <div className="mx-16">{follower.fullname}</div>
                                            <div>{follower.introduction}</div>
                                        </div>
                                    </Link>
                                </div> 
                                ))) : 
                                <p>あなたをフォローしているユーザーはまだいません</p>
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