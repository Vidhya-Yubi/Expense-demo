import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './login.css'

import axios from 'axios';

const Login = () => {
    let [ldata, setLdata] = useState({});
    const navigate = useNavigate();

    function handleLogin(e) {
        setLdata({
            ...ldata,
            [e.target.name]: e.target.value
        });
    }
    console.log("ldata", ldata);

    async function sendLogin() {

        console.log(ldata);
        let res = await axios.post("/login", ldata)
        console.log(res, "res");
        console.log(res.data, "res");
        if (res.data.data === "1"){
            navigate('/adminexpense');
        }else {
            navigate('/expreport');
        }

        // if (res.status ===200){
        //     navigate('/landing');
        // } else{
        //     alert("Wrong username and password");

        // }

    }
   
    return (
        <>
        <div className="logo">
        <img src="/images/yubi.jpeg" alt="HV_logo" height='70px' width='150px' />
        <h1> Welcome to Vidhya's Expense Tracker!</h1>

        </div>

        <div className="login_v">
            {/* <div className="container_v"> */}
           
                <h2> Login details:</h2>
                <div className="login_details">

                    <br></br>
                    <label> E-mail ID: </label>
                    <input type="text" id="email" placeholder='email' name='email' onChange={handleLogin} /><br></br>
                    <label> Password: </label>
                    <input type="password" id="pass" placeholder='password' name='password' onChange={handleLogin} /><br></br>
                    <input type="submit" className="login_submit" onClick={sendLogin} />
                </div>


            {/* </div> */}



        </div>
        </>
    );
}

export default Login;