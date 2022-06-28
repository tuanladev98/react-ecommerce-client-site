import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';

import cartApis from '../api/cart.api';
import numberWithCommas from '../utils/numberWithCommas';
import addressData from '../utils/address.json';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px 200px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const OrderContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ShippingDetailContainer = styled.div`
  flex: 3;
  margin: 40px;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 10px;
  height: 80%;
`;

const ShippingDetailTitle = styled.div`
  font-weight: bold;
  text-align: center;
`;

const InputGroup = styled.div`
  margin: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InputLabel = styled.label`
  font-weight: bold;
`;

const InputText = styled.input`
  border: 1px solid lightgray;
  margin: 10px 0;
  padding: 10px;
`;

const SelectRegion = styled.div`
  margin: 10px;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
`;

const SelectGroup = styled.select`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  border: 1px solid lightgray;
  background-color: white;
`;

const SelectOption = styled.option`
  /* margin: 20px 10px 0px 0px;
  padding: 10px; */
  /* border: 1px solid lightgray; */
  background-color: white;
`;

const InputPostcode = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  border: 1px solid lightgray;
`;

const SubmitOrder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SubmitButton = styled.button`
  width: 300px;
  padding: 10px;
  font-weight: 1000;
  cursor: pointer;
  border: 1px solid black;
  background-color: white;
  color: black;
  margin-bottom: 10px;
  transition: all 0.3s ease;

  &:hover {
    background-color: black;
    color: white;
  }
`;

const BillSummaryContainer = styled.div`
  flex: 2;
  margin: 40px 10px;
  border: 1px dashed lightgray;
  border-radius: 5px;
  padding: 10px;
`;

const BillSummaryTitle = styled.div`
  font-weight: bold;
  text-align: center;
`;

const ListItem = styled.div`
  margin-top: 20px;
`;

const Item = styled.div`
  display: flex;
  margin-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid lightgray;
`;

const ImageProduct = styled.img`
  width: 90px;
  height: 90px;
`;

const ItemDetail = styled.div`
  padding: 0px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductSize = styled.span``;

const Quantity = styled.span``;

const SummaryTotal = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  font-size: 24px;
`;

const SummaryText = styled.span``;

const SummaryPrice = styled.span``;

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    cartApis.getCartDetail().then((result) => {
      setCartItems(result.data.cartItems);
      setTotal(result.data.total);
    });
  }, []);

  return (
    <Container>
      <Navbar />

      <Wrapper>
        <Title>COMPLETE YOUR ORDER</Title>
        <OrderContainer>
          <ShippingDetailContainer>
            <ShippingDetailTitle>DELIVERY INFORMATION</ShippingDetailTitle>
            <InputGroup>
              <InputLabel>Receiver *:</InputLabel>
              <InputText name="receiver" placeholder="Enter receiver name..." />
            </InputGroup>

            <InputGroup>
              <InputLabel>Address *:</InputLabel>
              <InputText name="address" placeholder="Enter address..." />
            </InputGroup>

            <InputGroup>
              <InputLabel>Phone number *:</InputLabel>
              <InputText
                name="phone_number"
                placeholder="Enter phone number..."
              />
            </InputGroup>

            <SelectRegion>
              <SelectGroup name="province">
                <SelectOption value={null} disabled selected>
                  -- Province --
                </SelectOption>
                {addressData.map((province, index) => {
                  return (
                    <SelectOption key={index}>{province.Name}</SelectOption>
                  );
                })}
              </SelectGroup>
              <SelectGroup name="district">
                <SelectOption value={null} disabled selected>
                  -- District --
                </SelectOption>
              </SelectGroup>
              <SelectGroup name="ward">
                <SelectOption value={null} disabled selected>
                  -- Ward --
                </SelectOption>
              </SelectGroup>
              <InputPostcode name="postcode" placeholder="Enter postcode..." />
            </SelectRegion>

            <SubmitOrder>
              <SubmitButton>PLACE ORDER</SubmitButton>
            </SubmitOrder>
          </ShippingDetailContainer>
          <BillSummaryContainer>
            <BillSummaryTitle>BILL SUMMARY</BillSummaryTitle>
            <ListItem>
              {cartItems.map((item, index) => {
                return (
                  <Item key={index}>
                    <ImageProduct src={item.product.image01} />
                    <ItemDetail>
                      <ProductName>
                        <b>Product:</b> {item.product.productName} (
                        {item.product.code})
                      </ProductName>
                      <ProductSize>
                        <b>Size:</b> 41
                      </ProductSize>
                      <Quantity>
                        <b>Quantity:</b> 1
                      </Quantity>
                    </ItemDetail>
                  </Item>
                );
              })}
            </ListItem>

            <SummaryTotal>
              <SummaryText>Total:</SummaryText>
              <SummaryPrice>{numberWithCommas(total)} ₫</SummaryPrice>
            </SummaryTotal>
          </BillSummaryContainer>
        </OrderContainer>
      </Wrapper>

      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Checkout;
