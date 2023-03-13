import React, { useState, useEffect } from 'react';
export default function Searchbox({setinputValue}){


    function handleChange(e){
         setinputValue(e.target.value)
    }
    return(
        <>
        <input style={{ width: '400px',height: '20px',padding: '20px',marginLeft: '550px' }}placeholder='Search by Emp Name or ID' onChange={handleChange}/>
        </>
    )
}