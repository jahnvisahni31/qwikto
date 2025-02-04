import React from 'react'
import style from '../../Styles/about.module.css'

export default function AboutSection2() {
  return (
    <div>
      <section className={style.about_us}>
        <div className={style.aboutus_container}>
          <h1>About Us</h1>
          <p className={style.vision}>Qwikto was founded by a group of young, innovative university graduates with a bold vision: transforming the way businesses manage their supply chains with a pioneering B2B quick commerce platform.</p>
          <br/>
          <p>We specialize in delivering critical supplies at lightning speed, empowering industries like restaurants, retail, healthcare, and small businesses to stay fully stocked and operational. Our innovative approach combines AI-driven logistics, a network of strategically located dark stores, and a dedicated fleet to ensure businesses receive what they need, precisely when they need it.</p>
          <br/>
          <p>Whether it&apos;s a restaurant needing fresh ingredients or a retailer restocking fast-moving consumer goods, Qwikto&apos;s platform offers real-time order tracking, demand forecasting, and seamless vendor integration to streamline the entire procurement process. We focus on helping businesses thrive by minimizing downtime and enhancing operational efficiency.</p>
          <br/>
          <p>With our promise of fast, reliable, and customized deliveries, Qwikto is redefining the future of B2B supply chains. We are committed to supporting businesses with scalable, on-demand delivery solutions that power growth and success in today’s fast-paced world.</p>
          <br/>
          <h2>Our Vision</h2>
          <p>Our vision is to revolutionize the supply chain by becoming the leading platform for seamless, on-demand business deliveries, driving innovation and sustainability in logistics, and enabling businesses of all sizes to thrive in a rapidly evolving economy.</p>
          <br/>
          <h2>Our Mission</h2>
          <p>To empower businesses with fast, reliable, and efficient delivery solutions, enabling them to meet urgent supply demands and optimize operations. We strive to be the preferred partner for businesses seeking agility, convenience, and competitive edge in an increasingly dynamic marketplace.</p>
          <br/>
          <h3 className={style.tagline}>Speed. Innovation. Success—Delivered by Qwikto.</h3>
        </div>
      </section>
    </div>
  )
}
