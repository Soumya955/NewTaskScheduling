import React, { useState } from 'react'
import "./Css-for-Pages/SignUpPage.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate=useNavigate();
  
    function handleSubmit(event) {
      event.preventDefault();
      const payload = {
        firstname,
        lastname,
        email,
        password,
      };
      return axios
        .post("http://localhost:8080/api/signup", payload)
        .then((res) => {
          navigate("/");
        })
        .catch((err) => {
          console.log(err)
        });
    }
  
    return (
      <div>
        
        <form onSubmit={handleSubmit}>
        <h2>Sign up</h2>
        <label >FirstName:</label>
          <input
            type="text"
            value={firstname}
            onChange={(event) => setFirstName(event.target.value)}
            required
          />
          <label >LastName:</label>
          <input
            type="text"
            value={lastname}
            onChange={(event) => setLastName(event.target.value)}
            required
          />
          
          <label >Email:</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <label >Password:</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <button type="submit">Sign up</button>
        </form>
      </div>
    );
}
