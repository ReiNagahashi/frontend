import { useEffect,useState} from 'react';
import { useHistory } from "react-router-dom";

import AddToBackend from '../../fetch/addToBackend';
const Form = ({user}) => {
    const [fullname, setFullname] = useState(null)
    const [introduction, setIntroduction] = useState(null)
    const [avatar, setAvatar] = useState("")
    const history = useHistory()
    
    useEffect(() => {
        setFullname(user.fullname)
        setIntroduction(user.introduction)
    }, [user])
    const updateUser = async(e) => {
        e.preventDefault()
        let formData = new FormData();
        formData.append('fullname',fullname);
        formData.append('introduction',introduction);
        formData.append('avatar',avatar);             
        formData.append('email',user.email);             

        await AddToBackend(`accounts/profile/create/${user.id}`,"PUT",formData);
        alert("プロフィールを更新しました");
        history.push("/");
    }
    return ( 
        <div>
            <form onSubmit={updateUser} encType="multipart/form-data">
                <label htmlFor="fullname">氏名</label>
                <input type="text" value={fullname || ""} onChange={e => setFullname(e.target.value)} name="fullname" id="fullname"/>
                <label htmlFor="introduction">自己紹介</label>
                <textarea name="introduction" value={introduction || ""} onChange={e => setIntroduction(e.target.value)} id="introduction" cols="40" rows="10"></textarea>    
                <label htmlFor="avatar">プロフィール</label>
                <input type="file" name="avatar" id="avatar" accept="image/png,image/jpeg" onChange={e => setAvatar(e.target.files[0])}/>
                
                { !avatar? <img src={"http://127.0.0.1:8000"+user.avatar} alt="avatar"/> 
                :  
                <p>プロフィール画像を変更しました。</p>
            }
                <input type="submit" value="送信"/>
            </form>
        </div>
     );
}
 
export default Form;     