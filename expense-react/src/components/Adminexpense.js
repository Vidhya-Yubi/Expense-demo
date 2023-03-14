import React, { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
// import {Link} from "react-router-dom";

import axios from 'axios';
import Searchbox from "./Searchbox";
import Header from './Header';
import './adminexpense.css'

// import './expreport.css'

export default function Adminexpense() {
        const navigate = useNavigate();
        let [expenseData, setExpenseData] = useState([])
        let [upStatus, setUpStatus] = useState({});
        let [inputValue, setinputValue] = useState('')
        const handleUpdate = (e) => {
            setUpStatus({
                ...upStatus,
                [e.target.name]: e.target.value,
              });
        }
        console.log(upStatus);
        async function updateStatus(appid) {
            let send = await axios.put(`/approve/${appid}`)
            navigate('/adminexpense');

        }
        async function rejectStatus(rejid) {
            let send = await axios.put(`/rejected/${rejid}`)
        }
        useEffect(() => {
            const fetchData = async () => {
                let res = await axios.get("/expense")
                console.log("res", res.data)
                console.log("res", res.data.data)
                setExpenseData(res.data.data)
            }
            fetchData()
        }, [])
    

        async function logout_v() {

                let res = await axios.get('/logout');
                console.log(res, "res");
                navigate('/logout');
        }
        function create_v() {
                navigate("/signup");
 
        }
        function view_exp() {
            navigate("/expreport");

    }
        let filterData = expenseData.filter((ele) => ele.emp_id.toLowerCase() === inputValue.toLowerCase() ||ele.name.toLowerCase() === inputValue.toLowerCase());
        const getColor = (col_val) => {
            if (col_val === 'approved') {
              return 'green';
            } else if (col_val === 'rejected') {
              return 'red';
            } else {
              return 'orange';
            }
          };
        // const jobStyle = {
        //     color:colorcode
        // }

        return (
            <>
            <Header />
                <div className="land_v">
                    <div className="head_v">
                     <h1> Hi, Welcome Admin!</h1>   
                     <button onClick={create_v}style={{ height: '35px'}}>Add new employee </button>    
                     <button onClick={view_exp}style={{ height: '35px'}}>View Expense Report </button>    

                    {/* <button onClick={logout_v}>Logout</button>  */}
                    </div>
                    {/* <div className="sea_v"> */}
                     <Searchbox setinputValue={setinputValue} />
                    {/* </div> */}
                    {/* <label> Enter request no </label> */}
                    {/* <button onClick={view_exp}style={{ height: '35px', width: '150px'}}>View Expense Report </button>     */}

                    <div className="status_up">


                        {/* <input style={{marginRight: '10px',backgroundColor:'white' }}type="integer" placeholder="Enter Request No" name='id' onChange={handleUpdate}/>
                        <input style={{marginRight: '10px' }}type="submit" value="APPROVE"onClick={updateStatus} />
                        <input type="submit" value="REJECT"onClick={rejectStatus} /> */}

                    </div>
                
                  <table>
                <thead>
                    <tr><th>REQUEST NO</th><th>EMPLOYEE NAME</th><th>EMPLOYEE ID</th>
                        <th>DATE</th><th>AMOUNT</th><th>CATEGORY</th><th>DEPARTMENT</th><th>DESCRIPTION</th><th>STATUS</th>
                    </tr>
                </thead>
                {filterData.length ? (filterData.map((ele) =>
                (
                    < tbody >
                        <tr><td className="exp_code_gj">{ele.id}</td>
                            <td>{ele.name}</td>
                            <td>{ele.emp_id}</td>
                            <td>{ele.date}</td>
                            <td style={{ color: 'green' }}>{ele.amount}</td>
                            <td>{ele.category}</td>
                            <td>{ele.department}</td>
                            <td>{ele.description}</td>
                            <td style={{ color: getColor(ele.status) }}>{ele.status}</td>
                            <td><button onClick={() => updateStatus(ele.id)}>Approve</button></td>
                            <td><button onClick={() => rejectStatus(ele.id)}>Approve</button></td>

                        </tr>
                    </tbody>

                )
                )) : expenseData.map((ele) =>
                    (<tbody>
                        <tr>
                            <td className="exp_code_gj">{ele.id}</td>
                            <td>{ele.name}</td>
                            <td>{ele.emp_id}</td>
                            <td>{ele.date}</td>
                            <td style={{ color: 'green' }}>{ele.amount}</td>
                            <td>{ele.category}</td>
                            <td>{ele.department}</td>
                            <td>{ele.description}</td>
                            <td style={{ color: getColor(ele.status) }}>{ele.status}</td>
                            <td><button onClick={() => updateStatus(ele.id)}>Approve</button></td>
                            <td><button onClick={() => rejectStatus(ele.id)}>Reject</button></td>
                        </tr>
                    </tbody >
                    ))
                }
        </table>             

                </div>
                </>
        )
}