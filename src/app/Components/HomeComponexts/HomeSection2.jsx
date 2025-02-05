import Image from 'next/image';
import styles from '../../page.module.css';
const services = [
  { name: "Food Delivery", img: "/services/1.png" },
  { name: "Fashion/Clothing", img: "/services/2.png" },
  { name: "Beauty Products", img: "/services/3.png" },
  { name: "Electronics", img: "/services/4.png" },
  { name: "Grocery", img: "/services/5.png" },
  { name: "Medicine", img: "/services/6.png" },
];

const chooseUsData = [
  { text: "India's First Full Stack Quick Commerce platform.", img: "/choose/7.png" },
  { text: "One App, Unlimited Convenience.", img: "/choose/8.png" },
  { text: "Empowering Local Businesses.", img: "/choose/9.png" },
  { text: "AI-Powered Fast and Smart Deliveries.", img: "/choose/10.png" },
];

export default function Services() {
  return (
    <div className={styles.container}>
      {/* Services Section */}
      <h2 className={styles.title}>
        <div className={styles.headingWrapper}>
          {/* Left Star (Single) */}
          <Image src="/services/stars.png" alt="Left Star" width={30} height={30} className={styles.leftStar} />
          
          <span className={styles.highlight}> Services </span> we offer
          
          {/* Right Stars (Two - One Above, One Below) */}
          <div className={styles.rightStars}>
            <Image src="/services/stars.png" alt="Right Star 1" width={25} height={25} className={styles.rightStarTop} />
            <Image src="/services/stars.png" alt="Right Star 2" width={25} height={25} className={styles.rightStarBottom} />
          </div>
        </div>
      </h2>

      {/* Services Grid (3-column layout) */}
      <div className={styles.servicesGrid}>
        {services.map((service, index) => (
          <div key={index} className={styles.card}>
            <Image src={service.img} alt={service.name} width={100} height={100} className={styles.image} />
            <p className={styles.serviceName}>{service.name}</p>
          </div>
        ))}
      </div>

      {/* Why Choose Us Section */}
      <div className={styles.chooseUsContainer}>
        {/* Title with Icons */}
        <h1 className={styles.chooseUsTitle}>
          <Image 
            src="/services/questions.png" 
            alt="Faded Left Icon" 
            width={50} 
            height={50} 
            className={styles.fadedLeftIcon} 
          />
          <span className={styles.highlight}>Why</span> Choose us?
          <div className={styles.rightIcons}>
            <Image 
              src="/services/questions.png" 
              alt="Clear Right Icon 1" 
              width={50} 
              height={50} 
              className={styles.clearRightIcon} 
            />
          </div>
        </h1>
        <div className={styles.chooseGrid}>
          {chooseUsData.map((item, index) => (
            <div key={index} className={styles.chooseCard}>
              <Image src={item.img} alt="Why Choose Us" width={80} height={80} />
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
