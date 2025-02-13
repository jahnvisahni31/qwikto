"use client";
import React, { useState } from "react";
import { MapPin, Search } from "lucide-react";
import { categories, cuisines, fashion, electronics, beauty, healthConcerns, shopCategories } from "./index";
import styles from "../../Styles/hompage.module.css";

const Homepage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered results based on search term
  const filteredCuisines = cuisines.filter((cuisine) =>
    cuisine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFashion = fashion.filter((brand) =>
    brand.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredElectronics = electronics.filter((brand) =>
    brand.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBeauty = beauty.filter((brand) =>
    brand.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredHealthConcerns = healthConcerns.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredShopCategories = shopCategories.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.headerWrapper}>
        <div className={styles.container}>
          <h1>Whatever Is On Your Mind, We Deliver In 10 Minutes!</h1>
          <div className={styles.searchBar}>
            <div className={styles.locationSelect}>
              <MapPin size={20} />
              <span>Search locations</span>
            </div>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search for places, cuisines, and more..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={20} style={{ margin: "0 10px", color: "#ff6b6b" }} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={styles.container}>
        {/* Categories */}
        <section className={styles.categories}>
          <h2 className={styles.sectionTitle}>Categories</h2>
          <div className={styles.categoryIcons}>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <div key={category.id} className={styles.categoryItem}>
                  <img src={category.image} alt={category.name} className={styles.categoryImage} />
                  <span>{category.name}</span>
                </div>
              ))
            ) : (
              <p>No categories found.</p>
            )}
          </div>
        </section>

        {/* Cuisines */}
        <section className={styles.cuisineSection}>
          <h2 className={styles.sectionTitle}>
            Explore Cuisines & Biggest Savings
          </h2>
          <div className={styles.cuisineGrid}>
            {filteredCuisines.length > 0 ? (
              filteredCuisines.map((cuisine) => (
                <div key={cuisine.id} className={styles.cuisineCard}>
                  <img src={cuisine.image} alt={cuisine.name} />
                  <p>{cuisine.name}</p>
                </div>
              ))
            ) : (
              <p>No cuisines found.</p>
            )}
          </div>
        </section>

        {/* Fashion Brands Section */}
        <section className={styles.fashionSection}>
          <h2 className={styles.sectionTitle}>Brands That Elevate Your Look</h2>
          <div className={styles.fashionGrid}>
            {filteredFashion.length > 0 ? (
              filteredFashion.map((item) => (
                <div key={item.id} className={styles.fashionCard}>
                  <img src={item.image} alt={item.title} />
                  <div className={styles.fashionCardContent}>
                    <h3 className={styles.fashionCardTitle}>{item.title}</h3>
                    <p className={styles.fashionCardDescription}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No fashion brands found.</p>
            )}
          </div>
        </section>

        {/* Electronics Brands Section */}
        <section className={styles.electronicsSection}>
          <h2 className={styles.sectionTitle}>Brands That Upgrade Your Experience</h2>
          <div className={styles.electronicsGrid}>
            {filteredElectronics.length > 0 ? (
              filteredElectronics.map((item) => (
                <div key={item.id} className={styles.electronicsCard}>
                  <img src={item.image} alt={item.title} />
                  <p className={styles.electronicsTitle}>{item.title}</p>
                  <span className={styles.discountBadge}>{item.discount}</span>
                </div>
              ))
            ) : (
              <p>No electronics brands found.</p>
            )}
          </div>
        </section>

        {/* Beauty Brands Section */}
        <section className={styles.beautySection}>
          <h2 className={styles.sectionTitle}>Save Big at Your Nearby Beauty Stores</h2>
          <div className={styles.beautyGrid}>
            {filteredBeauty.length > 0 ? (
              filteredBeauty.map((item) => (
                <div key={item.id} className={styles.beautyCard}>
                  <img src={item.image} alt={item.title} />
                  <p className={styles.beautyTitle}>{item.title}</p>
                  <span className={styles.discountBadge}>{item.discount}</span>
                </div>
              ))
            ) : (
              <p>No beauty brands found.</p>
            )}
          </div>
        </section>
        <section className={styles.healthConcerns}>
          <h2 className={styles.sectionTitle}>Shop by Health Concerns</h2>
          <div className={styles.healthConcernsGrid}>
            {filteredHealthConcerns.length > 0 ? (
              filteredHealthConcerns.map((item) => (
                <div key={item.id} className={styles.healthCard}>
                  <img src={item.image} alt={item.title} />
                  <p>{item.title}</p>
                </div>
              ))
            ) : (
              <p>No health concerns found.</p>
            )}
          </div>
        </section>

        {/* Shop by Category */}
        <section className={styles.shopCategory}>
          <h2 className={styles.sectionTitle}>Shop by Category</h2>
          <div className={styles.categoryGrid}>
            {filteredShopCategories.length > 0 ? (
              filteredShopCategories.map((item) => (
                <div key={item.id} className={styles.categoryCard}>
                  <img src={item.image} alt={item.title} />
                  <p>{item.title}</p>
                </div>
              ))
            ) : (
              <p>No categories found.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Homepage;
