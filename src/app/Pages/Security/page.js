import Image from 'next/image'
import React from 'react'
import security from '../../Images/security-shield-privacy-protection-confidentiality-concept.jpg';
import './security.css'
export default function page() {
    return (
        <div className="container">
            <Image src={security} alt='' />
            <div className='containt'>
                <h1>Help Keep Qwikto Secure for the community by disclosing security issues to us</h1>
                <p>
                    At Qwikto, security is at the heart of our commitment to providing a reliable and seamless platform for businesses in the food sector.
                    Protecting the data and trust of our customers, and partners is our top priority.<br/>
                    If you are a security researcher or expert and believe you have identified a vulnerability in Qwikto’s app, website, or systems, we welcome
                    your input. Reporting security concerns responsibly ensures we can address potential risks promptly and maintain the safety of our platform.
                    We ask that you give us the opportunity to investigate and resolve any issues before they are publicly disclosed. Please include a detailed
                    description of the issue, along with steps to reproduce it, when submitting your findings.<br/>
                    📧 Submit your findings to: [Qwikto security mail ID]<br/>
                    🔒 Acknowledgment Program: We value and recognize the contributions of those who help us enhance security. Contributors may be
                    featured on our website as a token of our gratitude.
                </p>
            </div>
        </div>
    )
}
