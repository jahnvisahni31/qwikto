import React from 'react';
import aboutImage from '../../Images/B2bimage.jpg';
import Image from 'next/image';
import style from '../../Styles/about.module.css';

export default function AboutSection4() {
  return (
    <div>
      <div className={style.containtContainer}>
        <div>
          <h1>Who we are ? </h1>
          <p>
            Qwikto is India&apos;s first full-stack quick commerce platform, delivering food, grocery, electronics, fashion, beauty, and medicines in just 10 minutes—all from a single app.
          </p>
          <p>
            We are on a mission to revolutionize online shopping by providing a seamless, ultra-fast, and hyperlocal delivery experience while empowering local businesses. Unlike other quick commerce players relying on dark stores, we partner with kirana stores, cloud kitchens, and top brands to bring customers everything they need—faster, smarter, and more affordably.
          </p>
          <p>
            At Qwikto, we believe in convenience without compromise. Our AI-powered logistics, strong vendor network, and customer-first approach make us the future of instant commerce in India.
          </p>
        </div>
        <div className={style.imageContainer}>
          <Image src={aboutImage} alt="Qwikto About Us" />
        </div>
      </div>
    </div>
  );
}
