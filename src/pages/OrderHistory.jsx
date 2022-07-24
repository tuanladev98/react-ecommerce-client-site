import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as dayjs from 'dayjs';
import styled from 'styled-components';
import { MonetizationOnOutlined } from '@material-ui/icons';

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

const OrderHistoryContainer = styled.div`
  width: 70%;
  /* border: 1px dashed lightgray; */
  padding: 20px;
`;

const OrderHistoryItem = styled.div`
  width: 100%;
  border-bottom: 1px solid lightgray;
  padding: 10px 0px;
`;

const ItemSummaryInfo = styled.div`
  padding: 10px;
`;

const ItemOrderCode = styled.h2``;

const ItemInfo = styled.span`
  font-size: 16px;
`;

const ItemContent = styled.div`
  height: 100px;
  padding: 5px 0px;
  display: flex;
  justify-content: space-between;
  /* align-items: flex-end; */
`;

const ListProduct = styled.div`
  /* flex: 3; */
  display: flex;
  align-items: center;
  width: 500px;
  overflow-x: auto;
  overflow-y: hidden;
`;

const OrderProductImage = styled.img`
  width: 70px;
  height: 70px;
  margin: 0px 10px;
`;

const ItemAction = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const PaymentStatus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.isPaid ? 'green' : '#9b9b9b')};
`;

const ShowDetailOrderBtn = styled.button`
  width: max-content;
  height: 40px;
  border: none;
  background-color: black;
  color: white;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
`;

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    orderApis
      .getOrderHistory()
      .then((result) => {
        setOrders(result.data);
      })
      .catch((error) => {
        setOrders([]);
      });
  }, []);

  return (
    <Container>
      <Navbar />

      <Wrapper>
        <Title>YOUR ORDER HISTORY</Title>
        <OrderHistoryContainer>
          {orders.map((order) => {
            return (
              <OrderHistoryItem key={order.id}>
                <ItemSummaryInfo>
                  <ItemOrderCode>ORDER CODE: {order.orderCode}</ItemOrderCode>
                  <ItemInfo>
                    {dayjs(order.createdAt).format('MMMM D, YYYY')} |{' '}
                    {numberWithCommas(order.amount)}₫ |{' '}
                    {order.bills
                      .map((item) => item.quantity)
                      .reduce(
                        (previousVal, currentVal) => previousVal + currentVal,
                        0
                      )}{' '}
                    items
                  </ItemInfo>
                </ItemSummaryInfo>
                <ItemContent>
                  <ListProduct>
                    {order.bills.map((bill) => {
                      return (
                        <OrderProductImage src={bill.product.image01} alt="" />
                      );
                    })}
                  </ListProduct>
                  <ItemAction>
                    <PaymentStatus
                      isPaid={!!order.stripeSucceededPaymentIntentId}
                    >
                      <MonetizationOnOutlined />
                      <span style={{ marginLeft: '10px' }}>
                        {order.stripeSucceededPaymentIntentId
                          ? 'Paid'
                          : 'Unpaid'}
                      </span>
                    </PaymentStatus>
                    {order.stripeSucceededPaymentIntentId ? (
                      <Link to={'/tracking-order/' + order.orderCode}>
                        <ShowDetailOrderBtn>SHOW DETAIL</ShowDetailOrderBtn>
                      </Link>
                    ) : (
                      <Link to={'/payment/' + order.orderCode}>
                        <ShowDetailOrderBtn>PAYMENT</ShowDetailOrderBtn>
                      </Link>
                    )}
                  </ItemAction>
                </ItemContent>
              </OrderHistoryItem>
            );
          })}
        </OrderHistoryContainer>
      </Wrapper>

      <Newsletter />
      <Footer />
    </Container>
  );
};

export default OrderHistory;
