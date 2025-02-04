import Image from 'next/image';
import styles from '../../page.module.css';

const services = [
  { name: 'Food Delivery', img: '/aboutpage/fooddel.jpg' },
  { name: 'Fashion/Clothing', img: '/aboutpage/fashion.jpg' },
  { name: 'Beauty Products', img: '/aboutpage/beauty.jpg' },
  { name: 'Electronics', img: '/aboutpage/electronics.jpg' },
  { name: 'Grocery', img: '/aboutpage/grocery.jpg' },
  { name: 'Medicine', img: '/aboutpage/medicine.jpg' },
];

const chooseUsData = [
  { text: "India's First Full Stack Quick Commerce platform.", img: '/aboutpage/choo1.png' },
  { text: "One App, Unlimited Convenience.", img: '/aboutpage/choo2.png' },
  { text: "Empowering Local Businesses.", img: '/aboutpage/choo3.png' },
  { text: "AI-Powered Fast and Smart Deliveries.", img: '/aboutpage/choo4.png' },
];

export default function Services() {
  return (
    <div className={styles.container}>
      {/* Services Section */}
      <h2 className={styles.title}>
        Services <span className={styles.highlight}>we offer</span>
      </h2>
      <div className={styles.servicesGrid}>
        {services.map((service, index) => (
          <div key={index} className={styles.card}>
            <Image src={service.img} alt={service.name} width={250} height={250} className={styles.image} />
            <p className={styles.serviceName}>{service.name}</p>
          </div>
        ))}
      </div>

      {/* Why Choose Us Section */}
      <div className={styles.chooseUsContainer}>
        <h1 className={styles.chooseUsTitle}>
          <span className={styles.highlight}>Why</span> Choose Us
        </h1>
        <div className={styles.chooseGrid}>
          {chooseUsData.map((item, index) => (
            <div key={index} className={styles.chooseCard}>
              <Image src={item.img} alt="Why Choose Us" width={100} height={100} />
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
