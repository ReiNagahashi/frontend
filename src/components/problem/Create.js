import React, { useState } from 'react';

const Create = ({problems,setProblems,setFlag,flag}) => {
    
    const base_url = window.SERVER_ADDRESS;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [thumb, setThumb] = useState('');
    const [video, setVideo] = useState('');

    const createProblem = async(e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('title',title);
        formData.append('description',description);
        formData.append('thumb',thumb);
        formData.append('video',video);

        try{
            const res = await fetch(`${base_url}/problems/create/`,{
                method:"POST",
                headers:{              
                    Authorization : `JWT ${localStorage.getItem('token')}`
                },
                body:formData
            })
            const data = await res.json();
            // data = {...data,author:[author]}
            setProblems([...problems,data]);
            setFlag(!flag)            
        }catch(err){
            console.log(err);
        }  

        alert("投稿が完了しました");
    }
    return (
        <div className="w-4/5 mx-auto">
            <form onSubmit={createProblem} encType="multipart/form-data" className="flex flex-col card">                    
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} name="title" className="p-2 my-6 mx-32 form" placeholder="タイトル"/>                                                    
                <textarea name="description" value={description} onChange={e => setDescription(e.target.value)} cols="40" rows="3" placeholder="内容" className="p-2 mx-20 form"></textarea>                                    
                <div className="my-8 flex justify-between mx-20">
                    <label className="file p-2" htmlFor="thumb">
                        <span>画像を選択</span>
                        <input type="file" id="thumb" name="thumb" className="hidden" accept="image/png,image/jpeg" onChange={e => setThumb(e.target.files[0])}/>                
                    </label>
                    <label className="file p-2" htmlFor="video">
                        <span>動画を選択(任意)</span>
                        <input type="file" id="video" name="video" className="hidden" accept="video/*" onChange={e => setVideo(e.target.files[0])}/>                
                    </label>
                    <button className="btn bg-green-300">投稿</button>
                </div>
            </form>
        </div>
     ); 
}
 
export default Create;