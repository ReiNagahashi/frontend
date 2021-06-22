const AddToBackend = (url,method,data=null) => {
    const base_url = window.SERVER_ADDRESS;

    const addToBackend = async() => {      
        console.log("HEEEE",data);  
        try{
            await fetch(`${base_url}/${url}`,{
                method:method,
                headers:{              
                    Authorization : `JWT ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body:data
            })
        }catch(err){
            console.log(err);
        }   
    }
    addToBackend();
}
 
export default AddToBackend;