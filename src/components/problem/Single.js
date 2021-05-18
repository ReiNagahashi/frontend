import FetchData from "../../fetch/fetchData";
import { useParams,Link } from "react-router-dom";
import Problems from "./Problems";

const Single = (props) => {
    const {id} = useParams();     
    const {data:problem,err,loading} = FetchData(`problems/${id}`);
    return ( 
        <div className="single">
            { problem.author ===  props.user.id && <Link to={`/problem/edit/${problem.id}`}>編集</Link>}
            {loading? <span>読み込み中...</span> 
            :
            (<div>                
                <div className="flex justify-around px-6 mb-20">
                    {problem.video && (<video width="400px" className="rounded h-full self-center" controls>
                        <source src={problem.video} type="video/mp4"/>
                        !動画再生エラー!
                    </video>)}
                    <div>
                    <div className="card">
                        <div className="card flex flex-col text-left p-8">
                            <p>応募期間：　21/9/2022</p>
                            <p>調達/予定資金：　¥1,000,000/¥300,000</p>
                            <p>参加者：　20人</p>
                        </div>
                    </div>
                        <hr className="my-8 border border-gray-400"/>
                        <Link to={`/profile/${problem.author.id}`} className="card flex p-6">
                            <img className="h-16 rounded-full mr-4" src={problem.author.avatar} alt="avatar"/>
                            <div>
                                <h3>投稿者:{problem.author.fullname}</h3>     
                                <p>{problem.author.introduction}</p>                     
                            </div>
                        </Link>
                    </div>
                </div>
                {/* max-w-screen-md	mx-auto */}
                <div className="flex flex-col max-w-screen-md mx-auto">
                    <h2 className="text-3xl">{problem.title}</h2>
                    <img src={problem.thumb} alt="thumb" className="mt-24 mb-12 h-96 object-cover"/>
                    <p className="text-lg text-left">{problem.description}</p>
                </div>
                
            </div>
            )}
            { err && (<div className="error">
                    読み込みに失敗しました😢
            </div>)}
        </div>
     );
}
 
export default Single;