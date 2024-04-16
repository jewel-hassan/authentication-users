import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handlerSubmit =(e)=>{
        e.preventDefault()
       axios.post("http://localhost:5000/login",{username,password})
       .then((user)=>{
        localStorage.setItem("token",user.data.token)
        console.log(user)
        console.log("user is registerd")
        navigate("/profile")
       })
       .catch((error)=>{
        console.log(error)
        navigate("/login")
       }) 

    }
    return (
        <div>
        <h1>Login page</h1>
     <form onSubmit={handlerSubmit}>
     <div>
       <input type="text" placeholder='Enter Username' value={username} onChange={(e)=>setUsername(e.target.value)} required />
       </div>
       <div>
       <input type="password" placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)} required />
       </div>
       <button type="submit">Login</button>
     </form>
    </div>
    );
};

export default Login;