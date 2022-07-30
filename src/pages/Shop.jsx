import { useState, useEffect } from 'react';
import styled from 'styled-components';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import ProductList from '../components/ProductList';

import categoryApis from '../api/category.api';
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const initial = location.search
    .slice(1)
    .split('&')
    .reduce((pre, curr) => {
      const [key, value] = curr.split('=');
      if (['keyword', 'category', 'gender', 'sort'].includes(key))
        return { ...pre, [key]: value };
      else return pre;
    }, {});

  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    keyword: initial.keyword,
    category: initial.category,
    gender: initial.gender,
  });
  const [sort, setSort] = useState(initial.sort);

  useEffect(() => {
    categoryApis.getAllCategory().then((result) => {
      setCategories(result.data);
    });
  }, []);

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  const handleSort = (e) => {
    const value = e.target.value;
    setSort(value);
  };

  return (
    <Container>
      <Navbar />
      <Title>
        {filters.keyword ? `Result for: ${filters.keyword}` : 'Shop'}
      </Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter products:</FilterText>
          <FilterSelect
            name="category"
            onChange={handleFilters}
            value={filters.category}
          >
            <FilterSelectOption disabled selected>
              Categories
            </FilterSelectOption>
            {categories.map((cat) => {
              return (
                <FilterSelectOption value={cat.id} key={cat.id}>
                  {cat.categoryName}
                </FilterSelectOption>
              );
            })}
          </FilterSelect>

          <FilterSelect
            name="gender"
            onChange={handleFilters}
            value={filters.gender}
          >
            <FilterSelectOption disabled selected>
              Genders
            </FilterSelectOption>
            <FilterSelectOption value="ALL">ALL</FilterSelectOption>
            <FilterSelectOption value="MALE">MEN</FilterSelectOption>
            <FilterSelectOption value="FEMALE">WOMEN</FilterSelectOption>
            <FilterSelectOption value="KID">KID</FilterSelectOption>
          </FilterSelect>
        </Filter>

        <Filter>
          <FilterText>Sort products:</FilterText>
          <FilterSelect name="sort" onChange={handleSort} value={sort}>
            <FilterSelectOption disabled selected>
              Sort
            </FilterSelectOption>
            <FilterSelectOption value="NEWEST">Newest</FilterSelectOption>
            <FilterSelectOption value="PRICE_ASC">
              Price (ASC)
            </FilterSelectOption>
            <FilterSelectOption value="PRICE_DESC">
              Price (DESC)
            </FilterSelectOption>
          </FilterSelect>
        </Filter>
      </FilterContainer>
      <ProductList filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Shop;
