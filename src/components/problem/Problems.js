import React, { useState,useEffect } from 'react'
import { Link } from "react-router-dom";
import Create from './Create';

const Problems = ({logged_in}) => {

    const [problems, setProblems] = useState([])
    const [flag, setFlag] = useState(false)

    useEffect(() => {
        const base_url = window.SERVER_ADDRESS;

        const getProblems = async() =>{
            const res = await fetch(base_url+'/problems');

            const data = await res.json();
            console.log("DATA FETCHED");
            setProblems(data);

        }

        getProblems();
    }, [flag])
    return ( 
        <div className="Problems">
            { logged_in && <Create problems={problems} setProblems={setProblems} setFlag={setFlag} flag={flag}/> }
            { problems.length? problems.map(problem => (
                <div className="problems" key={problem.id}>
                    <h3 className="title">{problem.title}</h3>
                    <p className="description">{problem.description}</p>                    
                    {logged_in? 
                        (<Link to={`/problem/${problem.id}`}>  
                            <img height='100px' src={problem.thumb} alt="thumbnail"/>
                        </Link>)
                    :
                        (<Link to="/auth">
                            <img height='100px' src={problem.thumb} alt="thumbnail"/>
                        </Link>)
                    }

                </div>
            )) : <div>No problems</div>}

        </div>
     );
}
 
export default Problems;