import React from "react"
import "./header.css"
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Header() {
        const navigate = useNavigate();

        async function logout_v() {

                let res = await axios.get('/logout');
                console.log(res, "res");
                navigate('/logout');
        }

        return (
                <div className="fullheader_v">
                    <div className="h_section1">
                                <div className="logo">
                                        <img src="/images/yubi.jpeg" alt="HV_logo" height='80px' width='150px' />
                                </div>
                    </div>
                    {/* <img src="/images/yubi.png" alt="HV_logo" height='40px' width='100px' /> */}
                    <div className="h_section2">                   
                     <div onClick={logout_v}>Logout</div>
                    </div>

                </div>
        )
}