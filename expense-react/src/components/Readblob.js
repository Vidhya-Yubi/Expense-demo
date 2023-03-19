import React, { useState, useEffect } from 'react';
import {  useLocation} from "react-router-dom";

// import axios from "axios";


function FileViewer({  }) {
  const [fileData, setFileData] = useState(null);
  const location = useLocation();
 const fileexp = location.state;
 let filid = fileexp.id
  

  useEffect(() => {
    fetch(`/files/${filid}/download`)
      .then(response => response.blob())
      .then(data => setFileData(data));
  }, [filid]);

  if (!fileData) {
    return <div>Loading...</div>;
  }

  if (fileData.type.includes('image')) {
    return <img style={{padding: '100px', textAlign: 'center'}}src={URL.createObjectURL(fileData)} />;
  } else if (fileData.type.includes('video')) {
    return <video src={URL.createObjectURL(fileData)} controls />;
  } else {
    return <div style={{padding: '100px', textAlign: 'center'}}><b>File not attached / Unsupported file type</b></div>;
  }

}


export default FileViewer