'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import style from "../Styles/navbar.module.css";
import Image from "next/image";
import icon from "../Images/logo.png";
import "../Styles/faltuStyle.css";
import BASE_URL from "@/appConfig";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [token, setCookieValue] = useState("");
  const [userName, setUserName] = useState(null); // Ensure null as initial value matches server render
  const [userType, setUserType] = useState(""); // Empty string as initial value

  // Fetch the token from cookies
  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    };
    const yourCookieValue = getCookie("token");
    setCookieValue(yourCookieValue || ""); // Default to empty string
  }, []);

  // Fetch current user details
  useEffect(() => {
    if (!token) return; // Avoid making unnecessary API calls when token is absent

    const fetchCurrentData = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/loginSignup/currentUser`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const newData = await response.json();
          setUserName(newData.user.name || null);
          setUserType(newData.user.type || "");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchCurrentData();
  }, [token]);

  // Close menu on window resize

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 600) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Toggle menu
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Helper function to get initials from full name
  function getInitialsFromFullName(fullName) {
    if (!fullName || typeof fullName !== "string") return "";

    const names = fullName.trim().split(" ");
    const firstNameInitial = names[0]?.charAt(0).toUpperCase() || "";
    const lastNameInitial = names[1]?.charAt(0).toUpperCase() || "";

    return `${firstNameInitial}${lastNameInitial}`;
  }

  return (
    <>
      <nav className={style.navbar}>
        <div className={style.logo}>
          <Image src={icon} alt="App Store Logo" />
        </div>

        <div className={style.rightPart}>
          <div className={style.allLinks}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/Pages/About">About</Link>
            </li>
            <li>
              <Link href="/Pages/Careers">Careers</Link>
            </li>
            <li>
              <Link href="/Pages/Contact">Contact</Link>
            </li>
            {/* <li>
              <Link href="/Pages/Blog">Blog</Link>
            </li>
            <li
              style={{ display: userType === "vendor" ? "none" : "inline" }}
            >
              <Link href="/Pages/Items">Items</Link>
            </li> */}
          </div>
          <div className={style.toggle} onClick={toggleMenu}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          {/* <div style={{ display: userName == null ? "none" : "inline" }}>
            {userType === "customer" ? (
              <Link href="/Pages/Customer">
                <button className="UserIconName">
                  {getInitialsFromFullName(userName)}
                </button>
              </Link>
            ) : (
              <Link href="/Pages/Vendor">
                <button className="UserIconName">
                  {getInitialsFromFullName(userName)}
                </button>
              </Link>
            )} */}
          {/* </div>
          <div style={{ display: userName == null ? "inline" : "none" }}>
            <Link href="/Pages/SignUp_Login">
              <button className="button">LOGIN</button>
            </Link>
          </div> */}
        </div>
      </nav>
      <div
        className={`${isMenuOpen ? style.dropBoxOpen : style.dropBoxClosed}`}
      >
        <div className={style.dropdownMenu}>
          <li onClick={toggleMenu}>
            <Link href="/">Home</Link>
          </li>
          <li onClick={toggleMenu}>
            <Link href="/Pages/About">About</Link>
          </li>
          <li onClick={toggleMenu}>
            <Link href="/Pages/Careers">Careers</Link>
          </li>
          <li onClick={toggleMenu}>
            <Link href="/Pages/Contact">Contact</Link>
          </li>
          {/* <li onClick={toggleMenu}>
            <Link href="/Pages/Blog">Blog</Link>
          </li>
          <li
            style={{ display: userType === "vendor" ? "none" : "inline" }}
            onClick={toggleMenu}
          >
            <Link href="/Pages/Items">Items</Link>
          </li> */}
        </div>
      </div>
    </>
  );
}
