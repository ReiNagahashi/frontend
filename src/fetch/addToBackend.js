const AddToBackend = (name,method,data=null) => {
    const base_url = window.SERVER_ADDRESS;

    const addToBackend = async() => {        
        try{
            await fetch(`${base_url}/${name}`,{
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