import React, { useState } from 'react'
import "./Css-for-Pages/SignUpPage.css"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUpPage() {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading,setLoading]=useState(false)

    const navigate=useNavigate();
  
    function handleSubmit(event) {
      event.preventDefault();
      const payload = {
        firstname,
        lastname,
        email,
        password,
      };
      setLoading(true)
      return axios
        .post("https://busy-coveralls-duck.cyclic.app/api/signup", payload)
        .then((res) => {
          navigate("/");
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
        });
    }
  
    return (
      <div>
        
       {loading? <h3>...submitted</h3>:<form onSubmit={handleSubmit}>
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
          <h4>Want to login ? <Link to={"/"}>SignIn</Link></h4>
        </form>}
      </div>
    );
}
