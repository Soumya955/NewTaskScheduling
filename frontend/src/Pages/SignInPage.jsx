import React, { useState } from 'react'
import "./Css-for-Pages/SignInPage.css"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading,setLoading]=useState(false)

    const navigate=useNavigate();

  
    function handleSubmit(event) {
      event.preventDefault();
      const payload = {
        email,
        password,
      };
      setLoading(true)
      return axios
        .post("https://busy-coveralls-duck.cyclic.app/api/signin", payload)
        .then((res) => {
            localStorage.setItem("user",JSON.stringify(res.data.user))
            if(res.data.token){
                Swal.fire({
                  title: 'Success!',
                  text: 'You have logged in successfully.',
                  icon: 'success',
                  confirmButtonText: 'OK',
                });
                    setLoading(false)
                    navigate("/dashboard")
              }else{
                setLoading(false)
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
        
        {loading? <h3>...submitted</h3>:<form onSubmit={handleSubmit}>
        <h2>Sign In</h2>
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
          <button type="submit">Sign In</button>
          <h4>Don't have an account ? <Link to={"/signup"}>SignUp</Link></h4>
        </form>}
      </div>
    );
}
