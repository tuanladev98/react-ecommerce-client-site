import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Add, DeleteForeverOutlined, Remove } from '@material-ui/icons';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';

import cartApis from '../api/cart.api';
import numberWithCommas from '../utils/numberWithCommas';
import { changeCartItems } from '../redux/cart_slice';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  /* display: flex;
  align-items: center;
  justify-content: space-between; */
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === 'filled' && 'none'};
  background-color: ${(props) =>
    props.type === 'filled' ? 'black' : 'transparent'};
  color: ${(props) => props.type === 'filled' && 'white'};
`;

// const TopTexts = styled.div``;

// const TopText = styled.span`
//   text-decoration: underline;
//   cursor: pointer;
//   margin: 0px 10px;
// `;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
  padding: 20px;
`;

const ItemCart = styled.div`
  /* margin-top: 5px; */
  padding: 5px;
  border: 1px dashed lightgray;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ItemProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  cursor: pointer;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductCode = styled.span``;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.span`
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

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const DeleteItem = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DeleteButton = styled.button`
  color: red;
  background-color: white;
  border: none;
  cursor: pointer;
`;

const Summary = styled.div`
  flex: 1;
  border: 1px solid lightgray;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  height: fit-content;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === 'total' && '500'};
  font-size: ${(props) => props.type === 'total' && '24px'};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const EmptyCartContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmptyCartNotify = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmptyCartImage = styled.img`
  width: 130px;
  height: 130px;
  margin: 10px;
`;

const EmptyCartH3 = styled.span`
  font-size: 35px;
  font-weight: 300;
`;

const EmptyCartSpan = styled.span`
  margin: 5px;
  font-size: 30px;
  font-weight: 100;
  color: #9c9c9c;
`;

const EmptyCartBtn = styled.button`
  width: 200px;
  margin: 20px;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const Cart = () => {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    cartApis.getCartDetail().then((result) => {
      setCartItems(result.data.cartItems);
      setTotal(result.data.total);
    });
  }, []);

  const handleChangeQuantityItem = (
    type,
    currentItemQuantity,
    productId,
    sizeId
  ) => {
    let quantity = currentItemQuantity;
    if (type === 'dec' && currentItemQuantity > 1) {
      quantity -= 1;
      cartApis
        .updateItem(productId, sizeId, quantity)
        .then((result) => {
          setCartItems(result.data.cartItems);
          setTotal(result.data.total);
        })
        .catch((error) => {
          toast.error('An error occurred. Please try again later!');
        });
    }
    if (type === 'inc') {
      quantity += 1;
      cartApis
        .updateItem(productId, sizeId, quantity)
        .then((result) => {
          setCartItems(result.data.cartItems);
          setTotal(result.data.total);
        })
        .catch((error) => {
          toast.error('An error occurred. Please try again later!');
        });
    }
  };

  const handleDeleteCartItem = (productId, sizeId) => {
    cartApis
      .deleteItem(productId, sizeId)
      .then((result) => {
        setCartItems(result.data.cartItems);
        setTotal(result.data.total);
        dispatch(changeCartItems(result.data.cartItems));
      })
      .catch((error) => {
        toast.error('An error occurred. Please try again later!');
      });
  };

  return (
    <Container>
      <Navbar />

      {cartItems.length ? (
        <Wrapper>
          <Title>YOUR BAG</Title>
          <Top>
            <Link to="/shop">
              <TopButton>CONTINUE SHOPPING</TopButton>
            </Link>
            {/* <TopTexts>
            <TopText>Shopping Bag ({cartItems.length})</TopText>
          </TopTexts>
          <Link to="/checkout">
            <TopButton type="filled">CHECKOUT NOW</TopButton>
          </Link> */}
          </Top>
          <Bottom>
            <Info>
              {cartItems.map((item) => {
                return (
                  <ItemCart key={item.id}>
                    <Product>
                      <ItemProductDetail>
                        <Link to={`/product/${item.product.code}`}>
                          <Image src={item.product.image01} />
                        </Link>
                        <Details>
                          <ProductName>
                            <b>Product:</b> {item.product.productName}
                          </ProductName>
                          <ProductCode>
                            <b>Code:</b> {item.product.code}
                          </ProductCode>
                          <ProductSize>
                            <b>Size:</b> {item.size.euSize}
                          </ProductSize>
                        </Details>
                      </ItemProductDetail>
                      <PriceDetail>
                        <ProductAmountContainer>
                          <Remove
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                              handleChangeQuantityItem(
                                'dec',
                                item.quantity,
                                item.productId,
                                item.sizeId
                              )
                            }
                          />
                          <ProductAmount>{item.quantity}</ProductAmount>
                          <Add
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                              handleChangeQuantityItem(
                                'inc',
                                item.quantity,
                                item.productId,
                                item.sizeId
                              )
                            }
                          />
                        </ProductAmountContainer>
                        <ProductPrice>
                          {numberWithCommas(item.product.price * item.quantity)}
                          ₫
                        </ProductPrice>
                      </PriceDetail>
                      <DeleteItem>
                        <DeleteButton
                          onClick={() =>
                            handleDeleteCartItem(item.productId, item.sizeId)
                          }
                        >
                          <DeleteForeverOutlined />
                        </DeleteButton>
                      </DeleteItem>
                    </Product>
                  </ItemCart>
                );
              })}
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>
                  {cartItems
                    .map((item) => item.quantity)
                    .reduce(
                      (previousVal, currentVal) => previousVal + currentVal,
                      0
                    )}{' '}
                  ITEMS
                </SummaryItemText>
                <SummaryItemPrice>{numberWithCommas(total)} ₫</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>DELIVERY</SummaryItemText>
                <SummaryItemPrice>Free</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>TOTAL</SummaryItemText>
                <SummaryItemPrice>{numberWithCommas(total)} ₫</SummaryItemPrice>
              </SummaryItem>
              <Link to="/checkout">
                <Button>CHECKOUT NOW</Button>
              </Link>
            </Summary>
          </Bottom>
        </Wrapper>
      ) : (
        <Wrapper>
          <EmptyCartContainer>
            <EmptyCartNotify>
              <EmptyCartImage src="https://i.imgur.com/dCdflKN.png" />
              <EmptyCartH3>Your cart is empty!</EmptyCartH3>
              <EmptyCartSpan>Add something to make me happy :)</EmptyCartSpan>
              <Link to="/shop">
                <EmptyCartBtn>CONTINUE SHOPPING</EmptyCartBtn>
              </Link>
            </EmptyCartNotify>
          </EmptyCartContainer>
        </Wrapper>
      )}

      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Cart;
