import React from 'react'
import Image from 'next/image'
import style from "../../Styles/about.module.css"
import deepjoy from "../../Images/aboutuspic/deepjoy.png";
import sehtej from '../../Images/aboutuspic/Sehtej.png';
import ujjwalKumar from '../../Images/aboutuspic/Ujjwal Kumar.png';
import ShubhamSrivastava from '../../Images/aboutuspic/Shubham Srivastava.png';
// import Rohit from '../../Images/aboutuspic/rohit.png';
import Vipinraj from '../../Images/aboutuspic/Vipinraj.png';
import Subhadip from '../../Images/aboutuspic/Subhadip.png';
import divensh from '../../Images/aboutuspic/divensh.png';
import Shanu from '../../Images/aboutuspic/Shanu.png';
import linkedin_icon from "../../Images/linkedinpng.png";
// import shubham_churasia from '../../Images/aboutuspic/shubham-churasia.jpg'
import vedika from "../../Images/aboutuspic/Vedikagupta.png";
import shivamani from "../../Images/aboutuspic/shivamani.png";
import jahnvi from "../../Images/aboutuspic/jahnvisahni.png";
import Link from 'next/link';


export default function AboutSection3() {
  return (
    <div>
      <section className={style.founder}>
        <div className={style.Build}>
          <h1>Some of the people building Qwikto</h1>
        </div>
      </section>
      
      <section className={style.founder}>
        <div className={style.grid_container}>

          <div className={style.grid_item}>
            <Image
              src={deepjoy}
              alt="Deepjoy Roy"
              width="100"
              height="100"
              className={style.rounded_circle_image}
            />
            <h2>Deepjoy Roy</h2>
            <p>CEO & Co-Founder</p>
            <Link
              href="https://www.linkedin.com/in/deepjoy-roy-ab81041bb/"
              target="_blank"
              className={style.icon_circle}
            >
              <Image src={linkedin_icon} alt='linkedin' className={style.linkedin_icon}/>
            </Link>
          </div>

          <div className={style.grid_item}>
            <Image
              src={sehtej}
              alt="Deepjoy Roy"
              width="100"
              height="100"
              className={style.rounded_circle_image}
            />
            <h2>Sahtej Kumar</h2>
            <p>COO & Co-Founder</p>
            <Link
              href="https://www.linkedin.com/in/sahtej-kumar/"
              target="_blank"
              className={style.icon_circle}
            >
              <Image src={linkedin_icon} alt='linkedin' className={style.linkedin_icon}/>
            </Link>
          </div>
          <div className={style.grid_item}>
            <Image
              src={Shanu}
              alt="Deepjoy Roy"
              width="100"
              height="100"
              className={style.rounded_circle_image}
            />
            <h2>Shanu</h2>
            <p>CoFounder & Chief Product Officer</p>
            <Link
              href="https://www.linkedin.com/in/iamshanu/overlay/photo/"
              target="_blank"
              className={style.icon_circle}
            >
              <Image src={linkedin_icon} alt='linkedin' className={style.linkedin_icon}/>
            </Link>
          </div>
          <div className={style.grid_item}>
            <Image
              src={Vipinraj}
              alt="Deepjoy Roy"
              width="100"
              height="100"
              className={style.rounded_circle_image}
            />
            <h2>Vipinraj Singh</h2>
            <p>Co – Founder & Product & Tech </p>
            <Link
              href="https://www.linkedin.com/in/vipinraj-singh-555382200/"
              target="_blank"
              className={style.icon_circle}
            >
              <Image src={linkedin_icon} alt='linkedin' className={style.linkedin_icon}/>
            </Link>
          </div>
          <div className={style.grid_item}>
            <Image
              src={ujjwalKumar}
              alt="Deepjoy Roy"
              width="100"
              height="100"
              className={style.rounded_circle_image}
            />
            <h2>Ujjwal Kumar</h2>
            <p>Chief Data Officer</p>
            <Link
              href="https://www.linkedin.com/in/ujjwalkumar2000/"
              target="_blank"
              className={style.icon_circle}
            >
              <Image src={linkedin_icon} alt='linkedin' className={style.linkedin_icon}/>
            </Link>
          </div>

          <div className={style.grid_item}>
            <Image
              src={ShubhamSrivastava}
              alt="Deepjoy Roy"
              width="100"
              height="100"
              className={style.rounded_circle_image}
            />
            <h2>Shubham Srivastava</h2>
            <p>Chief Marketing Officer</p>
            <Link
              href="https://www.linkedin.com/in/shubham-srivastava-073762285/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              className={style.icon_circle}
            >
              <Image src={linkedin_icon} alt='linkedin' className={style.linkedin_icon}/>
            </Link>
          </div>

          {/* <div className={style.grid_item}>
            <Image
              src={shubham_churasia}
              alt="Deepjoy Roy"
              width="100"
              height="100"
              className={style.rounded_circle_image}
            />
            <h2>Shubham Churasia</h2>
            <p>Customer Acquisition Offer</p>
            <Link
              href="https://www.linkedin.com/in/shubham-churasia-308b98294/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              className={style.icon_circle}
            >
              <Image src={linkedin_icon} alt='linkedin' className={style.linkedin_icon}/>
            </Link>
          </div> */}

          {/* <div className={style.grid_item}>
            <Image
              src={Subhadip}
              alt="Deepjoy Roy"
              width="100"
              height="100"
              className={style.rounded_circle_image}
            />
            <h2>Subhadip Patra</h2>
            <p>Chief Information Officer</p>
            <Link
              href="https://www.linkedin.com/in/subhadip-patra-568581201/"
              target="_blank"
              className={style.icon_circle}
            >
              <Image src={linkedin_icon} alt='linkedin' className={style.linkedin_icon}/>
            </Link>
          </div> */}

          {/* <div className={style.grid_item}>
            <Image
              src={divensh}
              alt="Deepjoy Roy"
              width="100"
              height="100"
              className={style.rounded_circle_image}
            />
            <h2>Divyansh Manchanda</h2>
            <p>VP of Engineering & Technology</p>
            <Link
              href="https://www.linkedin.com/in/divyansh--manchanda/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              className={style.icon_circle}
            >
              <Image src={linkedin_icon} alt='linkedin' className={style.linkedin_icon}/>
            </Link>
          </div> */}

          <div className={style.grid_item}>
            <Image
              src={vedika}
              alt="Vedika Gupta"
              width="100"
              height="100"
              className={style.rounded_circle_image}
            />
            <h2>Vedika Gupta</h2>
            <p>Product Designer UI/UX</p>
            <Link
              href="https://www.linkedin.com/in/vedika-gupta-6a4a35259/"
              target="_blank"
              className={style.icon_circle}
            >
              <Image src={linkedin_icon} alt='linkedin' className={style.linkedin_icon}/>
            </Link>
          </div>
          <div className={style.grid_item}>
            <Image
              src={jahnvi}
              alt="Jahnvi sahni"
              width="100"
              height="100"
              className={style.rounded_circle_image}
            />
            <h2>Jahnvi sahni</h2>
            <p>Full Stack Developer</p>
            <Link
              href="https://www.linkedin.com/in/jahnvisahni31/"
              target="_blank"
              className={style.icon_circle}
            >
              <Image src={linkedin_icon} alt='linkedin' className={style.linkedin_icon}/>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
