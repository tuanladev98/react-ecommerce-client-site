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

const ProductList = ({ filters, sort }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productApis
      .filterProduct(filters.category, filters.gender, sort)
      .then((result) => {
        setProducts(result.data);
      });
  }, [filters, sort]);

  return (
    <Container>
      {products.map((product) => (
        <ProductCard productData={product} key={product.id} />
      ))}
    </Container>
  );
};

export default ProductList;
