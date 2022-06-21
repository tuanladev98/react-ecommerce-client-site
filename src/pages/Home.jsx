import React from 'react';
import Footer from '../components/Footer';
import GenderBrand from '../components/GenderBrand';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import PopularProducts from '../components/ProductList';
import Slider from '../components/Slider';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Slider />
      <GenderBrand />
      <PopularProducts />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
