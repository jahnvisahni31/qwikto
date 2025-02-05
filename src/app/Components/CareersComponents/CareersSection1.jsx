import React from 'react'
import Image from 'next/image'
import careersbanner from '../../Images/banner.png'
import style from "../../Styles/careers.module.css"

export default function AboutSection1() {
  return (
    <div>
      <Image className={style.banner} src={careersbanner} alt='' width={2300}/>
    </div>
  )
}
