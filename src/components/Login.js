import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

const Login = () => {
  
  const [loginData, setLoginData] = useState({ email: '', password: '' });

const navigate=useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(loginData),
    });
    const data = await res.json();
    localStorage.setItem("token",data.token);
    if(res.ok){
      navigate("/dashboard");
    }
    alert(data.message);
  };

  return (
    <div style={{ padding: 30 }}>
      

      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={loginData.email} required
          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} /><br />
        <input type="password" placeholder="Password" value={loginData.password} required
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} /><br />
        <button type="submit">Login</button>
      </form>
      <h3>Do not have account? <Link to="/" style={{color:"blue"}}>Register</Link></h3>
    </div>
  );
};

export default Login;
