import React from 'react'
import style from '../../Styles/careers.module.css'

export default function CareersSection4() {
  return (
    <div>
      <section className={style.grid_boxes_form}>
        {/* <!-- Job Internship Form --> */}
            <div className={style.grid_box_form}>
                <h2>Job Internship</h2>
                <form className={style.form}>
                    <label htmlFor="internship_name">Name:</label>
                    <input type="text" id="internship-name" name="internship-name" required/>
                
                    <label htmlFor="internship-email">Email:</label>
                    <input type="email" id="internship-email" name="internship-email" required/>
                
                    <label htmlFor="internship-resume">Upload Resume:</label>
                    <input type="file" id="internship-resume" name="internship-resume" required/>
                
                    <button type="submit">Apply for Internship</button>
                </form>
            </div>
            
            {/* <!-- Job Application Form --> */}
            <div className={style.grid_box_form}>
                <h2>Job Application</h2>
                <form action="submit_job" method="post" className={style.form}>
                    <label htmlFor="job-name">Name:</label>
                    <input type="text" id="job-name" name="job-name" required/>
                
                    <label htmlFor="job-email">Email:</label>
                    <input type="email" id="job-email" name="job-email" required/>
                
                    <label htmlFor="job-resume">Upload Resume:</label>
                    <input type="file" id="job-resume" name="job-resume" required/>
                
                    <button type="submit">Apply for Job</button>
                </form>
            </div>
        </section>    
    </div>
  )
}
