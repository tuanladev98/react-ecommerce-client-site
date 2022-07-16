import styled from 'styled-components';
import {
  FavoriteBorderOutlined,
  ShoppingCartOutlined,
} from '@material-ui/icons';

import numberWithCommas from '../utils/numberWithCommas';
import formatGenderUtil from '../utils/format_gender';

const ActionContainer = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.3s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Container = styled.div`
  /* flex: 1; */
  margin: 5px;
  max-width: 293px;
  height: 380px;
  /* display: flex;
  align-items: flex-start;
  justify-content: center; */
  background-color: #f5fbfd;
  cursor: pointer;
  position: relative;
  &:hover ${ActionContainer} {
    opacity: 1;
    border: 1px solid black;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  /* z-index: 2; */
`;

const Image = styled.img`
  width: 100%;
`;

const InfoContainer = styled.div`
  width: 100%;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
`;

const Price = styled.div`
  margin: 5px 10px;
  font-weight: 300;
  font-style: italic;
`;

const Title = styled.div`
  margin-left: 10px;
  font-weight: 700;
`;

const CategoryTitle = styled.div`
  margin-left: 10px;
  font-weight: 50;
`;

const ProductCard = ({ productData }) => {
  return (
    <Container>
      <ImageContainer>
        <Image src={productData.image01} />
      </ImageContainer>
      <InfoContainer>
        <Price>{numberWithCommas(productData.price)}₫</Price>
        <Title>{productData.productName}</Title>
        <CategoryTitle>
          {formatGenderUtil(productData.gender)}{' '}
          {productData.category.categoryName}
        </CategoryTitle>
      </InfoContainer>
      <ActionContainer>
        <Icon>
          <ShoppingCartOutlined
            onClick={() => {
              window.location.href = `/product/${productData.code}`;
            }}
          />
        </Icon>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
      </ActionContainer>
    </Container>
  );
};

export default ProductCard;
