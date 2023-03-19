import React from 'react'
import Axios from "axios";
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './addrep.css'

function Addrep() {

    let [data, setData] = useState({});
    const navigate = useNavigate();
    const handleChange = (e) => {

        setData({
            ...data,
            [e.target.name]: e.target.value
        });
        console.log(e.target.value);
    }


    async function sendData() {
        try {
             let res = await Axios.post('/expreport', data);
            res.data ? alert(res.data.message) : alert("Report Addition failed")
            navigate("/expreport")
            } catch (error) {
                alert("Report Addition failed")
                // navigate("/expreport")
            }
        }

return (
    <> 
    <Link to="/expreport">
    <p>Go Back!</p>
     </Link> 
    <div className='addcontainer'><b style={{fontSize: '25px'}}>Add expense Report Details:</b><br></br>
        <div>
            <label> Report Name </label><br></br>
            <input type="text"  name="reportname" onChange={handleChange} required="true" />
        </div>
        <div>
            <label> Report Description </label><br></br>
            <input type="text"  name="content" onChange={handleChange} required="true"/>
        </div>
        <div>
            <button onClick={sendData}>Add Expense Report</button>
        </div>
    </div>
    </>
)
}

export default Addrep;