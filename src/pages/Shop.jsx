import { useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import ProductList from "../components/ProductList";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.span`
  font-size: 15px;
  font-weight: 600;
  margin-right: 20px;
`;

const FilterSelect = styled.select`
  padding: 10px;
  margin-right: 20px;
`;

const FilterSelectOption = styled.option``;

const Shop = () => {
  const [filters, setFilters] = useState({});

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <Container>
      <Navbar />
      <Title>Shoes</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter products:</FilterText>
          <FilterSelect name="gender" onChange={handleFilters}>
            <FilterSelectOption disabled selected>
              Genders
            </FilterSelectOption>
            <FilterSelectOption value="MALE">MEN</FilterSelectOption>
            <FilterSelectOption value="FEMALE">WOMEN</FilterSelectOption>
            <FilterSelectOption value="KID">KID</FilterSelectOption>
          </FilterSelect>
          <FilterSelect name="category" onChange={handleFilters}>
            <FilterSelectOption disabled selected>
              Categories
            </FilterSelectOption>
            <FilterSelectOption>option1</FilterSelectOption>
            <FilterSelectOption>option2</FilterSelectOption>
            <FilterSelectOption>option3</FilterSelectOption>
          </FilterSelect>
        </Filter>

        <Filter>
          <FilterText>Sort products:</FilterText>
          <FilterSelect>
            <FilterSelectOption disabled selected>
              Sort
            </FilterSelectOption>
            <FilterSelectOption>option1</FilterSelectOption>
            <FilterSelectOption>option2</FilterSelectOption>
            <FilterSelectOption>option3</FilterSelectOption>
          </FilterSelect>
        </Filter>
      </FilterContainer>
      <ProductList />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Shop;
