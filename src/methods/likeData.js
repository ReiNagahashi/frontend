import{ useState,useEffect } from 'react';
import AddToBackend from '../../fetch/addToBackend';

const LikeData = (id) => {
    const base_url = window.SERVER_ADDRESS;

    const likeData = async() => {
        AddToBackend('problems/like/','POST',id);
    }
    likeData();
}
 
export default LikeData;