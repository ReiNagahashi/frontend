import FetchData from "../../fetch/fetchData";
import { useParams,Link } from "react-router-dom";

const Single = (props) => {
    const {id} = useParams(); 
    const {data:problem,err,loading} = FetchData(`problems/${id}`);
    
    return ( 
        <div className="single">
            { problem.author ===  props.user_id && <Link to={`/problem/edit/${problem.id}`}>編集</Link>}
            {loading? <span>読み込み中...</span> 
            :
            (<div>
                <h2>{problem.title}</h2>
                <p>{problem.description}</p>
                <p>author:{problem.author}</p>
            </div>
            )}
            { err && (<div className="error">
                    読み込みに失敗しました。
            </div>)}
        </div>
     );
}
 
export default Single;