import AboutSection1 from '@/app/Components/AboutComponents/AboutSection1';
import AboutSection2 from '@/app/Components/AboutComponents/AboutSection2';
import React from 'react';
import style from '../../Styles/about.module.css';
import AboutSection3 from '@/app/Components/AboutComponents/AboutSection3';
import AboutSection4 from '@/app/Components/AboutComponents/AboutSection4';
import AboutSection5 from '@/app/Components/AboutComponents/AboutSection5';
import HomePageSection1 from '@/app/Components/HomeComponexts/HomeSection1';
import Services from '@/app/Components/HomeComponexts/HomeSection2';
// import pdfUrl from '../../Images/Qwikto_About_page_Layout.pdf'

export default function page() {
  const pdfUrl = '../../Images/Qwikto_About_page_Layout.pdf'
  return (
    <div className={style.about_page}>
      <HomePageSection1 />
      <Services />
      <AboutSection4/>
      <AboutSection2/>
      <AboutSection3/>
      {/* <AboutSection5 pdfUrl={pdfUrl}/> */}
    </div>
  )
}
