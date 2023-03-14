import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import axios from "axios";
function Addcom() {
    const location = useLocation();
    const  rep = location.state;
    const navigate = useNavigate();
    let repid = rep.id    
    
    // async function handleDelete() {
    //     let deleteurl = 'http://127.0.0.1:3002/book/' + bookid
    //     console.log(deleteurl)
    //     let res = await axios.delete(deleteurl);
    //     alert(res.data);
    //     navigate("/")
        
  
    // }
    
    return (
        <div>
            {/* <p>Report Details</p>                         
            <h4>Report No: {rep.id}</h4>                                            
            <h4>Report Name: {rep.reportname}</h4>                                        
            <h4>Report Content: {rep.content}</h4>                     
           <button type="submit" onClick={handleDelete}>Delete Book</button> */}
         
        </div>
    )
}

export default Addcom;