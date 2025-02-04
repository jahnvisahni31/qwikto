import React from 'react'
import '../ItemPageComponents/itemCard.css';

export default function ItemCardComponent({ item, onOrder }) {
    return (
        <div>
        <div className="main">
          <div className="card">
            <img src={item.images[0]} alt={item.name} />
          </div>
          <div className="fl">
            <h1>{item.name}</h1>
            <h6>{item.category}</h6>
            <div>
              <p>Price: ₹{item.qwiktoPrice}</p>
            </div>
            <button onClick={() => onOrder(item)}>Order</button>
          </div>
        </div>
      </div>
    )
}
