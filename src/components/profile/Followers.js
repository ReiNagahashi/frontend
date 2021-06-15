import React, { useState } from 'react';
const Followers = ({user}) => {
    const [toggle, setToggle] = useState(false)

    return ( 
        <div>
            { toggle?             
            (<div className="follows">
                {user.follows.map(followedUser => (
                   <div key={followedUser.id}>{followedUser}</div> 
                ))}
            </div>)    
            :
            (<div className="followers">
                {user.followers.map(follower => (
                   <div key={follower.id}>{follower}</div> 
                ))}
            </div>)
        }                        
        </div>
     );
}
 
export default Followers;