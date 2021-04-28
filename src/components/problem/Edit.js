import React, { useState,useEffect } from 'react';
import { useParams,useHistory } from "react-router-dom";
import FetchData from "../../fetch/fetchData";
import AddToBackend from "../../fetch/addToBackend";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

const Edit = () => {
    const {id} = useParams();
    const history = useHistory();
    const {data:problem,error,loading} = FetchData(`problems/edit/${id}`);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [thumb, setThumb] = useState("");
    const [err, setErr] = useState(error);
    const preThumb = problem.thumb;

    useEffect(() => {
        try{
            setTitle(problem.title);
            setDescription(problem.description);
            setThumb(problem.thumb);
        }catch(err){
            setErr(err)
        }
        
    }, [problem])
// update problem
    const updateProblem = async(e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('title',title);
        formData.append('description',description);
        formData.append('thumb',thumb);
             
        await AddToBackend(`problems/update/${id}`,"PUT",formData);

        alert("投稿が完了しました");
        history.push(`/problem/${id}`)
    }

// delete problem
const deleteProblem = () =>{
    confirmAlert({
        title: '確認',
        message: '本当に削除してもよろしいですか？',
        buttons: [
          {
            label: '削除',
            onClick: async() =>  {
                await AddToBackend(`problems/delete/${id}`,"DELETE",null);
                
                history.push("/problems")
            }
          },
          {
            label: '戻る',
            onClick: () => false
          }
        ]
      });   
}


    return ( 
        <div className="edit">
            {loading? <span>読み込み中...</span> 
            :
            // 編集
            (<form onSubmit={updateProblem} encType="multipart/form-data">
                <label htmlFor="title">タイトル</label>               
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} name="title" id="title"/>
                <label htmlFor="description">内容</label>
                <textarea name="description" value={description} onChange={e => setDescription(e.target.value)} id="description" cols="40" rows="10"></textarea>    
                <label htmlFor="thumb">サムネイル</label>
                <input type="file" name="thumb" id="thumb" accept="image/png,image/jpeg" onChange={e => setThumb(e.target.files[0]
                    )}/>
                {thumb === preThumb ? <div>現在の画像:</div> : <div>画像を変更しました</div>}
                {thumb === preThumb && <img height='100px' src={thumb} alt="thumbnail"/>}
                <input type="submit" value="送信"/>
            </form>)}
            {/* 削除 */}
            <button onClick={deleteProblem}>削除</button>
            {/* エラー */}
            {err && <h3>接続に失敗しました😢</h3>}
        </div>
     );
}
 
export default Edit;