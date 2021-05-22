import { useState,useEffect } from 'react';
// import LikeData from "../../methods/likeData";
import AddToBackend from '../../fetch/addToBackend';

const LikeBtn = ({singleData,user}) => {
    const [isLiked, setIsLiked] = useState(false)
    const [element, setElement] = useState(singleData ? singleData : "")
    useEffect(() => {
        setIsLiked(element.likes.findIndex(like => like.id === user.id) !== -1);        
    }, [setElement,element,user,setIsLiked,singleData])

    const saveProblem = async(e) =>{
        e.preventDefault();
    
        await AddToBackend('problems/like/','POST',JSON.stringify(element.id));

        isLiked? setElement({...element,likes:element.likes.filter(like => like.id !== user.id)}) :
                 setElement({...element,likes:[...element.likes,{"id":user.id}]})

    }
    return ( 
        <div>
            {  isLiked? 
                (<button className="btn w-36 text-lg bg-gray-400" onClick={saveProblem}>取り消し<span>|{element.likes.length}|</span></button>):
                (<button className="btn w-36 text-lg bg-pink-400" onClick={saveProblem}>保存する<span>|{element.likes.length}|</span></button>)  
            }
        </div>
     );
}
 
export default LikeBtn;