import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';

import cartApis from '../api/cart.api';
import orderApis from '../api/order.api';
import numberWithCommas from '../utils/numberWithCommas';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px 300px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const CheckoutContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ShippingDetailContainer = styled.div`
  flex: 3;
  margin: 40px;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 10px;
  height: fit-content;
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

const OrderSummaryContainer = styled.div`
  flex: 2;
  height: fit-content;
  margin: 10px;
  margin: 40px 0px;
`;

const OrderSummary = styled.div`
  width: 100%;
  height: fit-content;
  margin: 0px 10px;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 10px;
`;

const OrderSummaryTitle = styled.div`
  font-weight: bold;
  text-align: center;
`;

const OrderSummaryItem = styled.div`
  margin: 20px 30px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === 'total' && '500'};
  font-size: ${(props) => props.type === 'total' && '24px'};
`;

const OrderSummaryItemText = styled.span``;

const OrderSummaryItemPrice = styled.span``;

const OrderDetail = styled.div`
  width: 100%;
  height: fit-content;
  margin: 40px 10px;
  border: 1px dashed lightgray;
  border-radius: 5px;
  padding: 10px;
`;

const OrderDetailTitle = styled.div`
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

const EditCart = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EditCartButton = styled.button`
  width: 150px;
  padding: 10px;
  font-weight: 1000;
  cursor: pointer;
  border: 1px solid black;
  background-color: black;
  color: white;
  margin: 10px 0px;
`;

const AcceptedPaymentMethod = styled.div`
  width: 100%;
  height: fit-content;
  margin: 40px 10px;
  padding: 10px;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  padding: 20px;
`;

const AcceptedPaymentMethodTitle = styled.div`
  font-weight: bold;
  text-align: center;
`;

const PaymentMethodItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 20px;
`;

const PaymentMethodItemImage = styled.img`
  width: 50px;
  height: 30px;
  margin: 0px 10px;
`;

const PaymentMethodItemTitle = styled.span`
  margin: 0px 10px;
