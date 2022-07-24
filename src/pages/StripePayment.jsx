import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';

import orderApis from '../api/order.api';
import numberWithCommas from '../utils/numberWithCommas';
import completeIcon from '../assets/complete-icon.png';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px 300px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const PaymentContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const PaymentInfoContainer = styled.div`
  flex: 3;
  margin: 40px;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 10px;
  height: fit-content;
`;

const PaymentInfoTitle = styled.div`
  font-weight: bold;
  text-align: center;
`;

const PaymentOrderComplete = styled.div`
  width: 100%;
  height: fit-content;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PaymentForm = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardInfo = styled.div`
  width: 60%;
  margin: 20px 0px;
  padding: 10px;
  border: 1px dashed lightgray;
`;

const SubmitPayment = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SubmitButton = styled.button`
  width: 300px;
  padding: 10px;
  font-weight: 700;
  border: none;
  margin-bottom: 10px;
  background-color: ${(props) => (props.disabled ? 'lightgray' : 'black')};
  color: ${(props) => (props.disabled ? 'black' : 'white')};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
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

const DeliveryAddress = styled.div`
  width: 100%;
  height: fit-content;
  margin: 40px 10px;
  border: 1px dashed lightgray;
  border-radius: 5px;
  padding: 10px;
`;

const DeliveryAddressTitle = styled.div`
  font-weight: bold;
  text-align: center;
`;

const DeliveryAddressDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ReceiverName = styled.span`
  margin: 5px 0px;
`;
const Street = styled.span`
  margin: 5px 0px;
`;
const Region = styled.span`
  margin: 5px 0px;
`;
const PhoneNumber = styled.span`
  margin: 5px 0px;
`;

const AcceptedPaymentMethod = styled.div`
  width: 100%;
  height: fit-content;
  margin: 40px 10px;
  padding: 10px;
  border-top: 1px solid lightgray;
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

const StripePayment = () => {
  const location = useLocation();
  const orderCode = location.pathname.split('/')[2];

  const elements = useElements();
  const stripe = useStripe();

  const [order, setOrder] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [isDisablePayBtn, setIsDisablePayBtn] = useState(false);

  useEffect(() => {
    orderApis.getOrderDetail(orderCode).then((result) => {
      setOrder(result.data);
      setIsComplete(!!result.data.stripeSucceededPaymentIntentId);
    });
  }, [orderCode]);

  const handleSubmitPayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsDisablePayBtn(true);
    const toastHandleId = toast.loading('Progress payment...', {
      position: 'bottom-center',
    });
    // create payment intent on the server
    const { data } = await orderApis.createStripePaymentIntent(order.amount);
    const { error: errorBackend, clientSecret } = data;

    if (errorBackend) {
      toast.update(toastHandleId, {
        render: errorBackend.message,
        type: 'error',
        isLoading: false,
      });
      return;
    }

    // confirm payment on the client:
    const { error: errorStripe, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

    if (errorStripe) {
      toast.update(toastHandleId, {
        render: errorStripe.message,
        type: 'error',
        isLoading: false,
      });
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      toast.update(toastHandleId, {
        render: 'Payment successful!',
        type: 'success',
        isLoading: false,
        autoClose: true,
      });
      await orderApis.updateOrderPayment(orderCode, paymentIntent.id);
      setIsComplete(true);
    } else {
      toast.info(paymentIntent.status);
    }

    setIsDisablePayBtn(false);
  };

  return (
    <Container>
      <Navbar />

      {order && (
        <Wrapper>
          <Title>COMPLETE YOUR ORDER</Title>
          <PaymentContainer>
            <PaymentInfoContainer>
              <PaymentInfoTitle>PAYMENT INFORMATION</PaymentInfoTitle>

              {isComplete ? (
                <PaymentOrderComplete>
                  <img
                    style={{ width: '130px', height: '130px', margin: '10px' }}
                    src={completeIcon}
                    alt=""
                  />
                  <span
                    style={{
                      margin: '5px',
                      fontSize: '20px',
                      fontWeight: '300',
                    }}
                  >
                    Your order has been paid!
                  </span>
                  <button
                    style={{
                      width: '200px',
                      margin: '20px',
                      padding: '10px',
                      border: 'none',
                      backgroundColor: 'black',
                      color: 'white',
                      fontWeight: '500',
                      cursor: 'pointer',
                    }}
                  >
                    TRACKING ORDER STATUS
                  </button>
                </PaymentOrderComplete>
              ) : (
                <PaymentForm onSubmit={handleSubmitPayment}>
                  <div style={{ fontSize: '17px', fontStyle: 'italic' }}>
                    <span>
                      *You may be redirected to your bank's secure 3D process to
                      authenticate your information.
                    </span>
                  </div>
                  <CardInfo>
                    <CardElement
                      options={{
                        hidePostalCode: true,
                        style: { base: { fontSize: '18px' } },
                      }}
                    />
                  </CardInfo>

                  <SubmitPayment>
                    <SubmitButton
                      type="submit"
                      disabled={!stripe || !elements || isDisablePayBtn}
                    >
                      PROGRESS PAYMENT
                    </SubmitButton>
                  </SubmitPayment>
                </PaymentForm>
              )}
            </PaymentInfoContainer>

            <OrderSummaryContainer>
              <OrderSummary>
                <OrderSummaryTitle>ORDER SUMMARY</OrderSummaryTitle>
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
              </OrderSummary>

              <OrderDetail>
                <OrderDetailTitle>ORDER DETAIL</OrderDetailTitle>
                <ListItem>
                  {order.bills.map((item) => {
                    return (
                      <Item key={item.id}>
                        <ImageProduct src={item.product.image01} />
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
              </OrderDetail>

              <DeliveryAddress>
                <DeliveryAddressTitle>DELIVERY ADDRESS</DeliveryAddressTitle>
                <DeliveryAddressDetail>
                  <ReceiverName>
                    <b>Receiver:</b> {order.receiver}
                  </ReceiverName>
                  <Street>
                    <b>Address/Street:</b> {order.address}
                  </Street>
                  <Region>
                    {order.ward}, {order.district}, {order.province},{' '}
                    {order.postcode}, Việt Nam
                  </Region>
                  <PhoneNumber>
                    <b>Phone number:</b> {order.phoneNumber}
                  </PhoneNumber>
                </DeliveryAddressDetail>
              </DeliveryAddress>

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
          </PaymentContainer>
        </Wrapper>
      )}

      <Newsletter />
      <Footer />
    </Container>
  );
};

export default StripePayment;
