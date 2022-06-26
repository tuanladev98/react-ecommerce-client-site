import { Add, Remove } from '@material-ui/icons';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';

import productApis from '../api/product.api';
import cartApis from '../api/cart.api';

import { changeCartItems } from '../redux/cart_slice';
import numberWithCommas from '../utils/numberWithCommas';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 80vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const ProductOptionsContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div``;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterSize = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const SizeOption = styled.div`
  width: 45px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  border: 1px solid black;
  border-radius: 5px;
  margin: 0px 5px;
  background-color: ${(props) => (props.isActive ? 'black' : 'white')};
  color: ${(props) => (props.isActive ? 'white' : 'black')};
  cursor: pointer;

  &:hover {
    background-color: black;
    color: white;
  }
`;

const AddToCartContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 40px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border-radius: 5px;
  border: 1px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  transition: 0.3s all ease;

  &:hover {
    background-color: teal;
    color: white;
  }
`;

const ProductDetail = () => {
  const location = useLocation();
  const code = location.pathname.split('/')[2];
  const [product, setProduct] = useState({
    id: null,
    code: '',
    productName: '',
    description: '',
    price: 0,
    gender: '',
    image01: '',
    image02: '',
    isDelete: false,
    categoryId: null,
    availableSizes: [],
  });
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    // scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    productApis.getOne(code).then((result) => {
      setProduct(result.data);
    });
  }, [code]);

  const handleChangeQuantity = (type) => {
    if (type === 'dec') {
      quantity > 1 && setQuantity(quantity - 1);
    }
    if (type === 'inc') {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    // add item to cart
    if (!product || !product.id) alert('Product not found!');
    else if (!size) alert('Please choose size!');
    else if (!quantity || quantity < 1) alert('Please choose quantity!');
    else {
      cartApis
        .addItem(product.id, size.id, quantity)
        .then((result) => {
          dispatch(changeCartItems(result.data));
        })
        .catch((error) => {
          const { statusCode, message } = error.response.data;
          if (statusCode < 500) alert(message);
          else alert('Something went wrong...');
        });
    }
  };

  return (
    <Container>
      <Navbar />

      <Wrapper>
        <ImgContainer>
          <Image src={product.image01} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.productName}</Title>
          <Desc>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don’t look even slightly
            believable.
            <br />
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don’t look even slightly
            believable.
            <br />
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don’t look even slightly
            believable.
            <br />
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don’t look even slightly
            believable.
          </Desc>
          <Price>{numberWithCommas(product.price)} ₫</Price>
          <ProductOptionsContainer>
            <Filter>
              <FilterTitle>Available sizes:</FilterTitle>
              <FilterSize>
                {product.availableSizes.map((sizeEle) => {
                  return (
                    <SizeOption
                      key={sizeEle.id}
                      onClick={() => {
                        setSize(sizeEle);
                        setQuantity(1);
                      }}
                      isActive={size && size.id === sizeEle.id}
                    >
                      {sizeEle.euSize}
                    </SizeOption>
                  );
                })}
              </FilterSize>
            </Filter>
          </ProductOptionsContainer>
          <AddToCartContainer>
            <AmountContainer>
              <Remove onClick={() => handleChangeQuantity('dec')} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleChangeQuantity('inc')} />
            </AmountContainer>
            <Link to="/cart">
              <Button onClick={handleAddToCart}>ADD TO CART</Button>
            </Link>
          </AddToCartContainer>
        </InfoContainer>
      </Wrapper>

      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductDetail;
