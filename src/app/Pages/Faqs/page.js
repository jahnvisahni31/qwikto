"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import faqs_banner from '../../Images/FAQ.png'
import style from '../../Styles/footer.module.css'

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "1. What is Qwikto?",
      answer: "Qwikto is India's first full-stack quick commerce platform, delivering food, groceries, electronics, fashion, beauty, and medicines in just 10 minutes from a single app by partnering with local vendors, kirana stores, and cloud kitchens."
    },
    {
      question: "2. How is Qwikto different from Zepto, Blinkit, or Zomato?",
      answer: "Unlike Zepto and Blinkit, which focus only on groceries, or Zomato, which focuses on food, Qwikto delivers everything—from daily essentials to fashion and electronics—faster and more efficiently. Plus, we don't rely on dark stores; we empower local businesses instead."
    },
    {
      question: "3. How does Qwikto deliver in just 10 minutes?",
      answer: "We use AI-powered logistics, smart rider allocation, and hyperlocal store partnerships to ensure superfast deliveries. Our system automatically picks the nearest vendor and rider to get your order to you ASAP."
    },
    {
      question: "4. What products can I order on Qwikto?",
      answer: "You can order a wide range of products, including:\n✅ Food & Beverages\n✅ Groceries & Daily Essentials\n✅ Fashion & Accessories\n✅ Electronics & Gadgets\n✅ Beauty & Personal Care\n✅ Medicines & Health Essentials"
    },
    {
      question: "5. Where does Qwikto operate?",
      answer: "We are launching in Punjab and Chandigarh and rapidly expanding to other cities in India. Stay tuned for updates!"
    },
    {
      question: "6. What payment methods does Qwikto accept?",
      answer: "We accept all major payment methods, including:\n💳 UPI (Google Pay, PhonePe, Paytm, etc.)\n💳 Credit/Debit Cards\n💳 Net Banking\n💳 Cash on Delivery (COD)"
    },
    {
      question: "7. Can I track my order in real time?",
      answer: "Yes! Our app provides real-time tracking so you can see exactly where your order is and when it will arrive."
    },
    {
      question: "8. How does Qwikto support local businesses?",
      answer: "Unlike platforms that rely on dark stores, Qwikto partners directly with kirana stores, cloud kitchens, and retail brands, helping them increase their sales while ensuring customers get faster deliveries."
    },
    {
      question: "9. How can vendors partner with Qwikto?",
      answer: "Local businesses can easily sign up on our Qwikto Vendor App to start selling their products and reach more customers."
    },
    {
      question: "10. How can I become a Qwikto delivery partner?",
      answer: "If you're interested in joining as a rider, you can apply through our Qwikto Delivery Partner App and start earning with flexible hours and great incentives."
    },
    {
      question: "11. How can I contact Qwikto for support?",
      answer: "You can reach us through:\n📧 Email: support@qwikto.in\n📞 Helpline: +917357150778\n📲 In-App Chat Support"
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={style.faqs_page}>
      <Image src={faqs_banner} className={style.banner} alt='Qwikto FAQs Banner'/>

      <div style={{ padding: '0 10px' }}>
        <div className={style.faq_container}>
          <h1>Frequently Asked Questions (FAQs)</h1>

          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`${style.faq} ${activeIndex === index ? style.active : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <h2>{faq.question}</h2>
              {activeIndex === index && (
                <p>{faq.answer.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}