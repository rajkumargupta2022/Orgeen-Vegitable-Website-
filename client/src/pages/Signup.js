
import { FaTimes, FaSearch, FaUser, FaKey, FaShoppingBag } from 'react-icons/fa';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

import axios from "axios";
// import { useHistory } from "react-router-dom";
const Signup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lname, setLname] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [msg, setMsg] = useState('');
  // const history = useHistory();


  const Register = async (e) => {
    e.preventDefault();

    try{
        await axios.post('http://localhost:5000/users', {
            email: email,
            name: name,
            lname: lname,
            password: password,
            confPassword: confPassword
        });
        
        toast("Registration Succesfully") 
        setEmail("");
        setName("");
        setLname("");
        setPassword("");
        setConfPassword("");
    } catch (error) {
        if (error.response) {
            setMsg(error.response.data.msg);
        }
    }


}

 
    return (

      <>
          <form  className="box" >
          <p style={{color: "red"}}>{msg}</p>
          <ToastContainer toastStyle={{ backgroundColor: "green" }} />

        <div className="input-group mb-3">
          <div className="input-group-prepend">

            <span className="input-group-text">@</span>
          </div>
          <input type="email" className="form-control" required placeholder="Username/email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text"><FaUser /></span>
          </div>
          <input type="text" className="form-control" required placeholder="First Name" value={name} onChange={(e) => setName(e.target.value)}/>
          <div className="input-group-prepend">
            <span className="input-group-text"><FaUser /></span>
          </div>
          <input type="text" className="form-control"  placeholder="Last Name"   value={lname} onChange={(e) => setLname(e.target.value)}/>
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text"><FaKey /></span>
          </div>
          <input type="password" className="form-control" minlength="8" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text"><FaKey /></span>
          </div>
          <input type="password" className="form-control" minlength="8" required placeholder="Confirm Password" value={confPassword} onChange={(e) => setConfPassword(e.target.value)}/>
        </div>
        <div>
          <ul classNameName='check'>
            <li><input type="checkbox" /><span className='ml-n3'>Subscribe to our newsletter</span></li>
            <li><input type="checkbox" /> <span className='ml-n3'>I accept the Terms of Service and Privacy Policy</span></li>
          </ul>
        </div>
        <button className='login-a-btn' onClick={Register} >SIGN UP</button>

</form>

      </>

    )
  }
export default Signup