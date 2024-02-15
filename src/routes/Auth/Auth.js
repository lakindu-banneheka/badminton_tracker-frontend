import React, { useState } from 'react';
import './Auth.css';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(false);

  const handleSignInPageClick = () => {
    setIsActive(false);
  };

  const handleSignUpPageClick = () => {
    console.log("click")
    setIsActive(true);
  };

  const handleGestBtn = () => {
    navigate('/new-match');
  }

  return (
    <div className='centered'> {/* center here */}
      <div id="container">
          <div className={`sign-up-wrapper ${isActive?'sign-up-wrapper-active':''}`}>
              <form action="post">
              <h1>Create Account</h1>
                  <div className="input">
                      <input type="text" placeholder="Name" />
                      <input type="email" placeholder="Email" />
                      <input type="password" placeholder="Password" />
                      <button >Sign Up</button>
                  </div>
              </form>
          </div>
          <div className={`sign-in-wrapper ${isActive?'sign-in-wrapper-active':''}`}>
              <form action="post">
              <h1>Sign In</h1>
                  <div className="input">
                      <input type="email" placeholder="Email" />
                      <input type="password" placeholder="Password" />
                      <a href="#">Forgot Password ?</a>
                      <button>Sign In</button>
                      <div className='or-text' >
                        OR
                      </div>
                      <button onClick={handleGestBtn} >Guest</button>
                  </div>
              </form>
          </div>

          <div className={`overlay-left ${isActive?'overlay-left-active':''}`}>
              <h1>Welcome back</h1>
              <p>To connect with us please Login</p>
              <button onClick={handleSignInPageClick} id="signIn">Sign In</button>

          </div>
          <div className={`overlay-right ${isActive?'overlay-right-active':''}`}>
              <h1>Hello Friend</h1>
              <p>Enter your details to Start journey with us</p>
              <button onClick={handleSignUpPageClick} id="signUp">Sign Up</button>
          </div>
      </div>
    </div>
  )
}

export default Auth