'use client'
import React from 'react'
import aboutSectionContaint from '../../Images/aboutSectionContaint.png'
import Image from 'next/image'
import style from '../../Styles/about.module.css'


export default function AboutSection5() {
  return (
    <div className={style.aboutSectionContaint}>
      <Image src={aboutSectionContaint} alt="" />
    </div>
  )
}
