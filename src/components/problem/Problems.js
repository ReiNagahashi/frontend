import React, { useState,useEffect } from 'react'
import Create from './Create';

const Problems = () => {
    const base_url = window.SERVER_ADDRESS;

    const [problems, setProblems] = useState([])

    useEffect(() => {
        const getProblems = async() =>{
            const res = await fetch(base_url+'/problems/index');

            const data = await res.json();

            setProblems(data);
        }

        getProblems()
    }, [base_url,setProblems])
    return ( 
        <div className="Problems">
            <Create/>
            { problems.length? problems.map(problem => (
                <div className="problems" key={problem.id}>
                    <h3 className="title">{problem.title}</h3>
                    <p className="description">{problem.description}</p>                    
                    <img src={`${base_url}${problem.thumb}`} alt="thumbnail"/>
                </div>
            )) : <div>No problems</div>}

        </div>
     );
}
 
export default Problems;