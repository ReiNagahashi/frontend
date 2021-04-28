import{ useState,useEffect } from 'react';

const FetchData = (url) => {
    const base_url = window.SERVER_ADDRESS;
    const [data, setdata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
 
    useEffect(() => {
        const fetchData = async () => {
            const abortCont = new AbortController();
            try{
                const res = await fetch(`${base_url}/${url}`,{
                    signal:abortCont.signal,
                    method:'GET',
                    headers : {
                        Authorization : `JWT ${localStorage.getItem('token')}`
                    }
                });
                if(!res.ok) throw Error("Failed fetching data...")
                
                const data = await res.json();
                setdata(data);
                setLoading(false);
                setError(null);
            }catch(err){
                if(err.name === "AbortError") console.log("Fetch Aborted");
                else{
                    setError(err.message);
                    setLoading(false);
                }
            }
            return () => abortCont.abort();
        }
        
        fetchData();

    }, [base_url,url])
    
    return { data,error,loading };
}
 
export default FetchData;