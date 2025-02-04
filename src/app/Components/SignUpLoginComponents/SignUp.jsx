"use client"
import React, { useState, useEffect } from 'react'
import '../../Styles/faltuStyle.css';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { GoogleOAuthProvider } from '@react-oauth/google';
// import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import Image from 'next/image';
import googleIcon from '../../Images/Icons/google.png'
import SelectUser from './SelectUser';
import EyeLoder from '../LoderComponents/EyeLoder';
import BASE_URL from '@/appConfig';


export default function SignUp() {
  const router = useRouter();

  const [sand_otpDisplayButt, setSand_otpDisplayButt] = useState('block');
  const [loding, setLoading] = useState('none');
  const [isDisabled, setIsDisabled] = useState(false);
  const [enterOTP, setEnterOTP] = useState(false);
  const [otpDisable, setOtpDisable] = useState(false);
  const [mobile, setMobile] = useState(''); // To capture mobile input
  const [name, setUsername] = useState(''); // To capture username input
  const [password, setPassword] = useState(''); // To capture password input
  const [otp, setOtp] = useState('');
  const [create_accountButt, setCreate_accountButt] = useState(false);
  const [message, setMessage] = useState();
  const [showAnimation, setShowAnimation] = useState(false);

  const [loginForm, setLoginForm] = useState(true);
  const [givePasswodForm, setGivePasswodForm] = useState(false);
  const [signUpForm, setSignUpForm] = useState(false);

  const [mobileForLogin, setMobileForLogin] = useState(''); // To capture mobile input

  const [emailForLogin, setEmailForLogin] = useState('');
  const [passwordForLogin, setPasswordForLogin] = useState('');
  const [selectedOption, setSelectedOption] = useState('customer');

  const [googelData, setGoogleData] = useState({});

  const [newPassword, setNewPassword] = useState('');
  const [newConfirmPassword, setNewConfirmPassword] = useState('');

  const [eyeLoderDisplay, setEyeLoderDisplay] = useState(false)
  const [messageForEyeLoder, setMessageForEyeLoder] = useState('Loading...')



  const sandOTP = async (e) =>{
    e.preventDefault(); 
    
    // Validation
    if (!mobile || mobile.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    setSand_otpDisplayButt('none');
    setIsDisabled(true);
    setLoading('flex');

    try {
      const response = await fetch(`${BASE_URL}/api/customer/sendOtp_forRagister`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile, name, password }), // Send data in body
      });

      const data = await response.json();
      // console.log(data)

      if (response.ok) {
        setLoading('none');
        setEnterOTP(true)
        setCreate_accountButt(true)
      } else {
        setMessage(data.message || 'Failed to send OTP');
        setSand_otpDisplayButt('block');
        setIsDisabled(false);
        setLoading('none');
        setTimeout(() => setMessage(""), 2000);
      }
    } catch (error) {
        setMessage(error.message);
        setSand_otpDisplayButt('block');
        setIsDisabled(false);
        setLoading('none');
        setTimeout(() => setMessage(""), 2000);
    }
  }


  const registerCustomer = async (e) => {
    e.preventDefault();

    if (!mobile || !otp) {
      alert("Please fill in both mobile number and OTP.");
      return;
    }
    setLoading('flex');
    setCreate_accountButt(false)
    setOtpDisable(true);

    try {
      const response = await fetch(
        `${BASE_URL}/api/customer/ragisterCustomer_byOtp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mobile, otp }), // Send mobile and OTP in the body
        }
      );

      const data = await response.json();

      if (response.ok) {
        setLoading('none');
        triggerSuccessAnimation();
        setSignUpForm(false)
        setMessage(data.message)
        setTimeout(() => setMessage(""), 2000);
      } else {
        // throw new Error(data.message || "Failed to register customer.");
        setMessage(data.message || "Failed to register customer.");
        setLoading('none');
        setCreate_accountButt(true);
        setTimeout(() => setMessage(""), 2000);
        setOtpDisable(false);

      }
    } catch (error) {
        setMessage(error.message);
        setCreate_accountButt(true);
        setLoading('none');
        setTimeout(() => setMessage(""), 2000);
        setOtpDisable(false);

    }
  };



  const triggerSuccessAnimation = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
      window.location.reload() 
    }, 3000);
  };

  const SuccessAnimation = () => (
    <div className="success-animation">
      <div className="checkmark">
        <svg viewBox="0 0 52 52">
          <path d="M14 27 l10 10 l16 -16" />
        </svg>
      </div>
    </div>
  );

  const OpenSignUpForm = () =>{
    setLoginForm(false);
    setSignUpForm(true);
  }

  const OpenLoginForm = () =>{
    setLoginForm(true);
    setSignUpForm(false);
  }

  
  const loginUser  = async (e) =>{
    e.preventDefault(); 
    
    if (!emailForLogin || !passwordForLogin) {
      setMessage("Both mobile number and password are required.");
      setTimeout(() => setMessage(""), 2000);
      return;
    }

    try {
      // Call the API
      const response = await fetch(`${BASE_URL}/api/loginSignup/loginUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email:emailForLogin, password:passwordForLogin, type:selectedOption}), // Send the data
      });
  
      const result = await response.json();
      // console.log(result)
  
      if (result.token) {
        
        Cookies.set('token', result.token, { expires: 1 }); 
        // console.log('Token saved in cookies:', result.token);
        router.push('/');
        window.location.reload(); // Reload the page

      } else {
        console.error('Token not found in response:', result);
        setMessage(result.message);
        setTimeout(() => setMessage(""), 2000);
      }
  
      return result; // Return response for further use
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage(error.message);
      setTimeout(() => setMessage(""), 2000);
      throw error;
    }
  }


 const login = useGoogleLogin({
  onSuccess: (tokenResponse) => {
    fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log("User Profile:", data);
        const userEmail = data.email;
          handleCheckAndLogin(userEmail, selectedOption, data);
      })
      .catch((error) => console.error("Error fetching user profile:", error));
  },
  onError: (error) => {
    console.error("Login Failed:", error);
  },
 });


 const handleCheckAndLogin = async (email, type, profileData) => {
    try {
      const response = await fetch(`${BASE_URL}/api/loginSignup/checkand_login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type }),
      });

      const result = await response.json();
      // console.log("Check and Login Response:", result);

      if (result.message === 'Customer already registered' || result.message === 'Vendor already registered') {
        // Save token in cookies if the user is already registered
        Cookies.set('token', result.token, { expires: 1 });
        // console.log("Token saved in cookies.");
        router.push('/');
        window.location.reload();
      } else if (result.message === 'Customer not found' || result.message === 'Vendor not found') {
        // Call the add_AndLogin API for registration and login
        setGoogleData(profileData);
        setGivePasswodForm(true)
        setEyeLoderDisplay(false)
        setLoginForm(false);
      }else {
        setTimeout(() => setMessageForEyeLoder("Sorry for tecnical error, Try again"), 2000);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error in check and login:", error);
    }
  };


  const loginCustomerAfterSetPassword = async (e) => {
    e.preventDefault()
    
    if(newPassword != newConfirmPassword){
      setMessage("Passwords Do Not Match")
      setTimeout(() => setMessage(""), 2000);
    }else{
      setGivePasswodForm(false);
      setEyeLoderDisplay(true);
      try {
        // console.log(selectedOption)
        const registrationData = {
          name: googelData.name,
          email: googelData.email,
          password: newPassword, 
          picture: googelData.picture,
          type:selectedOption
        };

        // console.log(registrationData)
  
        const response = await fetch(`${BASE_URL}/api/loginSignup/add_AndLogin`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(registrationData),
        });
  
        const result = await response.json();
        // console.log("Add and Login Response:", result);
  
        if (result.token) {
          Cookies.set('token', result.token, { expires: 1 });
          // console.log("Token saved in cookies.");
          setGivePasswodForm(true);
          setEyeLoderDisplay(false);
          router.push('/');
          window.location.reload();
        }
      } catch (error) {
        console.error("Error in add and login:", error);
      }

    }
  };


 const handleSubmit = (e) => {
  e.preventDefault();
  setLoginForm(false);       
  setEyeLoderDisplay(true);
  login();
};

const handleOptionSelect = (option) => {
  setSelectedOption(option);
  // console.log('Selected Option:', option); // You can process the 
};
 

  return (
    <div>
        
        {/* Login Part */}
      <form  className="modern-form">
        {showAnimation && <div style={{margin:'auto',display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:"20px"}}>
          <SuccessAnimation />
          <p>{message}</p>
        </div>}
        {eyeLoderDisplay && <div style={{margin:'auto',display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:"20px"}}>
          <EyeLoder/>
          <p>{messageForEyeLoder}</p>
        </div>}
         <div style={{display:givePasswodForm? 'inline':'none'}} className='setPassword'>
            <h2>Set password</h2>
            <p>The first time you login, you will need to set a password.</p>
            <div className="input-group">
                <div className="input-wrapper">
                    <svg fill="none" viewBox="0 0 24 24" className="input-icon">
                    <path
                        strokeWidth="1.5"
                        stroke="currentColor"
                        d="M12 10V14M8 6H16C17.1046 6 18 6.89543 18 8V16C18 17.1046 17.1046 18 16 18H8C6.89543 18 6 17.1046 6 16V8C6 6.89543 6.89543 6 8 6Z"
                    ></path>
                    </svg>
                    <input
                    required=""
                    placeholder="Password"
                    className="form-input"
                    type="password"
                    disabled={isDisabled}
                    onChange={(e) => setNewPassword(e.target.value)} // Handle password input
                    />

                    <button className="password-toggle" type="button">
                    <svg fill="none" viewBox="0 0 24 24" className="eye-icon">
                        <path
                        strokeWidth="1.5"
                        stroke="currentColor"
                        d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z"
                        ></path>
                        <circle
                        strokeWidth="1.5"
                        stroke="currentColor"
                        r="3"
                        cy="12"
                        cx="12"
                        ></circle>
                    </svg>
                    </button>
                </div>
                <div className='gap'></div>
                <div className="input-group">
                  <div className="input-wrapper">
                      <svg fill="none" viewBox="0 0 24 24" className="input-icon">
                      <path
                          strokeWidth="1.5"
                          stroke="currentColor"
                          d="M12 10V14M8 6H16C17.1046 6 18 6.89543 18 8V16C18 17.1046 17.1046 18 16 18H8C6.89543 18 6 17.1046 6 16V8C6 6.89543 6.89543 6 8 6Z"
                      ></path>
                      </svg>
                      <input
                      required=""
                      placeholder="Confirm Password"
                      className="form-input"
                      type="password"
                      disabled={isDisabled}
                      onChange={(e) => setNewConfirmPassword(e.target.value)} // Handle password input
                      />

                      <button className="password-toggle" type="button">
                      <svg fill="none" viewBox="0 0 24 24" className="eye-icon">
                          <path
                          strokeWidth="1.5"
                          stroke="currentColor"
                          d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z"
                          ></path>
                          <circle
                          strokeWidth="1.5"
                          stroke="currentColor"
                          r="3"
                          cy="12"
                          cx="12"
                          ></circle>
                      </svg>
                      </button>
                  </div>
              </div>
              <p>{message}</p>
              <button onClick={loginCustomerAfterSetPassword} id='create_account' className="submit-button" type="submit">
                  <span className="button-text">LogIn</span>
                  <div className="button-glow"></div>
              </button>
            </div>
        </div>
        <div style={{display:loginForm? 'inline':'none'}}>
            <div className="form-title"><span>Login</span> as a {selectedOption}</div>
            <SelectUser onSelect={handleOptionSelect}/>
            <div className="form-body">
                <div className="input-group">
                    <div className="input-wrapper">
                        <svg fill="none" viewBox="0 0 24 24" className="input-icon">
                        <path
                            strokeWidth="1.5"
                            stroke="currentColor"
                            d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z"
                        ></path>
                        </svg>
                        
                        <input
                        required=""
                        placeholder="Email"
                        className="form-input"
                        type="email"
                        // disabled={isDisabled}
                        onChange={(e) => setEmailForLogin(e.target.value)}
                        />
                    </div>
                </div>

                <div className="input-group">
                    <div className="input-wrapper">
                        <svg fill="none" viewBox="0 0 24 24" className="input-icon">
                        <path
                            strokeWidth="1.5"
                            stroke="currentColor"
                            d="M12 10V14M8 6H16C17.1046 6 18 6.89543 18 8V16C18 17.1046 17.1046 18 16 18H8C6.89543 18 6 17.1046 6 16V8C6 6.89543 6.89543 6 8 6Z"
                        ></path>
                        </svg>
                        <input
                        required=""
                        placeholder="Password"
                        className="form-input"
                        type="password"
                        // disabled={isDisabled}
                        onChange={(e) => setPasswordForLogin(e.target.value)} // Handle password input
                        />

                        <button className="password-toggle" type="button">
                        <svg fill="none" viewBox="0 0 24 24" className="eye-icon">
                            <path
                            strokeWidth="1.5"
                            stroke="currentColor"
                            d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z"
                            ></path>
                            <circle
                            strokeWidth="1.5"
                            stroke="currentColor"
                            r="3"
                            cy="12"
                            cx="12"
                            ></circle>
                        </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <p>{message}</p>
            </div>

            <div style={{display:loding, alignItems:'center', justifyContent:'center'}}>
                <svg className='loding' viewBox="25 25 50 50">
                  <circle className='loding_circle' r="20" cy="50" cx="50"></circle>
                </svg>
            </div>

            <button onClick={loginUser} id='create_account' className="submit-button" type="submit">
                <span className="button-text">LogIn User</span>
                <div className="button-glow"></div>
            </button>
               <p style={{textAlign:'center',margin:'10px'}}>------ or ------</p>
               <button className="sign_in_withgoogle" onClick={handleSubmit}>
                 <Image src={googleIcon} alt=''/> Sign in with google
               </button>
      
            <div onClick={OpenSignUpForm} className="form-footer">
                <a className="login-link" href="#">
                Create account? <span>Sign Up</span>
                </a>
            </div>
          </div>
   

          {/* Sign Up Part */}
          <div style={{display:signUpForm? 'inline':'none'}}>
            <div className="form-title">Sign Up</div>
            <div className="form-body">
                <div className="input-group">
                <div className="input-wrapper">
                    <svg fill="none" viewBox="0 0 24 24" className="input-icon">
                    <circle
                        strokeWidth="1.5"
                        stroke="currentColor"
                        r="4"
                        cy="8"
                        cx="12"
                    ></circle>
                    <path
                        strokeLinecap="round"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        d="M5 20C5 17.2386 8.13401 15 12 15C15.866 15 19 17.2386 19 20"
                    ></path>
                    </svg>
                    <input
                    required=""
                    placeholder="Username"
                    className="form-input"
                    type="text"
                    disabled={isDisabled}
                    onChange={(e) => setUsername(e.target.value)} // Handle username input
                    />
                </div>
                </div>

                <div className="input-group">
                    <div className="input-wrapper">
                        <svg fill="none" viewBox="0 0 24 24" className="input-icon">
                        <path
                            strokeWidth="1.5"
                            stroke="currentColor"
                            d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z"
                        ></path>
                        </svg>
                        
                        <input
                        required=""
                        placeholder="Mobile"
                        className="form-input"
                        type="number"
                        disabled={isDisabled}
                        onChange={(e) => setMobile(e.target.value)}
                        />
                    </div>
                </div>

                <div className="input-group">
                    <div className="input-wrapper">
                        <svg fill="none" viewBox="0 0 24 24" className="input-icon">
                        <path
                            strokeWidth="1.5"
                            stroke="currentColor"
                            d="M12 10V14M8 6H16C17.1046 6 18 6.89543 18 8V16C18 17.1046 17.1046 18 16 18H8C6.89543 18 6 17.1046 6 16V8C6 6.89543 6.89543 6 8 6Z"
                        ></path>
                        </svg>
                        <input
                        required=""
                        placeholder="Password"
                        className="form-input"
                        type="password"
                        disabled={isDisabled}
                        onChange={(e) => setPassword(e.target.value)} // Handle password input
                        />

                        <button className="password-toggle" type="button">
                        <svg fill="none" viewBox="0 0 24 24" className="eye-icon">
                            <path
                            strokeWidth="1.5"
                            stroke="currentColor"
                            d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z"
                            ></path>
                            <circle
                            strokeWidth="1.5"
                            stroke="currentColor"
                            r="3"
                            cy="12"
                            cx="12"
                            ></circle>
                        </svg>
                        </button>
                    </div>
                </div>


                <div style={{ display: enterOTP ? 'block' : 'none' }} className="input-group">
                    <div className="input-wrapper">
                        <svg fill="none" viewBox="0 0 24 24" className="input-icon">
                        <path
                            strokeWidth="1.5"
                            stroke="currentColor"
                            d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z"
                        ></path>
                        </svg>
                        
                        <input
                        required=""
                        placeholder="OTP"
                        className="form-input"
                        type="number"
                        disabled={otpDisable}
                        onChange={(e) => setOtp(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div>
                <p>{message}</p>
            </div>

            <div style={{display:loding, alignItems:'center', justifyContent:'center'}}>
                <svg className='loding' viewBox="25 25 50 50">
                  <circle className='loding_circle' r="20" cy="50" cx="50"></circle>
                </svg>
            </div>

            <button onClick={sandOTP} id='sand_otp' className="submit-button" type="submit" style={{display:sand_otpDisplayButt}}>
                <span className="button-text">Send OTP</span>
                <div className="button-glow"></div>
            </button>

            <button onClick={registerCustomer} id='create_account' className="submit-button" type="submit" style={{ display: create_accountButt ? 'block' : 'none' }}>
                <span className="button-text">Create Account</span>
                <div className="button-glow"></div>
            </button>

            <div onClick={OpenLoginForm} className="form-footer">
                <a className="login-link" href="#">
                Already have an account? <span>Login</span>
                </a>
            </div>
          </div>
        </form>
    </div>
  )
}
