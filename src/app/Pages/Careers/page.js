import React from 'react'
import CareersSection1 from "../../Components/CareersComponents/CareersSection1"
import CareersSection2 from '@/app/Components/CareersComponents/CareersSection2'
import CareersSection3 from '@/app/Components/CareersComponents/CareersSection3'
import style from "../../Styles/careers.module.css"
import CareersSection4 from '@/app/Components/CareersComponents/CareersSection4'

export default function page() {
  return (
    <div className={style.creere_page}>
      <CareersSection1/>
      <CareersSection2/>
      <CareersSection3/>
      <CareersSection4/>
    </div>

  )
}
