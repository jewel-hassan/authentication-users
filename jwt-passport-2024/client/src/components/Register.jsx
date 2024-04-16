import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handlerSubmit =(e)=>{
        e.preventDefault()
       axios.post("http://localhost:5000/register",{username,password})
       .then(()=>{
        console.log("user is registerd")
        navigate("/login")
       })
       .catch((error)=>{
        console.log(error)
        navigate("/register")
       }) 

    }



    return (
        <div>
            <h1>Register page</h1>
         <form onSubmit={handlerSubmit}>
         <div>
           <input type="text" placeholder='Enter Username' value={username} onChange={(e)=>setUsername(e.target.value)} required />
           </div>
           <div>
           <input type="password" placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)} required />
           </div>
           <button type="submit">Register</button>
         </form>
        </div>
    );
};

export default Register;