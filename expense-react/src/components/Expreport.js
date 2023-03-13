import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Comments from "./Comments";
import Header from "./Header";
import './comments.css'
// import Header from "../../Dashboard/Header/Header"
import axios from "axios"
// import Searchbox from "../../Dashboard/Searchbox/Searchbox"
// import "./alljobs.css"


export default function Expreport() {
    const navigate = useNavigate();

    let [exprepData, setExprepData] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            let res = await axios.get('/expreport')
            console.log("res", res.data)
            setExprepData(res.data.data)
        }
        fetchData()
    }, [])
    function view_exp() {
        navigate("/expense");

    }
    return (
        <>
        <Header />
        {/* <button onClick={logout_v}>Logout</button> 
        <button onClick={create_exp}>Add new expenses </button>     */}

      <h2> Hi User, Welcome to expense reports!</h2>
      <button style={{marginLeft: '1250px' }}className="comment-button" onClick={view_exp}> View Expenses</button>
      <table>
                <thead>
                    <tr><th>Report name</th>
                        <th>DESCRIPTION</th>
                        {/* <th><button onClick={view_exp}> View Expenses</button></th> */}
                    </tr>
                </thead>
                {exprepData.length ? (exprepData.map((ele) =>
                (
                    < tbody >
                        <tr><td className="exp_code_gj">{ele.reportname}</td>
                            <td>{ele.content}</td>
                        </tr>
                    </tbody>

                )
                )) :
                    (<tbody>
                        <tr>
                            <td className="exp_code_gj">No data</td>
                            <td>No data</td>
                            {/* <td>No data</td> */}
                        </tr>
                    </tbody >
                    )
                }
        </table>

        <Comments />
    </>
    )
}