import { Add, Remove } from '@material-ui/icons';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';

import productApis from '../api/product.api';
import cartApis from '../api/cart.api';

import { changeCartItems } from '../redux/cart_slice';
import numberWithCommas from '../utils/numberWithCommas';
import formatGenderUtil from '../utils/format_gender';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  flex: 1;
  display: flex;
`;

const ListImage = styled.div`
  margin: 5px;
`;

const ImageItem = styled.div`
  width: 100px;
  height: 100px;
  margin: 5px 0px;
  border: ${(props) => {
    return props.isSelected ? '1px solid black' : 'none';
  }};
`;

const Image = styled.img`
  width: 100%;
`;

const ImagePreview = styled.img`
  width: 500;
  height: 80vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const ProductTitle = styled.div``;

const Title = styled.h1`
  font-weight: 500;
`;

const CategoryTitle = styled.span`
  font-weight: 100;
  font-style: italic;
  padding: 10px;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const ProductOptionsContainer = styled.div`
  width: 100%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div``;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 500;
`;

const FilterSize = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
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
  margin: 5px 5px;
  background-color: ${(props) => (props.isActive ? 'black' : 'white')};
  color: ${(props) => (props.isActive ? 'white' : 'black')};
  cursor: pointer;

  &:hover {
    background-color: black;
    color: white;
  }
`;

const AddToCartContainer = styled.div``;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const QuantityTitle = styled.span`
  margin-right: 10px;
  font-size: 20px;
  font-weight: 500;
`;

const Amount = styled.span`
  width: 40px;
  height: 30px;
  font-weight: 400;
  border-radius: 5px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
  cursor: default;
`;

const SubmitButton = styled.div`
  margin: 40px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: 200px;
  /* height: 30px; */
  padding: 10px;
  border-radius: 5px;
  border: 1px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 700;
  transition: 0.3s all ease;

  &:hover {
    background-color: teal;
    color: white;
  }
`;

const ProductDetail = () => {
  const location = useLocation();
  const code = location.pathname.split('/')[2];
  const [selectedImgPreview, setSelectedImgPreview] = useState(1);
  const [product, setProduct] = useState(null);
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
    if (!product || !product.id) toast.error('Product not found!');
    else if (!size) toast.error('Please choose size!');
    else if (!quantity || quantity < 1) toast.error('Please choose quantity!');
    else {
      cartApis
        .addItem(product.id, size.id, quantity)
        .then((result) => {
          dispatch(changeCartItems(result.data));
          window.location.href = '/cart';
        })
        .catch((error) => {
          const { statusCode, message } = error.response.data;
          if (statusCode < 500) toast.error(message);
          else toast.error('Something went wrong...');
        });
    }
  };

  return (
    <Container>
      <Navbar />
      {product && (
        <Wrapper>
          <ImgContainer>
            <ListImage>
              <ImageItem isSelected={selectedImgPreview === 1}>
                <Image
                  src={product.image01}
                  onClick={() => setSelectedImgPreview(1)}
                />
              </ImageItem>
              <ImageItem isSelected={selectedImgPreview === 2}>
                <Image
                  src={product.image02}
                  onClick={() => setSelectedImgPreview(2)}
                />
              </ImageItem>
            </ListImage>
            <ImagePreview
              src={selectedImgPreview === 1 ? product.image01 : product.image02}
            />
          </ImgContainer>
          <InfoContainer>
            <ProductTitle>
              <Title>{product.productName}</Title>
              <CategoryTitle>
                {formatGenderUtil(product.gender)}{' '}
                {product.category.categoryName}
              </CategoryTitle>
            </ProductTitle>
            <Desc>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don’t look even
              slightly believable.
              <br />
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don’t look even
              slightly believable.
              <br />
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don’t look even
              slightly believable.
              <br />
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don’t look even
              slightly believable.
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
                <QuantityTitle>Quantity:</QuantityTitle>
                <Remove
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleChangeQuantity('dec')}
                />
                <Amount>{quantity}</Amount>
                <Add
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleChangeQuantity('inc')}
                />
              </AmountContainer>
              <SubmitButton>
                <Button onClick={handleAddToCart}>ADD TO CART</Button>
              </SubmitButton>
            </AddToCartContainer>
          </InfoContainer>
        </Wrapper>
      )}
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductDetail;
