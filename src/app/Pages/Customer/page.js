'use client';
import { useRouter } from 'next/navigation';
import style from '../../Styles/user.module.css';
import { useState, useEffect } from 'react';
import CustomerCard from '../../Components/UserComponents/CustomerCard'
import ListAllOrderCustomer from '../../Components/OrderComponentts/ListAllOrderCustomer';
import venderStyle from '../../Styles/vender.module.css'
import Address from '@/app/Components/UserComponents/Address';
import ChangePasswordForm from '@/app/Components/UserComponents/ChangePasswordForm';
import BASE_URL from '@/appConfig';


export default function Page() {
  const router = useRouter();

  const [token, setCookieValue] = useState('');
  const [userName, setUserName] = useState('');
  const [userPicture, setUserPicture] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userMobile, setUserMobile] = useState('');
  const [selectedOption, setSelectedOption] = useState('Order');
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);


  useEffect(() => {
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };
    const yourCookieValue = getCookie('token');
    setCookieValue(yourCookieValue);
}, []);
useEffect(() => {
    const fetchCurrentData = async () => {
        try {

            const response = await fetch(`${BASE_URL}/api/loginSignup/currentUser`, {
                method: "Get",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            const newData = await response.json();
            // console.log(newData);
            if(response.ok){ 
               setUserMobile(newData.user.mobile)
               setUserEmail(newData.user.email)
               setUserPicture(newData.user.picture)
               setUserName(newData.user.name)
               
            }
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchCurrentData();
   }, [token])
   

  const logoutUser = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log("User logged out, token cookie deleted");
    router.push('/');
    setTimeout(() => {
        window.location.reload(); // Reload the page
    }, 500);
  };

  
  return (
    <div className={style.user_page}>
      <div className={style.heading_div}>
        <h1><span>!Welcome</span> you are a customer of <span>Qwikto</span></h1>
      </div>
      <hr width='90%' style={{margin:"10px", backgroundColor:'gray'}}/>
      <div className={venderStyle.parentContainerVendor}>
          <CustomerCard
            onMenuClick={(option) => {
              setSelectedOption(option);
              if (option === 'ChangePassword') {
                setShowChangePasswordForm(true);
              }
            }}
            name={userName}
            pic={userPicture}
            email={userEmail}
            mobile={userMobile}
            logoutUser={logoutUser}
          />
        <div>
          {selectedOption === 'Order' && <ListAllOrderCustomer/>}
          {selectedOption === 'Address' && <Address/>}
        </div>
      </div>
      {showChangePasswordForm && (
          <div className={style.changePassword}>
            <ChangePasswordForm
            token={token}
            onClose={() => {
              setShowChangePasswordForm(false);
              setSelectedOption('Order');
            }}
            />
          </div>
       )}
    </div>
  );
}
