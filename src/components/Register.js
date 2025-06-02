import React, { useState } from 'react';
import { Link,  useNavigate } from 'react-router-dom';

const Register = () => {
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });
  const navigate=useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // to accept/set cookies
      body: JSON.stringify(registerData),
    });
    const data = await res.json();
     if(res.ok){
      navigate("/dashboard");
    }
    alert(data.message || "Registered");
  };

 

  return (
    <div style={{ padding: 30 }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Name" value={registerData.name} required
          onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })} /><br />
        <input type="email" placeholder="Email" value={registerData.email} required
          onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} /><br />
        <input type="password" placeholder="Password" value={registerData.password} required
          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} /><br />
        <button type="submit">Register</button>
      </form>
<h3>Already Registered? <Link to="/login" style={{color:"blue"}}>Login</Link></h3>
     
    </div>
  );
};

export default Register;
