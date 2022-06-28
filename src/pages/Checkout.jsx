import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Add, DeleteForeverOutlined, Remove } from '@material-ui/icons';
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

const BillSummaryContainer = styled.div`
  flex: 1;
  margin: 40px;
  border: 1px dashed lightgray;
  border-radius: 5px;
  padding: 10px;
`;

const BillSummaryTitle = styled.div`
  font-weight: bold;
  text-align: center;
`;

const Checkout = () => {
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

            <SelectRegion>
              <SelectGroup name="province">
                <SelectOption disabled selected>
                  -- Province --
                </SelectOption>
                {addressData.map((province, index) => {
                  return (
                    <SelectOption key={index}>{province.Name}</SelectOption>
                  );
                })}
              </SelectGroup>
              <SelectGroup name="district">
                <SelectOption disabled selected>
                  -- District --
                </SelectOption>
              </SelectGroup>
              <SelectGroup name="ward">
                <SelectOption disabled selected>
                  -- Ward --
                </SelectOption>
              </SelectGroup>
              <InputPostcode name="postcode" placeholder="Enter postcode..." />
            </SelectRegion>
          </ShippingDetailContainer>
          <BillSummaryContainer>
            <BillSummaryTitle>BILL SUMMARY</BillSummaryTitle>
          </BillSummaryContainer>
        </OrderContainer>
      </Wrapper>

      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Checkout;
