import React from 'react'
import style from "../../Styles/careers.module.css"
import Image from 'next/image'
import icon1 from "../../Images/Icons/investment.png";
import icon2 from "../../Images/Icons/research.png";
import icon3 from "../../Images/Icons/office.png";

export default function CareersSection2() {
  return (
    <div>
      <section className={style.grid_boxes}>
        <div className={style.grid_box}>
          <Image src={icon1} alt="Icon 1" className={style.icon}/>
          <h2>Our investment in <br /> innovation</h2>
          <p>We believe in nurturing fresh talent.</p>
        </div>
        <div className={style.grid_box}>
          <Image src={icon2} alt="Icon 2" className={style.icon}/>
          <h2>Our research and <br /> innovation</h2>
          <p>We believe in the power of collective knowledge.</p>
        </div>
        <div className={style.grid_box}>
          <Image src={icon3} alt="Icon 3" className={style.icon}/>
          <h2>Our inclusive workplaces</h2>
          <p>We believe in a world where we can be, belong, become.</p>
        </div>
      </section>
    </div>
  )
}
