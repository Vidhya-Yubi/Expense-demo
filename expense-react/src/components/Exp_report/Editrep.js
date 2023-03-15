import React from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { useState } from 'react';

function Editrep() {

    const location = useLocation();
    const rep = location.state;

    let repid = rep.id
    // const repName = rep.name
    // const repId = rep.emp_id
    const report = rep.reportname 
    const repContent = rep.content

    let [data, setData] = useState({ report,repContent });
    const navigate = useNavigate();

    const handleChange = (e) => {

        setData({
            ...data,
            [e.target.name]: e.target.value
        });

    }

    async function sendData() {
        // console.log(bookid);
        let updateurl = '/expreport/' + repid
        // console.log(updateurl)
        let res = await axios.put(updateurl, data);
        // alert(res.data);
        navigate("/expreport");

    }
    async function handleDelete() {
        let deleteurl = '/expreport/' + repid
        console.log(deleteurl)
        let res = await axios.delete(deleteurl);
        // alert(res.data);
        navigate("/expreport")
        
  
    }
    function create_exp() {
        navigate("/addexp");

    }
    

    return (
        <div className='editcontainer'>
            {/* <button onClick={create_exp}>Add new expenses </button>     */}

            <p>Edit Report Details</p>
            {/* <div>
                <input type="text" placeholder={repName} name="bookName" onChange={handleChange} />
            </div>
            <div>
                <input type="text" placeholder={repId} name="bookAuthor" onChange={handleChange} />
            </div> */}
            <div>
                <input type="text" placeholder={report} required="required" name="reportname" onChange={handleChange} />
            </div>
            <div>
                <input type="text" placeholder={repContent} required="required" name="content" onChange={handleChange} />
            </div>
            <div>
                <button type="submit" onClick={sendData}> Update Report</button>
            </div>
            <div>
            <button type="submit" onClick={handleDelete}>Delete Report</button>
            </div>
            {/* <Link to="/addcom">
            <button>Add comment</button>
            </Link> */}
        </div>
    )
}

export default Editrep