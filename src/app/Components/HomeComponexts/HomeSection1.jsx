import React from "react";
import Image from "next/image";
import firstPosterImage from "../../Images/banner.png";
import styles from '../../Styles/main.module.css';
import bannernd from "../../Images/banner2nd.png"

export default function HomePageSection1() {
  return (
    <div className="w-full pt-[80px] md:pt-[90px]">
      {/* Banner Section */}
      <div className="flex justify-center items-center">
        <Image
          src={firstPosterImage}
          alt="Banner Image"
          width={2150}
          height={2000} // Ensures correct proportions
          layout="intrinsic"
          objectFit="cover"
        />
      </div>

      {/* Download Buttons Section */}
      <div className={styles.container}>
        <div className={styles.buttonWrapper}>
          <a className={styles.link} href="#">
            <Image
              src="/aboutpage/appdownload.png"
              alt="Download on the App Store"
              width={150}
              height={50}
              className={styles.image}
            />
          </a>
          <a className={styles.link} href="#">
            <Image
              src="/aboutpage/googledownload.png"
              alt="Get it on Google Play"
              width={150}
              height={50}
              className={styles.image}
            />
          </a>
        </div>
      </div>
      {/* banner 2nd */}
      <div className="flex justify-center items-center w-full">
        <Image
          src={bannernd}
          alt="Banner Image"
          width={2375}
          height={700}
          layout="intrinsic"
          objectFit="cover"
        />
      </div>
    </div>
  );
}