import React, { useState, useEffect } from "react";
import { useNavigate ,useLocation, Link} from "react-router-dom";
import axios from 'axios';
import Header from "./Header";
import './expense.css';

const Expense = () => {
    const location = useLocation();
    const re = location.state;
    let expid1 = re.id
    const navigate = useNavigate();
    let [expenseData, setExpenseData] = useState([])
    let [delStatus, setDelStatus] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            let res = await axios.get("/viewexp/".concat(expid1))
            console.log("res", res.data.data)
            setExpenseData(res.data)
        }
        fetchData()
    }, [])
    // const handleDelete = (e) => {
    //     setDelStatus({
    //         ...delStatus,
    //         [e.target.name]: e.target.value,
    //       });
    //     // alert("Expense deleted");  
    // }
    async function delete_exp(delid) {
        let send = await axios.delete(`/expense/${delid}`)
    }
    // async function delete_exp() {
    //     let send = await axios.delete(`/expense/${delStatus.id}`, delStatus)
    // }
    // alert(`Expense ${delStatus.id} deleted!`) 
    // async function logout_v() {

    //     let res = await axios.get('/logout');
    //     console.log(res, "res");
    //     navigate('/logout');
    // }
    // function create_exp() {
    //     navigate("/addexp");

    // }
    // function update_exp() {
    //     navigate("/updateexp");

    // }
    const getColor = (col_val) => {
        if (col_val === 'approved') {
          return 'green';
        } else if (col_val === 'rejected') {
          return 'red';
        } else {
          return 'orange';
        }
      };
  return (
    <>
        <Header />
        <h2 style={{padding: '5px'}}> Hi, Welcome user!</h2>

        {/* <button onClick={logout_v}>Logout</button>  */}
        <div className="exp_vid">
        {/* <button onClick={create_exp}>Add new expenses </button>     */}
        {/* <button onClick={update_exp}>Update expenses </button> */}
        {/* <h3> Enter id of expense to be Deleted:</h3>  */}
        {/* <input type="integer" placeholder="Enter ID NO to delete" name='id' onChange={handleDelete}/>   
        <button onClick={delete_exp}>Delete expenses </button>     */}
        </div>

      <table>
                <thead>
                    <tr><th>ID NO</th><th>CATEGORY</th><th>DATE</th><th>AMOUNT</th>
                        <th>INVOICE NUMBER</th><th>DESCRIPTION</th><th>STATUS</th>
                    </tr>
                </thead>
                {expenseData.length ? (expenseData.map((ele) =>
                (
                    < tbody >
                        <tr key={ele.id}>
                            <td>{ele.id}</td>
                            <td className="exp_code_gj">{ele.category}</td>
                            <td>{ele.date}</td>
                            <td style={{ color: 'green' }}>{ele.amount}</td>
                            <td>{ele.invoicenumber}</td>
                            <td>{ele.description}</td>
                            <td style={{ color: getColor(ele.status) }}>{ele.status}</td>
                            <td>
                             <Link to="/updateexp" state={ele}>
                            <button>Update expense</button>
                             </Link>
                             </td>
                            <td><button onClick={() => delete_exp(ele.id)}>Delete</button> </td>
                         
                        </tr>
                    </tbody>

                )
                )) :
                    (<tbody>
                        <tr>
                            <td className="exp_code_gj">No data</td>
                            <td>No data</td>
                            <td>No data</td>
                            <td>No data</td>
                            <td>No data</td>
                            <td>No data</td>
                            <td className="exp_status_gj">No data</td>
                        </tr>
                    </tbody >
                    )
                }
        </table>

    </>
  )
}

export default Expense
