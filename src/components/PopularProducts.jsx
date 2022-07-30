import { useState, useEffect } from 'react';
import styled from 'styled-components';

import ProductCard from './ProductCard';

import productApis from '../api/product.api';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const PopularProducts = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const userId = currentUser && currentUser && currentUser.userInfo.id;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    productApis.getPopularProduct(userId).then((result) => {
      setProducts(result.data);
    });
  }, [userId]);

  return (
    <Container>
      {products.map((product) => (
        <ProductCard productData={product} key={product.id} />
      ))}
    </Container>
  );
};

export default PopularProducts;
