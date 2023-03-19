import React, { useState, useEffect } from "react";
import {  useLocation, Link} from "react-router-dom";
import axios from "axios";
import './comments.css'

function Comments() {
   const location = useLocation();
    const  exp2 = location.state;
    // const navigate = useNavigate();
    let repid = exp2.id    
  // let [addComm, setAddComm] = useState({});
  let [commData, setCommData] = useState([])
  const [comment, setComment] = useState("");
  
  const comment_add = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("comment", comment);
    formData.append("expreport_id",repid);


    axios.post('/comment', formData, {
      headers: {
        'Content-Type': 'application/json'
      }
      
    })
    .then(response => {console.log(response.data)
    alert("Comments added")
    })
    .catch(error => console.log(error));
  };

  useEffect(() => {
    const fetchData = async () => {
        let res = await axios.get("/comment/".concat(repid))
        console.log("res", res.data.data)
        setCommData(res.data)
    }
    fetchData()
  }, [])  
  // axios.post(
  //   url,
  //   {},
  //   {
  //     params: {
  //       key,
  //       checksum
  //     }
  //   }
  // )
  // .then(response => {
  //   return success(response);
  // })
  // .catch(error => {
  //   return fail(error);
  // });
  // const onChangeHandler = (e) => {
  //   setAddComm({
  //     ...addComm,
  //     [e.target.name]: e.target.value,
  //     // [e.target.expreport_id]: repid,
  //   });
  //   console.log(addComm);

  // };
  // const comment_add = async () => {
  //   console.log("test user creation", addComm)
  //   try {
  //     let res = await axios.post("/comment", addComm);
  //     console.log("res", res)
  //     console.log("status code", res.status)
  //     // navigate("/expreport");
  //     alert("Comment added");

  //   } catch (error) {
  //     console.log(error);
  //   }

  // };

  // const onClickHandler = () => {
  //   setComments((comments) => [...comments, comment]);
  // };

  return (
    <>
    <Link to="/expreport">
        <button> Go BACK!</button>
        </Link>
    <div className="main-container">
      
      {commData.length ? commData.map((text) => (
        // <div>{text.usname}</div>
        <div className="comment-container"><b>{text.usname}</b>: {text.comment}</div>
      )): <p>No Comments</p>}

      <div className="comment-flexbox">
        <h3 className="comment-text">Add Comment</h3>
        <input type="textarea" className="input-box" name="comment" onChange={(e) => setComment(e.target.value)} /><br></br>
        <input type="Submit" className="comment-button" value="Submit" onClick={comment_add} />
        
      </div>
    </div>
    </>
  );
}

export default Comments;