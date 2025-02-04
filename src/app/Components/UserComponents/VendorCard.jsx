'use client'
import React from "react";
import '../UserComponents/userCard.css'
import defaultImage from '../../Images/Icons/user.png'
import Image from "next/image";

export default function VendorCard(props) {
  return (
    <div className="userCardMainContainer">
        <div className="imagePairentContainer">
          <div className="imageBorderDiv">
              <img
              src={props.pic || defaultImage}
              alt="User"
              width={100}
              height={100}
              // onError={(event) => {
              //   const target = event.target;
              //   target.onerror = null; 
              //   // target.src = defaultImage; 
              // }}
              // unoptimized 
            />
          </div>
        </div>
         <h2>{props.name}</h2>
         <p>{props.email}</p>
         <hr width='90%' style={{margin:"10px", backgroundColor:'gray'}}/>

         <ul className="listOfUsercard">
            <li onClick={() => props.onMenuClick('My Account')}>My Account</li>
            <li onClick={() => props.onMenuClick('Received Order')}>Received Order</li>
            <li onClick={() => props.onMenuClick('Add Items')}>Add Items</li>
            <li onClick={() => props.onMenuClick('Items')}>Items</li>
            <li onClick={props.logoutUser} >Sign Out</li>
         </ul>
    </div>
  );
}