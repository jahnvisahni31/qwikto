// 'use client';
// import { useRouter } from 'next/navigation';
// import style from '../../Styles/user.module.css';
// import venderStyle from '../../Styles/vender.module.css'
// import { useState, useEffect } from 'react';
// import VendorCard from '@/app/Components/UserComponents/VendorCard';
// import AddItem from '@/app/Components/ItemPageComponents/AddItem';
// import ReceivedOrder from '@/app/Components/OrderComponentts/ReceivedOrder';
// import VendorAccount from '@/app/Components/UserComponents/VendorAccount';
// import VenderItemsPage from '@/app/Components/ItemPageComponents/VenderItemsPage';
// import BASE_URL from '@/appConfig';

// export default function Page() {
//   const router = useRouter();
//   const [token, setCookieValue] = useState('');
//   const [userName, setUserName] = useState('');
//   const [userPicture, setUserPicture] = useState('');
//   const [userEmail, setUserEmail] = useState('');
//   const [selectedOption, setSelectedOption] = useState('My Account'); // Track selected menu option
//   const [error, setError] = useState('');


//   useEffect(() => {
//     const getCookie = (name) => {
//       const value = `; ${document.cookie}`;
//       const parts = value.split(`; ${name}=`);
//       if (parts.length === 2) return parts.pop().split(';').shift();
//     };
//     const yourCookieValue = getCookie('token');
//     setCookieValue(yourCookieValue);
//   }, []);
//   useEffect(() => {
//     const fetchCurrentData = async () => {
//       if (!token) return;
//       try {
//         const response = await fetch(`${BASE_URL}/api/loginSignup/currentUser`, {
//           method: "GET",
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });
  
//         const newData = await response.json();
//         if (response.ok) {
//           setUserEmail(newData.user.email);
//           setUserPicture(newData.user.picture);
//           setUserName(newData.user.name);
//         } else {
//           setError('Failed to fetch user data');
//         }
//       } catch (error) {
//         setError('An error occurred while fetching user data');
//         console.error('Error fetching data:', error);
//       }
//     };
  
//     fetchCurrentData();
//   }, [token]);

//   const logoutUser = () => {
//     document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//     // console.log("User logged out, token cookie deleted");
//     router.push('/');
//     setTimeout(() => {
//       window.location.reload();
//     }, 500);
//   };

//   // console.log(userPicture);
//   return (
//     <div className={style.user_page}>
//       {error && <div className={style.error}>{error}</div>}
//       <div className={style.heading_div}>
//         <h1><span>!Welcome</span> you are a vendor of <span>Qwikto</span></h1>
//       </div>
//       <hr width='90%' style={{ margin: "10px", backgroundColor: 'gray' }} />
//       <div className={venderStyle.parentContainerVendor}>
//         <VendorCard name={userName} pic={userPicture} email={userEmail} logoutUser={logoutUser} onMenuClick={(option) => setSelectedOption(option)} />

//         <div>
//           {selectedOption === 'My Account' && <VendorAccount />}
//           {selectedOption === 'Add Items' && <AddItem />}
//           {selectedOption === 'Received Order' && <ReceivedOrder />}
//           {selectedOption === 'Items' && <VenderItemsPage />}
//         </div>
//       </div>
//     </div>
//   );
// }

// 'use client';
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import BASE_URL from '@/appConfig';  // Make sure BASE_URL is correctly set
// import '../VendorAccount.css';  // You can create a separate CSS file for styling the page

// const AuthPage = () => {
//   const router = useRouter();
  
//   const [isSignup, setIsSignup] = useState(false); // Track if the form is for signup or login
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     name: '',
//     mobile: '', // for signup
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Toggle between login and signup mode
//   const toggleForm = () => {
//     setIsSignup(!isSignup);
//     setFormData({ email: '', password: '', name: '', mobile: '' }); // Clear form data
//     setError(''); // Reset error message
//   };

//   // Handle form submission for login/signup
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     const url = isSignup ? `${BASE_URL}/api/loginSignup/signup` : `${BASE_URL}/api/loginSignup/login`;
//     const bodyData = isSignup
//       ? {
//           name: formData.name,
//           email: formData.email,
//           password: formData.password,
//           mobile: formData.mobile,
//         }
//       : {
//           email: formData.email,
//           password: formData.password,
//         };

//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(bodyData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Handle successful login/signup
//         if (isSignup) {
//           setError('Signup successful! Please log in now.');
//           setTimeout(() => setIsSignup(false), 2000); // Switch to login after signup
//         } else {
//           // Save token or user info after login (example with cookies)
//           document.cookie = `token=${data.token}; path=/`;
//           router.push('/vendor-dashboard'); // Redirect after successful login
//         }
//       } else {
//         setError(data.message || 'Something went wrong!');
//       }
//     } catch (err) {
//       console.error('Error during authentication:', err);
//       setError('Error during authentication. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>{isSignup ? 'Sign Up' : 'Log In'}</h2>

//       <form onSubmit={handleSubmit}>
//         {isSignup && (
//           <div className="form-group">
//             <label htmlFor="name">Full Name</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//         )}

//         <div className="form-group">
//           <label htmlFor="email">Email Address</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         {isSignup && (
//           <div className="form-group">
//             <label htmlFor="mobile">Mobile Number</label>
//             <input
//               type="text"
//               id="mobile"
//               name="mobile"
//               value={formData.mobile}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//         )}

//         {error && <p className="error-message">{error}</p>}

//         <button type="submit" className="auth-button" disabled={loading}>
//           {loading ? 'Submitting...' : isSignup ? 'Sign Up' : 'Log In'}
//         </button>
//       </form>

//       <div className="toggle-auth">
//         <p>
//           {isSignup
//             ? 'Already have an account? '
//             : "Don't have an account? "}
//           <span onClick={toggleForm} className="toggle-link">
//             {isSignup ? 'Log In' : 'Sign Up'}
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AuthPage;
