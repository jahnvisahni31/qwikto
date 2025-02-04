import React from 'react'
import style from '../../Styles/contect.module.css'

export default function ContectSection1() {
  return (
    <div className={style.contact_page}>
      <section className={style.contact_section}>
          <div className={style.contact_content}>
              <h1>Contact Us</h1>
              <p>We are here to assist you. Please feel free to reach out to us with any queries or concerns.</p>

              <form action="https://formspree.io/f/xgvevzeq" method="POST" className={style.contact_form}>
                  <input type="text" name="name" placeholder="Your Name" required/>
                  <input type="email" name="email" placeholder="Your Email" required/>
                  <input type="text" name="subject" placeholder="Subject" required/>
                  <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
                  <button type="submit">Submit</button>
              </form>
          </div>

          <div className={style.map_container}>
              <h2>Our Location</h2>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448196.52633258584!2d76.76357436215976!3d28.643684626335453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1729444889031!5m2!1sen!2sin" width="600" height="450" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
      </section>
    </div>
  )
}
