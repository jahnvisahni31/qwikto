import React from 'react'
import '../Styles/faltuStyle.css';

export default function SuccessAnimation() {
  return (
    <div className="success-animation">
      <div className="checkmark">
        <svg viewBox="0 0 52 52">
          <path d="M14 27 l10 10 l16 -16" />
        </svg>
      </div>
    </div>
  )
}
