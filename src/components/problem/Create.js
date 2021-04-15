import React, { useState } from 'react';
import Axios from 'axios'

const Create = () => {
    const base_url = window.SERVER_ADDRESS;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const createProblem = async(e) => {
        e.preventDefault();
        const newProblem = {
            title:title,
            description:description,
            thumb:image
        }
        try{
            await Axios.post(`${base_url}/problems/create`,newProblem,{
                headers:{ 'content-type':'multipart/form-data' }
            })
        }catch(err){
            console.log(err);
        }
        
    }
    return ( 
        <form onSubmit={createProblem}>
            <label htmlFor="title">タイトル</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} name="title" id="title"/>
            <label htmlFor="description">内容</label>
            <textarea name="description" value={description} onChange={e => setDescription(e.target.value)} id="description" cols="40" rows="10"></textarea>    
            <label htmlFor="image">サムネイル</label>
            <input type="file" name="image" id="image" accept="image/png, image/jpeg" onChange={e => setImage(e.target.files[0])}/>
            <input type="submit" value="送信"/>
        </form>
     );
}
 
export default Create;