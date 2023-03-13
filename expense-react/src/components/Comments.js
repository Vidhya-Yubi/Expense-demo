import React, { useState, useEffect } from "react";
import axios from "axios";

import './comments.css'

function Comments() {
  let [addComm, setAddComm] = useState({});
  let [commData, setCommData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
        let res = await axios.get("/expreport")
        console.log("res", res.data.data)
        setCommData(res.data.data)
    }
    fetchData()
  }, [])  
  const onChangeHandler = (e) => {
    setAddComm({
      ...addComm,
      [e.target.name]: e.target.value,
    });
    console.log(addComm);

  };
  const comment_add = async () => {
    console.log("test user creation", addComm)
    try {
      let res = await axios.post("/expreport", addComm);
      console.log("res", res)
      console.log("status code", res.status)
      // navigate("/expreport");
      alert("Comment added");

    } catch (error) {
      console.log(error);
    }

  };

  // const onClickHandler = () => {
  //   setComments((comments) => [...comments, comment]);
  // };

  return (
    <div className="main-container">
      {commData.length ? commData.map((text) => (
        <div className="comment-container">{text.comment}</div>
      )): <p>No Comments</p>}
      <div className="comment-flexbox">
        <h3 className="comment-text">Add Comment</h3>
        <input type="textarea" className="input-box" name="comment" onChange={onChangeHandler} /><br></br>
        <input type="Submit" className="comment-button" value="Submit" onClick={comment_add} />
        
      </div>
    </div>
  );
}

export default Comments;