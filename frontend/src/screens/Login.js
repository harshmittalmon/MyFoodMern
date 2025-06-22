import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import BASE_URL from '../config';
export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", address: "" });
  let navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/api/loginuser`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    console.log(json);
    if ( !json.sucess ) {
      alert("Enter Valid Credentials ");
    }

    if( json.sucess ){
      console.log(credentials.email);
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }

  }
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='email' value={credentials.email} onChange={onChange} />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name='password' value={credentials.password} onChange={onChange} />
        </div>

        <button type="submit" className="m-3 btn btn-primary">Submit</button>
        <Link to="/createuser" className='m-3 btn btn-danger'>I'm a new user</Link>
      </form>
    </div>
  )
}
