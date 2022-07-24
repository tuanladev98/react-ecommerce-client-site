import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as dayjs from 'dayjs';
import styled from 'styled-components';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';

import orderApis from '../api/order.api';
import numberWithCommas from '../utils/numberWithCommas';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const TrackingOrderContainer = styled.div`
  width: 70%;
  /* border: 1px dashed lightgray; */
  padding: 20px;
`;

const OrderSummaryInfo = styled.div`
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const OrderCode = styled.h1`
  font-size: 50px;
`;

const OrderInfo = styled.span`
  font-weight: 300;
`;

const OrderTrackingStatus = styled.div`
  padding: 20px;
  border-bottom: 1px solid lightgray;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
`;

const TrackingStep = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 10px;
`;

const StepNumber = styled.div`
  width: 45px;
  height: 45px;
  margin: 0px 10px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.isActive ? 'black' : '#acacac')};
  color: white;
  font-size: 25px;
`;

const StepTitle = styled.span`
  font-size: 18px;
  color: ${(props) => (props.isActive ? 'black' : '#acacac')};
`;

const Hr = styled.hr`
  width: 100px;
  color: black;
`;

const OrderBills = styled.div`
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const ListItem = styled.div`
  margin-top: 20px;
`;

const Item = styled.div`
  display: flex;
  margin-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px dashed lightgray;
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

const OrderDetails = styled.div`
  padding: 20px;
`;

const OrderDetailsContainer = styled.div`
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;
`;

const DeliveryAndPaymentInfo = styled.div`
  width: 256px;
  margin-right: 20px;
`;

const DeliveryAndPaymentInfoPath = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const InfoSpan = styled.span`
  font-size: 15px;
  color: #acacac;
`;

const OrderDetailsSummary = styled.div`
  width: 400px;
  margin-top: 10px;
`;

const OrderSummaryItem = styled.div`
  margin: 20px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === 'total' && '500'};
  font-size: ${(props) => props.type === 'total' && '24px'};
`;

const OrderSummaryItemText = styled.span``;

const OrderSummaryItemPrice = styled.span``;

const TrackingOrder = () => {
  const location = useLocation();
  const orderCode = location.pathname.split('/')[2];

  const [order, setOrder] = useState(null);

  useEffect(() => {
    orderApis.getOrderDetail(orderCode).then((result) => {
      setOrder(result.data);
    });
  }, [orderCode]);

  return (
    <Container>
      <Navbar />

      {order && (
        <Wrapper>
          <Title>TRACKING YOUR ORDER</Title>
          <TrackingOrderContainer>
            <OrderSummaryInfo>
              <OrderCode>{order.orderCode}</OrderCode>
              <OrderInfo>
                Order at: {dayjs(order.createdAt).format('MMMM D, YYYY')} |{' '}
                {order.bills
                  .map((item) => item.quantity)
                  .reduce(
                    (previousVal, currentVal) => previousVal + currentVal,
                    0
                  )}{' '}
                items | {numberWithCommas(order.amount)}₫
              </OrderInfo>
            </OrderSummaryInfo>

            <OrderTrackingStatus>
              <TrackingStep>
                <StepNumber isActive={order.status === 'PROCESSING'}>
                  1
                </StepNumber>
                <StepTitle isActive={order.status === 'PROCESSING'}>
                  Order processing
                </StepTitle>
              </TrackingStep>

              <Hr />

              <TrackingStep>
                <StepNumber isActive={order.status === 'PREPARING_SHIPMENT'}>
                  2
                </StepNumber>
                <StepTitle isActive={order.status === 'PREPARING_SHIPMENT'}>
                  Preparing shipment
                </StepTitle>
              </TrackingStep>

              <Hr />

              <TrackingStep>
                <StepNumber isActive={order.status === 'DELIVERED'}>
                  3
                </StepNumber>
                <StepTitle isActive={order.status === 'DELIVERED'}>
                  Delivered
                </StepTitle>
              </TrackingStep>
            </OrderTrackingStatus>

            <OrderBills>
              <h3>BILLS DETAILS</h3>
              <ListItem>
                {order.bills.map((item) => {
                  return (
                    <Item key={item.id}>
                      <Link to={`/product/${item.product.code}`}>
                        <ImageProduct src={item.product.image01} />
                      </Link>
                      <ItemDetail>
                        <ProductName>
                          <b>Title:</b> {item.product.productName} (
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
            </OrderBills>

            <OrderDetails>
              <h3>ORDER DETAILS</h3>
              <OrderDetailsContainer>
                <DeliveryAndPaymentInfo>
                  <DeliveryAndPaymentInfoPath>
                    <h4>Delivery address:</h4>
                    <InfoSpan>{order.receiver}</InfoSpan>
                    <InfoSpan>
                      {order.address}, {order.ward}, {order.district},{' '}
                      {order.province}, VietNam
                    </InfoSpan>
                  </DeliveryAndPaymentInfoPath>

                  <DeliveryAndPaymentInfoPath>
                    <h4>Phone number:</h4>
                    <InfoSpan>{order.phoneNumber}</InfoSpan>
                  </DeliveryAndPaymentInfoPath>

                  <DeliveryAndPaymentInfoPath>
                    <h4>Payment information:</h4>
                    <InfoSpan>Payment method: Visa Card</InfoSpan>
                  </DeliveryAndPaymentInfoPath>

                  <DeliveryAndPaymentInfoPath>
                    <h4>Delivery details:</h4>
                    <InfoSpan>Carrier name: GHN (Standard)</InfoSpan>
                  </DeliveryAndPaymentInfoPath>
                </DeliveryAndPaymentInfo>

                <OrderDetailsSummary>
                  <h4>Order summary:</h4>
                  <OrderSummaryItem>
                    <OrderSummaryItemText>
                      {order.bills
                        .map((item) => item.quantity)
                        .reduce(
                          (previousVal, currentVal) => previousVal + currentVal,
                          0
                        )}
                      {'  '}
                      ITEMS
                    </OrderSummaryItemText>
                    <OrderSummaryItemPrice>
                      {numberWithCommas(order.amount)}₫
                    </OrderSummaryItemPrice>
                  </OrderSummaryItem>
                  <OrderSummaryItem>
                    <OrderSummaryItemText>DELIVERY</OrderSummaryItemText>
                    <OrderSummaryItemPrice>Free</OrderSummaryItemPrice>
                  </OrderSummaryItem>
                  <OrderSummaryItem type="total">
                    <OrderSummaryItemText>TOTAL</OrderSummaryItemText>
                    <OrderSummaryItemPrice>
                      {numberWithCommas(order.amount)}₫
                    </OrderSummaryItemPrice>
                  </OrderSummaryItem>
                </OrderDetailsSummary>
              </OrderDetailsContainer>
            </OrderDetails>
          </TrackingOrderContainer>
        </Wrapper>
      )}

      <Newsletter />
      <Footer />
    </Container>
  );
};

export default TrackingOrder;
