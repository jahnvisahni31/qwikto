import SignUp from '@/app/Components/SignUpLoginComponents/SignUp'
import React from 'react'
import '../../Styles/faltuStyle.css'
// import SelectUser from '@/app/Components/SignUpLoginComponents/SelectUser'

export default function page() {
  return (
    <div className='SignUpLogin_page'>
      <SignUp/>
      {/* <SelectUser/> */}
    </div>
  )
}
