import React, { useState } from 'react'
import { FaTimes, FaSearch, FaUser, FaKey, FaShoppingBag } from 'react-icons/fa';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import { useHistory } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const history = useHistory();

  const Auth = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/login', {
        email: email,
        password: password
      }).then((res)=>{
        console.log("qqqqq",res.data);

        localStorage.setItem('email', email);
        localStorage.setItem('TOKEN', res.data.token);
        localStorage.setItem('REFRESHTOKEN', res.data.refreshToken);
      })
      toast("Login Succesfully")
      //  history.push("/dashboard");
      
      window.location.reload(false);


    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);

      }
    }
   

  }
//  console.log(window.localStorage.getItem('email'))
  return (
    
    <>
      <form className="box">
      
        {/* <div class="alert alert-danger alert-dismissible fade show" role="alert"> {msg}
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div> */}
        <p style={{ color: "red" }}>{msg}</p>
        <ToastContainer toastStyle={{ backgroundColor: "green" }} />

        <div class="input-group mb-3">

          <div class="input-group-prepend">
            <span class="input-group-text"><FaUser /></span>
          </div>

          <input type="email" class="form-control" placeholder="Username/Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text"><FaKey /></span>
          </div>
          <input type="password" class="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <ul className='d-flex'>
            <li className='lg-check'><input type="checkbox" /><span className='ml-n3'>Remember me</span></li>
            <li>  <a href="#" className='ml-5'> Forget password?</a></li>
          </ul>
        </div>
        <button className='login-a-btn' onClick={Auth}>SIGN IN</button>

      </form>
    </>
  )
}

export default Login