`;

const Checkout = () => {
  const [provinceData, setProvinceData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [wardData, setWardData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const [receiver, setReceiver] = useState(null);
  const [address, setAddress] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [province, setProvince] = useState(null);
  const [district, setDistrict] = useState(null);
  const [ward, setWard] = useState(null);
  const [postcode, setPostcode] = useState(null);

  useEffect(() => {
    cartApis.getCartDetail().then((result) => {
      setCartItems(result.data.cartItems);
      setTotal(result.data.total);
    });
  }, []);

  useEffect(() => {
    axios
      .get(
        'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province',
        {
          headers: {
            token: '6955b7d1-063f-11ed-9cd0-9a5a4229953a',
          },
        }
      )
      .then((result) => {
        setProvinceData(result.data['data']);
      });
  }, []);

  const handleSelectProvince = (e) => {
    const value = JSON.parse(e.target.value);

    if (value)
      axios
        .get(
          'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district',
          {
            headers: {
              token: '6955b7d1-063f-11ed-9cd0-9a5a4229953a',
            },
            params: {
              province_id: value.ProvinceID,
            },
          }
        )
        .then((result) => {
          setProvince(value);
          //
          setDistrict(null);
          setDistrictData(result.data['data']);
          //
          setWard(null);
          setWardData([]);
        });
  };

  const handleSelectDistrict = (e) => {
    const value = JSON.parse(e.target.value);

    if (value)
      axios
        .get(
          'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward',
          {
            headers: {
              token: '6955b7d1-063f-11ed-9cd0-9a5a4229953a',
            },
            params: {
              district_id: value.DistrictID,
            },
          }
        )
        .then((result) => {
          setDistrict(value);
          //
          setWard(null);
          setWardData(result.data['data']);
        });
  };

  const handleSelectWard = (e) => {
    const value = JSON.parse(e.target.value);

    setWard(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!receiver) alert('Please input receiver');
    else if (!address) alert('Please input address');
    else if (!phoneNumber) alert('Please input phone number');
    else if (!province) alert('Please select province');
    else if (!district) alert('Please select district');
    else if (!ward) alert('Please select ward');
    else if (!postcode) alert('Please inut postcode');
    else {
      // call api:
      orderApis
        .createOrder(
          receiver,
          address,
          phoneNumber,
          province.ProvinceName,
          district.DistrictName,
          ward.WardName,
          postcode
        )
        .then((result) => {
          console.log(result.data);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <Container>
      <Navbar />

      <Wrapper>
        <Title>COMPLETE YOUR ORDER</Title>
        <CheckoutContainer>
          <ShippingDetailContainer>
            <ShippingDetailTitle>DELIVERY INFORMATION</ShippingDetailTitle>
            <InputGroup>
              <InputLabel>Receiver *:</InputLabel>
              <InputText
                name="ip_receiver"
                placeholder="Enter receiver name..."
                onChange={(e) => setReceiver(e.target.value)}
              />
            </InputGroup>

            <InputGroup>
              <InputLabel>Address *:</InputLabel>
              <InputText
                name="ip_address"
                placeholder="Enter address..."
                onChange={(e) => setAddress(e.target.value)}
              />
            </InputGroup>

            <InputGroup>
              <InputLabel>Phone number *:</InputLabel>
              <InputText
                name="ip_phone_number"
                placeholder="Enter phone number..."
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </InputGroup>

            <SelectRegion>
              <SelectGroup name="sl_province" onChange={handleSelectProvince}>
                <SelectOption
                  value={null}
                  disabled
                  selected={province === null}
                >
                  -- Province --
                </SelectOption>
                {provinceData.map((ele, index) => {
                  return (
                    <SelectOption value={JSON.stringify(ele)} key={index}>
                      {ele.ProvinceName}
                    </SelectOption>
                  );
                })}
              </SelectGroup>
              <SelectGroup name="sl_district" onChange={handleSelectDistrict}>
                <SelectOption
                  value={null}
                  disabled
                  selected={district === null}
                >
                  -- District --
                </SelectOption>
                {districtData.map((ele, index) => {
                  return (
                    <SelectOption value={JSON.stringify(ele)} key={index}>
                      {ele.DistrictName}
                    </SelectOption>
                  );
                })}
              </SelectGroup>
              <SelectGroup name="sl_ward" onChange={handleSelectWard}>
                <SelectOption value={null} disabled selected={ward === null}>
                  -- Ward --
                </SelectOption>
                {wardData.map((ele, index) => {
                  return (
                    <SelectOption value={JSON.stringify(ele)} key={index}>
                      {ele.WardName}
                    </SelectOption>
                  );
                })}
              </SelectGroup>
              <InputPostcode
                name="ip_postcode"
                placeholder="Enter postcode..."
                onChange={(e) => setPostcode(e.target.value)}
              />
            </SelectRegion>

            <SubmitOrder>
              <SubmitButton onClick={handleSubmit}>PLACE ORDER</SubmitButton>
            </SubmitOrder>
          </ShippingDetailContainer>
          <OrderSummaryContainer>
            <OrderSummary>
              <OrderSummaryTitle>ORDER SUMMARY</OrderSummaryTitle>
              <OrderSummaryItem>
                <OrderSummaryItemText>
                  {cartItems
                    .map((item) => item.quantity)
                    .reduce(
                      (previousVal, currentVal) => previousVal + currentVal,
                      0
                    )}{' '}
                  ITEMS
                </OrderSummaryItemText>
                <OrderSummaryItemPrice>
                  {numberWithCommas(total)}₫
                </OrderSummaryItemPrice>
              </OrderSummaryItem>
              <OrderSummaryItem>
                <OrderSummaryItemText>DELIVERY</OrderSummaryItemText>
                <OrderSummaryItemPrice>Free</OrderSummaryItemPrice>
              </OrderSummaryItem>
              <OrderSummaryItem type="total">
                <OrderSummaryItemText>TOTAL</OrderSummaryItemText>
                <OrderSummaryItemPrice>
                  {numberWithCommas(total)}₫
                </OrderSummaryItemPrice>
              </OrderSummaryItem>
            </OrderSummary>

            <OrderDetail>
              <OrderDetailTitle>ORDER DETAIL</OrderDetailTitle>
              <ListItem>
                {cartItems.map((item) => {
                  return (
                    <Item key={item.id}>
                      <Link to={`/product/${item.product.code}`}>
                        <ImageProduct src={item.product.image01} />
                      </Link>
                      <ItemDetail>
                        <ProductName>
                          <b>Product:</b> {item.product.productName} (
                          {item.product.code})
                        </ProductName>
                        <ProductSize>
                          <b>Size:</b> {item.size.euSize}
                        </ProductSize>
                        <Quantity>
                          <b>Quantity:</b> {item.quantity}
                        </Quantity>
                      </ItemDetail>
                    </Item>
                  );
                })}
              </ListItem>
              <EditCart>
                <Link to="/cart">
                  <EditCartButton>EDIT ITEMS</EditCartButton>
                </Link>
              </EditCart>
            </OrderDetail>

            <AcceptedPaymentMethod>
              <AcceptedPaymentMethodTitle>
                ACCEPTED PAYMENT METHODS
              </AcceptedPaymentMethodTitle>
              <PaymentMethodItem>
                <PaymentMethodItemImage src="https://www.adidas.com.vn/static/checkout/react/158aba0/assets/img/icon-adidas-cash-on-delivery.svg" />
                <PaymentMethodItemTitle>
                  - Cash on delivery
                </PaymentMethodItemTitle>
              </PaymentMethodItem>
            </AcceptedPaymentMethod>
          </OrderSummaryContainer>
        </CheckoutContainer>
      </Wrapper>

      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Checkout;
