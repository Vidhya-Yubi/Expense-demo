import React, {useState} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import Header from './Header';

const Updateexp = () => {
        // let [exp, setExp] = useState({});
        const [file, setFile] = useState(null);
        const [category, setCategory] = useState("");
        const [invoicenumber, setInvoicenumber] = useState("");
        const [date, setDate] = useState("");
        const [amount, setAmount] = useState("");
        const [id, setId] = useState("");
        const [description, setDescription] = useState("");        // const handleChange = (e) => {
        //     // let no = e.target.id;
        //     setExp({
        //         ...exp,
        //         [e.target.name] : e.target.value
        //     })

        // }
        // console.log(exp);
        const handleSubmit = (event) => {
            event.preventDefault();
        
            const formData = new FormData();
            formData.append('file', file);
            formData.append("category", category);
            formData.append("invoicenumber", invoicenumber);
            formData.append("date", date);
            formData.append("amount",amount);
            formData.append("description",description);
            formData.append("id",id);

        
            axios.put(`/expense/${id}`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then(response => console.log(response.data))
            .catch(error => console.log(error));
          };
        // async function update_ex() {

        //     let send = await axios.put(`/expense/${exp.id}`, exp)
        //     console.log(send.exp);
        //     alert(`Expense ${exp.id} updated successfully!`)
        // }
    return (
        <>
        <Header />
        <Link to="/expense">
            <p>Go Back!</p>
        </Link>    
        
        <div>
            <div className="acc_v">
            <h2> Enter expense id and details to update:</h2>
        {/* <div className="contain_v"> */}
         <div className="acc_details">
         <label> Expense ID </label><br></br>
          <input type="integer" name="id" onChange={(e) => setId(e.target.value)} /><br></br>
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
            
        </div>
        </div>
        </>
    );
}

export default Updateexp;