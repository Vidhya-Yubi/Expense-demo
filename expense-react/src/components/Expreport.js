import React, { useState, useEffect } from "react"
import {  Link } from "react-router-dom";
// import Comments from "./Comments";
import Header from "./Header";
import './comments.css'
// import Header from "../../Dashboard/Header/Header"
import axios from "axios"
// import Searchbox from "../../Dashboard/Searchbox/Searchbox"
// import "./alljobs.css"


export default function Expreport() {

    let [exprepData, setExprepData] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            let res = await axios.get('/expreport')
            console.log("res", res.data)
            setExprepData(res.data.data)
        }
        fetchData()
    }, [])
    // function view_exp() {
    //     navigate("/expense");

    // }
    return (
        <>
        <Header />
        {/* <button onClick={logout_v}>Logout</button> 
        <button onClick={create_exp}>Add new expenses </button>     */}
        {/* <Link to="/adminexpense">
        <button> Go BACK!</button>
        </Link>   */}
      <h2> Hi, Welcome to expense reports!</h2>
      {/* <button style={{marginLeft: '1250px' }}className="comment-button" onClick={view_exp}> View Expenses</button> */}
      <Link to="/addrep">
        <button> Add Expense Report</button>
      </Link>
      <table>
                <thead>
                    <tr >
                        {/* <th>Employee name</th>
                        <th>Employee ID</th> */}
                        <th>Report name</th>
                        <th>DESCRIPTION</th>
                        {/* <th><button onClick={view_exp}> View Expenses</button></th> */}
                    </tr>
                </thead>
                {exprepData.length ? (exprepData.map((ele) =>
                (
                    < tbody >
                        <tr key={ele.id}>
                            <td className="exp_code_gj">{ele.reportname}</td>
                            {/* <td>{ele.emp_id}</td>
                            <td>{ele.reportname}</td> */}
                            <td>{ele.content}</td>
                            <td>
                            <Link to="/editrep" state={ele}>
                            <button>Edit Report</button>
                             </Link></td>
                             <td>
                             <Link to="/addexp" state={ele}>
                            <button>Add expense</button>
                             </Link>
                             </td>
                            <td>
                             <Link to="/expense" state={ele}><button> View Expenses</button></Link>
                            </td>
                            <td><Link to="/comments" state={ele}><button> Add comments</button></Link></td>
                            
                            {/* <td><button onClick={view_exp}> View Expenses</button>
                            </td> */}
                        </tr>
                    </tbody>

                )
                )) :
                    (<tbody>
                        <tr>
                            <td className="exp_code_gj">No data</td>
                            <td>No data</td>
                            {/* <td>No data</td>
                            <td>No data</td> */}
                            {/* <td>No data</td> */}
                        </tr>
                    </tbody >
                    )
                }
        </table>

        {/* <Comments /> */}
    </>
    )
}