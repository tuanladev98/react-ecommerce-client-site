import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';

import cartApis from '../api/cart.api';
import orderApis from '../api/order.api';
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
  const [provinceData, setProvinceData] = useState(addressData);
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

  const handleSelectProvince = (e) => {
    const value = JSON.parse(e.target.value);
    setProvince(value);
    //
    setDistrict(null);
    setDistrictData(provinceData.find((ele) => ele.Id === value.Id).Districts);
    //
    setWard(null);
    setWardData([]);
  };

  const handleSelectDistrict = (e) => {
    const value = JSON.parse(e.target.value);
    setDistrict(value);
    setWard(null);
    //
    setWardData(districtData.find((ele) => ele.Id === value.Id).Wards);
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
          province.Name,
          district.Name,
          ward.Name,
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
        <OrderContainer>
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
                    <SelectOption
                      value={JSON.stringify({ Id: ele.Id, Name: ele.Name })}
                      key={index}
                    >
                      {ele.Name}
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
                    <SelectOption
                      value={JSON.stringify({ Id: ele.Id, Name: ele.Name })}
                      key={index}
                    >
                      {ele.Name}
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
                      {ele.Name}
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
