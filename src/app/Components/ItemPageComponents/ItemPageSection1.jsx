'use client';
import React, { useState, useEffect } from 'react';
import ItemCard from '@/app/Components/ItemPageComponents/ItemCard';
import CategorySection from './CatetorySection';
import style from '../../Styles/item.module.css';
import { useRouter } from 'next/navigation'; 
import BASE_URL from '@/appConfig';
// import '/Pages/Items/Order'

export default function ItemPageComponents() {
  const [items, setItems] = useState([]); // Ensure items is initialized as an array
  const [orderData, setOrderData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle API errors

  const router = useRouter();

  const categories = [
    { name: 'All', image: 'https://www.vegetables.co.nz/assets/Vegetables-co-nz/Vegetables/artichoke-globe__FitMaxWzYxNSw2MTVd.jpg' },
    { name: 'Fruits', image: 'https://www.vegetables.co.nz/assets/Vegetables-co-nz/Vegetables/tomato__FitMaxWzYxNSw2MTVd.jpg' },
    { name: 'Flower', image: 'https://www.vegetables.co.nz/assets/Vegetables-co-nz/Vegetables/cauliflower__FitMaxWzYxNSw2MTVd.jpg' },
    { name: 'Leaves', image: 'https://www.vegetables.co.nz/assets/Vegetables-co-nz/Vegetables/witloof__FitMaxWzYxNSw2MTVd.jpg' },
    { name: 'Root Vegetables', image: 'https://www.vegetables.co.nz/assets/Vegetables-co-nz/Vegetables/turnip__FitMaxWzYxNSw2MTVd.jpg' },
    { name: 'Pods & Seeds', image: 'https://www.vegetables.co.nz/assets/Vegetables-co-nz/Vegetables/sweet-corn__FitMaxWzYxNSw2MTVd.jpg' },
  ];

  const handleOrder = (item) => {
    // console.log('Item:', item.name); // Check the structure of the item
    try {
      const serializedItem = JSON.stringify(item);
      router.push(
        `/Pages/Items/Order?item=${encodeURIComponent(serializedItem)}`
      );
    } catch (error) {
      console.error('Error in handleOrder:', error);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const filteredItems =
    selectedCategory === 'All'
      ? items
      : items.filter((item) => item.category === selectedCategory);

  // Fetch items from the API
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/api/item/listAllItems`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setItems(data.data || []); // Ensure default to empty array if data.items is undefined
      } catch (err) {
        console.error('Failed to fetch items:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Handle loading and error states
  if (loading) {
    return <div>Loading items...</div>;
  }

  if (error) {
    return <div>Error loading items: {error}</div>;
  }

  // console.log(filteredItems)
  return (
    <div className={style.item_page}>
      <CategorySection
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />
      <div>
        <h1>{orderData}</h1>
      </div>
      <div className={style.allItemSection}>
        {filteredItems && filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <ItemCard key={item._id} item={item} onOrder={handleOrder} />
          ))
        ) : (
          <div>No items found for the selected category.</div>
        )}
      </div>
    </div>
  );
}
