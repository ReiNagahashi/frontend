import React, { useState } from 'react';

const Create = ({problems,setProblems,setFlag,flag}) => {
    
    const base_url = window.SERVER_ADDRESS;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [thumb, setThumb] = useState('');

    const createProblem = async(e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('title',title);
        formData.append('description',description);
        formData.append('thumb',thumb);

        try{
            const res = await fetch(`${base_url}/problems/create/`,{
                method:"POST",
                headers:{              
                    Authorization : `JWT ${localStorage.getItem('token')}`
                },
                body:formData
            })
            const data = await res.json();

            setProblems([...problems,data]);
            setFlag(!flag)            
        }catch(err){
            console.log(err);
        }  

        alert("投稿が完了しました");
    }
    return ( 
        <form onSubmit={createProblem} encType="multipart/form-data">
            <label htmlFor="title">タイトル</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} name="title" id="title"/>
            <label htmlFor="description">内容</label>
            <textarea name="description" value={description} onChange={e => setDescription(e.target.value)} id="description" cols="40" rows="10"></textarea>    
            <label htmlFor="thumb">サムネイル</label>
            <input type="file" name="thumb" id="thumb" accept="image/png,image/jpeg" onChange={e => setThumb(e.target.files[0])}/>
            <input type="submit" value="送信"/>
        </form>
     );
}
 
export default Create;