import { useState } from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";

const popularProducts = [
  {
    productName: "GIÀY ZX 22 BOOST",
    image01:
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/8129befd83a043678710adf5007bf1e7_9366/Giay_ZX_22_BOOST_trang_GY6695_01_standard.jpg",
  },
  {
    productName: "GIÀY RETROPY F2",
    image01:
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/6e9400c0834444fcb77aadf800cb1651_9366/Giay_Retropy_F2_trang_GW0508_01_standard.jpg",
  },
  {
    productName: "SUPERSTAR",
    image01:
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/cf20270ca491489e8f91ae2e0167c13d_9366/SUPERSTAR_Be_GW4443_01_standard.jpg",
  },
  {
    productName: "GIÀY NIZZA HI PARLEY",
    image01:
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/46f7fd2b4c77455e88d5adf900a19e7e_9366/Giay_Nizza_Hi_Parley_trang_GV7617_01_standard.jpg",
  },
  {
    productName: "GIÀY NIZZA PARLEY",
    image01:
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/1e36ee220ee14dbba753ade30084c21f_9366/Giay_Nizza_Parley_trang_GZ1474_01_standard.jpg",
  },
  {
    productName: "GIÀY STAN SMITH",
    image01:
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/e10dae92843745f792e0ae060099a117_9366/Giay_Stan_Smith_trang_GY1072_01_standard.jpg",
  },
];

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ProductList = ({ filters, sort }) => {
  const [products, setProducts] = useState([]);

  return (
    <Container>
      {products.map((product) => (
        <ProductCard data={product} key={product.id} />
      ))}
    </Container>
  );
};

export default ProductList;
