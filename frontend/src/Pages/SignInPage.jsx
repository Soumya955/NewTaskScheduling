import React, { useState } from 'react'
import "./Css-for-Pages/SignInPage.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate=useNavigate();

  
    function handleSubmit(event) {
      event.preventDefault();
      const payload = {
        email,
        password,
      };
      return axios
        .post("http://localhost:8080/api/signin", payload)
        .then((res) => {
            console.log(res)
            if(res.data.token){
                Swal.fire({
                  title: 'Success!',
                  text: 'You have logged in successfully.',
                  icon: 'success',
                  confirmButtonText: 'OK',
                });
                    navigate("/dashboard")
              }else{
                Swal.fire({
                    title: 'Warning!',
                    text: 'Invalid Credential.',
                    icon: 'warning',
                    confirmButtonText: 'OK',
                  })
              }
          })
          .catch((err) => Swal.fire({
            title: 'Warning!',
            text: 'Invalid Credential.',
            icon: 'warning',
            confirmButtonText: 'OK',
          }))
    }
  
    return (
      <div>
        
        <form onSubmit={handleSubmit}>
        <h2>Sign up</h2>
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
