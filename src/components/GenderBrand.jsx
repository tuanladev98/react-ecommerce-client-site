import styled from "styled-components";

const genders = [
  {
    display: "MEN",
    value: "MALE",
    img: "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/viVN/Images/running-ss22-4dfwd-x-parley-launch-hp-teaser-carousel-card-dual-2d-d_tcm337-820245.jpg",
  },
  {
    display: "WOMAN",
    value: "FEMALE",
    img: "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/viVN/Images/adicolor-FW21-Oct-GLP-W-Teaser-Carousel-1-D-M-T_tcm337-730012.jpg",
  },
  {
    display: "KIDS",
    value: "KID",
    img: "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/viVN/Images/SS18_YA_Running_Ecomm_AFC_Collection-Mobile_M_2_640x640-new_tcm337-244167.jpg",
  },
];

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
`;

const GenderItem = styled.div`
  flex: 1;
  margin: 3px;
  height: 85vh;
  position: relative;
  background-color: black;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: #413c3c;
  margin-bottom: 20px;
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
`;

const GenderBrand = () => {
  return (
    <Container>
      {genders.map((gender, index) => (
        <GenderItem key={index}>
          <Image src={gender.img} />
          <Info>
            <Title>{gender.display}</Title>
            <Button>SHOW NOW</Button>
          </Info>
        </GenderItem>
      ))}
    </Container>
  );
};

export default GenderBrand;
