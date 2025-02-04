import React from "react";
import styles from "../../Styles/item.module.css";
import style from '../../Pages/Items/Order/order.module.css'

const ItemDetails = ({ item, onClose }) => {
    if (!item) return null;

    return (
        <div className={styles.itemDetailsModal}>
            <div className={style.order_page}>
                <h1 className={style.page_title}>Item Details</h1>
                <div className={style.order_details_container}>
                    {/* Image Scroller */}
                    <div className={style.image_scroller}>
                        {item.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Product Image ${index + 1}`}
                                className={style.product_image}
                            />
                        ))}
                    </div>

                    {/* Item Details */}
                    <div className={style.item_detils_container}>
                        <div className={style.item_details}>
                            <p> {item.name}</p>
                            <p> {item.description}</p>
                            <p><strong>Category:</strong> {item.category}</p>
                            <p><strong>Price:</strong> <span className={style.vendorPrice}>₹{item.vendorPrice}</span></p>
                            <p className={style.status}>
                                <strong>Stock Quantity: <span>{item.stockQuantity}</span></strong> {item.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className={style.button_container}>
                            <button
                                onClick={onClose}
                                className={style.back_button}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetails;
