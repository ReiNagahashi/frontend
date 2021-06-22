import Axios from "axios";

const Follow = async(param,pk) => {
    const base_url = window.SERVER_ADDRESS;

        try{
            await Axios.post(base_url+'/accounts/user/follow/',{            
                'target':pk,
                'action':param            
            },{
                headers:{
                  'Authorization' : `JWT ${localStorage.getItem('token')}`,
                }
            })   
        }catch(err){
            console.log(err);
        }   

}
 
export default Follow;