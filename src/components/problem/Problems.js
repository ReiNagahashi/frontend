import React, { useState,useEffect } from 'react'
import { Link } from "react-router-dom";
import Create from './Create';

const Problems = ({logged_in}) => {

    const [flag, setFlag] = useState(false)
    const [problems, setProblems] = useState([])
    useEffect(() => {
        const base_url = window.SERVER_ADDRESS;

        const getProblems = async() =>{
            const res = await fetch(base_url+'/problems');

            const data = await res.json();
            console.log("DATA FETCHED");
            setProblems(data);
        }

        getProblems();
    }, [flag,setProblems])

    return ( 
        <div className="Problems max-w-screen-md mx-auto">
            <h2 className="text-3xl text-left mb-24">問題提起</h2>
            { logged_in && <Create problems={problems} setProblems={setProblems} setFlag={setFlag} flag={flag}/> }
            { problems.length? problems.map(problem => (
                <div className="flex flex-col my-36" key={problem.id}>                     
                    <Link to = {`/problem/${problem.id}`} className="h-72">  
                        <img src={problem.thumb} className="h-full w-full object-cover rounded" alt="thumbnail"/>
                    </Link>
                    <div className="h-36 pt-10 px-20">
                        <h3 className="text-3xl mb-6">{problem.title}</h3>
                        <p className="text-lg text-left">{problem.description}</p>                         
                    </div>
                </div>
            )) : <div>No problems</div>}

        </div>
     );
}
 
export default Problems;