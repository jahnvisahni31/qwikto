"use client"
import React from 'react';
import { useState } from 'react';
import '../../Styles/faltuStyle.css';

export default function SelectUser({ onSelect }) {
    const [selectedOption, setSelectedOption] = useState('customer');

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    onSelect(value); 
  };
  return (
    <div>

        <div className="radio-input">
            <label>
                <input
                value="customer"
                name="value-radio"
                id="value-1"
                type="radio"
                checked={selectedOption === 'customer'}
                onChange={handleChange}
                />
                <span className='spanName'>Customer</span>
            </label>
            <label>
                <input
                value="vendor"
                name="value-radio"
                id="value-2"
                type="radio"
                checked={selectedOption === 'vendor'}
                onChange={handleChange}
                />
                <span className='spanName'>Vendor</span>
            </label>
            <span className="selection"></span>
        </div>
    </div>
  )
}
