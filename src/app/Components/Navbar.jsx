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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 700) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <nav className={style.navbar}>
        <div className={style.logo}>
          <Image src={icon} alt="Logo" />
        </div>

        <div className={style.rightPart}>
          <ul className={style.allLinks}>
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
          </ul>
          <div className={style.toggle} onClick={toggleMenu}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`${isMenuOpen ? style.dropBoxOpen : style.dropBoxClosed}`}>
        <ul className={style.dropdownMenu}>
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
        </ul>
      </div>
    </>
  );
}
