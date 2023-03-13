import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './signup.css';
import Header from "./Header";
import {Link} from "react-router-dom";


export default function Signup() {

  let [createAccData, setCreateAccData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCreateAccData({
      ...createAccData,
      [e.target.name]: e.target.value,
    });
    console.log(createAccData);
  };
 
  const sendData = async () => {
    console.log("test user creation", createAccData)
    // console.log("before axios")
    try {
      let res = await axios.post("/user", createAccData);
      console.log("res", res)
      console.log("status code", res.status)

      if (res.status === 201){
        navigate('/adminexpense');
      }else {
        navigate('/signup');
      }

      // navigate("/expreport");

    } catch (error) {
      console.log(error);
    }


  };
  return (
    <>
    <Header />
    <Link to="/adminexpense">
            <p>Go Back!</p>
    </Link> 
    <div className="acc_v">
    
      {/* <div className="contain_v"> */}
        <h2> Create New Employee Account:</h2>
        <div className="acc_details">
          <label> Enter Employee name </label><br></br>
          <input type="text" name="name" onChange={handleChange} /><br></br>
          <label> Enter email address </label><br></br>
          <input type="text" name="email" onChange={handleChange} /><br></br>
          <label> Enter Password </label><br></br>
          <input type="password" name="password" onChange={handleChange} /><br></br>
          <label> Enter Role </label><br></br>
          <input type="text" placeholder='normal/admin' name="usertype" onChange={handleChange} /><br></br>
          <label> Enter Department </label><br></br>
          <input type="text" name="department" onChange={handleChange} /><br></br>
          <label> Enter Work location </label><br></br>
          <input type="text" name="location" onChange={handleChange} /><br></br>
          <label> Enter Employee ID </label><br></br>
          <input type="text" name="emp_id" onChange={handleChange} /><br></br>
          <input type="Submit" className="acc_submit" value="Submit" onClick={sendData} />
        </div>
      {/* </div> */}

    </div>
    </>

  )
}