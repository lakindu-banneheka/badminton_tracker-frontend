import React, { useState } from 'react';
import './Auth.css';
import { useNavigate } from 'react-router-dom';
import { handleSignIn, handleSignUp } from '../../utils/axios';


const Auth = () => {
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSignInPageClick = () => {
    setIsActive(false);
  };

  const handleSignUpPageClick = () => {
    setIsActive(true);
  };

  const handleGestBtn = () => {
    navigate('/new-match');
  }

  return (
    <div className='centered'> {/* center here */}
      <div id="container">
          <div className={`sign-up-wrapper ${isActive?'sign-up-wrapper-active':''}`}>
              <form >
              <h1>Create Account</h1>
                  <div className="input">
                      <input type="text" placeholder="Name" onChange={(e)=>{setName(e.target.value)}} value={name} />
                      <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} value={email} />
                      <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password} />
                      <button onClick={(e) => { e.preventDefault(); handleSignUp(name, email, password, navigate)}}>Sign Up</button>
                  </div>
              </form>
          </div>
          <div className={`sign-in-wrapper ${isActive?'sign-in-wrapper-active':''}`}>
              <form >
              <h1>Sign In</h1>
                  <div className="input">
                      <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} value={email} />
                      <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password} />
                      {/* <a href="#">Forgot Password ?</a> */}
                      <button onClick={(e)=>{e.preventDefault(); handleSignIn(email, password, navigate)}} >Sign In</button>
                      <div className='or-text' >
                        OR
                      </div>
                      <button onClick={handleGestBtn} >Guest</button>
                  </div>
              </form>
          </div>

          <div className={`overlay-left ${isActive?'overlay-left-active':''}`}>
              <h1>Welcome back</h1>
              <p>please Login</p>
              <button onClick={handleSignInPageClick} id="signIn">Sign In</button>

          </div>
          <div className={`overlay-right ${isActive?'overlay-right-active':''}`}>
              <h1>First time ?</h1>
              <p>Join Us</p>
              <button onClick={handleSignUpPageClick} id="signUp">Sign Up</button>
          </div>
      </div>
    </div>
  )
}

export default Auth