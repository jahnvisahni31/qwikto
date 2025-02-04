import React from 'react'
import Image from 'next/image'
import aboutusImage from '../../Images/aboutus.png'
import style from "../../Styles/about.module.css"

export default function AboutSection1() {
  return (
    <div>
      <Image className={style.banner} src={aboutusImage} alt=''/>
    </div>
  )
}
