import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import BASE_URL from '../config';
export default function Signup() {
    const [credentials, setCredentials] = useState({ name: "", email: "", address: "", password: "" });
    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch(`${BASE_URL}/api/createuser`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.address })
        });
        const json = await response.json()
        console.log(json);
        if (!json.success) {
            alert("Enter Valid Credentials ");
        }
    }
    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    }
    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter Name" name='name' value={credentials.name} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='email' value={credentials.email} onChange={onChange} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name='password' value={credentials.password} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleAddress">Address</label>
                    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Address" name='address' value={credentials.address} onChange={onChange} />
                </div>
                <button type="submit" className="m-3 btn btn-primary">Submit</button>
                <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
            </form>
        </div>
    )
}
