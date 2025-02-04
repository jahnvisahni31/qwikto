import React from 'react'
import Link from 'next/link'
import style from "../Styles/footer.module.css"
import apple_image from "../Images/FooterImage/apple_store.jpg"
import playstore from "../Images/FooterImage/playstore.jpg"
import Image from 'next/image'
import facebook from '../Images/Icons/facebook.png';
import instagram from '../Images/Icons/instagram.png';
import linkedin from '../Images/Icons/linkedin.png';
import twitter from '../Images/Icons/twitter.png';
import youtube from '../Images/Icons/youtube.png';




export default function Footer({ showPrivacy }) {

  return (
    <footer className={style.footer}>
      <div className={style.footer_content}>
        {/* <!-- Social Media Links --> */}
        <div className="footer-social">
          <Link href="https://www.facebook.com/people/Qwikto/61570593262054/?rdid=gtCQ1KmKCB4WC8Iy&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18tCxpqjfb%2F" target="_blank" >
            <Image className={style.icon} src={facebook} alt='' />
          </Link>
          <Link href="https://x.com/i/flow/login?redirect_after_login=%2FQwikto_in" target="_blank">
            <Image className={style.icon} src={twitter} alt='' />
          </Link>
          <Link
            href="https://www.instagram.com/delitoapp?igsh=MW9sOGw2eWZkb2c1aA=="
            target="_blank"
          >
            <Image className={style.icon} src={instagram} alt='' />
          </Link>
          <Link
            href="https://www.linkedin.com/company/delito-com/?viewAsMember=true"
            target="_blank"
          >
            <Image className={style.icon} src={linkedin} alt='' />
          </Link>
          <Link
            href="https://youtube.com/@delito-p2c?si=swdBHKBGDa8fAUiQ"
            target="_blank"
          >
            <Image className={style.icon} src={youtube} alt='' />
          </Link>
        </div>
        {/* <!-- Footer Columns --> */}
        <div className={style.footer_links}>

          <div>
            {/* <!-- Company Column --> */}
            <div className={style.footer_column}>
              <h4>Company</h4>
              <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/Pages/About">About</Link></li>
                <li><Link href="/Pages/Careers">Careers</Link></li>
                <li><Link href="/Pages/Contact">Contact Us</Link></li>
                {/* <li><Link href="/Pages/Blog">Blog</Link></li> */}
              </ul>
            </div>

            {/* <!-- For Consumers Column --> */}
            <div className={style.footer_column}>
              <h4>For Consumers</h4>
              <ul>
                <li><Link onClick={(e) => { e.preventDefault(); showPrivacy(); }} href="#" id="privacyLink">Privacy</Link></li>
                <li><Link href='/Pages/Terms'>Terms</Link></li>
                <li><Link href="/Pages/Faqs">FAQs</Link></li>
                <li><Link href="/Pages/Security">Security</Link></li>
                <li><Link href="#">Mobile</Link></li>
              </ul>
            </div>
          </div>


          <div>
            {/* <!-- For Partners Column --> */}
            <div className={style.footer_column}>
              <h4>For Partners</h4>
              <ul>
                <li><Link href="/Pages/Vendor">Vendor</Link></li>
                <li><Link href="#">Deliver</Link></li>
                {/* <li><Link href="#">Hotel and Restaurant</Link></li> */}
              </ul>
            </div>

            {/* <!-- Contact Column --> */}
            <div className={style.footer_column_contact}>
              <h4>Contact Us</h4>
              <p>
                <strong>Location:</strong> H No. 6G G/Floor Block-B, Gali No.3,
                PH-4, Aya Nagar Extn, New Delhi, 110047
              </p>
              <p><strong>Phone:</strong> +91 73571 50778</p>
              <p><strong>Email:</strong> contact@Qwikto.in</p>
            </div>
          </div>
        </div>


        {/* <!-- Download App Section --> */}
        <div className={style.footer_app}>
          <p>Download App</p>
          <Link href="#"><Image className={style.image} src={apple_image} alt="Google Play" /></Link>
          <Link href="#"><Image className={style.image} src={playstore} alt="App Store" /></Link>
        </div>
      </div>
    </footer>
  )
}
