import React, { useState } from "react"
import { useNavigate , useLocation} from "react-router-dom";
import axios from "axios";
import './signup.css';
import Header from "./Header";
import {Link} from "react-router-dom";
// import Fileup from './Fileup';


export default function Addexp() {
   const location = useLocation();
    const repo = location.state;
    let repoid = repo.id

  // let [addExpData, setAddExpData] = useState({});
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [invoicenumber, setInvoicenumber] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  
  // const handleFileChange = (event) => {
  //   setFile(event.target.files[0]);
  // };

  // const handleChange = (e) => {
  //   setAddExpData({
  //     ...addExpData,
  //     [e.target.name]: e.target.value,
  //   });
  //   console.log(addExpData);
  // };
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append("category", category);
    formData.append("invoicenumber", invoicenumber);
    formData.append("date", date);
    formData.append("amount",amount);
    formData.append("description",description);
    formData.append("expreport_id",repoid);


    axios.post('/expense', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {console.log(response.data)
    navigate("/expense")})
    .catch(error => console.log(error));
  };

  // const sendData = async () => {
  //   console.log("test user creation", addExpData)
  //   // console.log("before axios")
  //   try {
  //     let res = await axios.post("/expense", addExpData);
  //     console.log("res", res)
  //     console.log("status code", res.status)

  //     if (res.status === 201){
  //       navigate('/expense');
  //     }else {
  //       navigate('/addexp');
  //     }

  //     // navigate("/expreport");

  //   } catch (error) {
  //     console.log(error);
  //   }


  // };
  return (
    <>
    <Header />
    {/* <Link to="/expense">
            <p>Go Back!</p>
    </Link>  */}
    <div className="acc_v">
      
      {/* <div className="contain_v"> */}
        <h2> Add New Expenses:</h2>
        <div className="acc_details">
        {/* <input type="text" name="expreport_id" readOnly /><br></br> */}

          <label> Expense category </label><br></br>
          <input type="text" name="category" onChange={(e) => setCategory(e.target.value)} /><br></br>
          <label> Invoice number </label><br></br>
          <input type="text" name="invoicenumber" onChange={(e) => setInvoicenumber(e.target.value)} /><br></br>
          <label> Date </label><br></br>
          <input type="date" name="date" onChange={(e) => setDate(e.target.value)} /><br></br>
          <label> Amount </label><br></br>
          <input type="number" step="0.1" name="amount" onChange={(e) => setAmount(e.target.value)} /><br></br>
          <label> Description </label><br></br>
          <input type="text" name="description" onChange={(e) => setDescription(e.target.value)} /><br></br>
          <label> Attachments </label><br></br>
          <input type="file" name="file" onChange={(e) => setFile(e.target.files[0])} /><br></br>
          {/* <Fileup /> */}
          <input type="Submit" className="acc_submit" value="Submit" onClick={handleSubmit} />
           
        </div>
      {/* </div> */}

    </div>
    </>
  )
}