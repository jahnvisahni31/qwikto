import BlogComponents from '@/app/Components/BlogComponents'
import React from 'react'
import './blog.css'
import Image from 'next/image'
import Image1 from '../../Images/abstract-blur-coffee-shop-cafe-interior.jpg'
import logo1 from '../../Images/logoWithOutBackGroud.png'

import imageLeft from '../../Images/papaya-salad-served-with-rice-noodles-vegetable-salad-decorated-with-thai-food-ingredients.jpg'

import imageRight from '../../Images/unrecognizable-woman-working-laptop-office-man-standing-watching-pointing.jpg'

export default function page() {
  return (
    <div className='container'>
      <div className='image_container'>
        <Image src={Image1} alt='' />
        <Image className='logoimg' src={logo1} alt='' />
      </div>
      <div className='containt_Container'>
        <div>
          <Image className='containtImage' src={imageLeft} alt='' />
          <h1>Welcome to Qwikto: Redefining Food
            Procurement
          </h1>
          <p>
            Welcome to the official blog of Qwikto! We’re excited to introduce
            you to a revolutionary way of simplifying procurement for
            businesses in the food sector. At Qwikto, our mission is clear: to
            simplify operations, drive savings, and provide seamless solutions for
            hotels, restaurants, and cafes.
          </p>
          <h3>The Story Behind Qwikto</h3>
          <p>Qwikto was born out of a desire to address the everyday challenges
            faced by food businesses. We noticed a gap—a lack of a centralized
            platform where businesses could conveniently order all their raw
            materials and ready-to-cook items while optimizing costs and
            procurement processes.
            Our passionate team, composed of professionalsfrom marketing,
            operations, analytics, customersupport, and finance, came together with a
            shared vision: to streamline the supply chain for the food industry. Starting
            from Port Blair, Andaman & Nicobar Islands, Qwikto is here to redefine how
            the food business operates
          </p>
          <h3>What Qwikto Offers?</h3>
          <p>At Qwikto, we provide a one-stop solution for all your procurement needs.
            From raw materialsto ready-to-cook essentials, our platform allows
            businessesto order in bulk at competitive prices. With a robust logistics
            network, we ensure timely and hassle-free delivery, helping businessesfocus
            on serving their customers better.
            Oursolutions are designed to deliver costsavings, operational efficiency, and
            a seamless experience, making Qwikto the go-to partner for food businesses.
          </p>
          <h3>Join Us on ThisJourney</h3>
          <p>Join Us on ThisJourney
            Thank you for being a part of this exciting journey. Explore our platform
            today and experience the difference we bring to the food industry.
            Stay tuned for more insights, updates, and storiesfrom the world of Qwikto.
            Together, let’s create a better future for food businesses!
          </p>
          <br />
          <p>Be sure to check our website for the latest insights, food trends, and updates
            on how we’re dedicated to making your food delivery experience seamless
            and enjoyable!ss and enjoyable!</p>
        </div>
        <div>
          <Image className='containtImage' src={imageRight} alt='' />
          <h1>The Rise of Food Delivery and Quick Commerce</h1>
          <p>In today’s fast-paced world, convenience drives everything—and the food
            industry is leading the charge. Food delivery has moved beyond mere
            necessity, becoming a lifestyle. With just a few taps, your favorite meals are
            delivered hot and fresh, redefining how we dine.
            But convenience doesn’t stop there. Enter quick commerce: the gamechanger bringing everyday essentials to your door in minutes. Midnight
            snacks, last-minute groceries, or must-have kitchen supplies? Done.
            Behind this revolution lies smart technology—apps that make ordering
            seamless, logistics that guarantee speed, and personalized
            recommendations that know what you need before you do. It’s convenience
            elevated.
          </p>
          <p>At Qwikto, we’re at the heart of this shift. Designed to simplify and
            optimize, we’re here to help food businesses grow, save time, and embrace
            sustainability.
            Join us as we redefine what convenience truly means—welcome to the
            Qwikto way.</p>
        </div>
      </div>

    </div>
  )
}
