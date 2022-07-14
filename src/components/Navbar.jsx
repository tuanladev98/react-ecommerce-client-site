import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  ExitToAppOutlined,
  Search,
  ShoppingCartOutlined,
} from '@material-ui/icons';
import { Badge } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import cartApis from '../api/cart.api';
import { logout } from '../redux/user_slice';
import { changeCartItems } from '../redux/cart_slice';

const Container = styled.div`
  height: 90px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;

  &:focus {
    outline: none;
  }
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

const AnnouncementContainer = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser)
      cartApis.getCart().then((result) => {
        dispatch(changeCartItems(result.data));
      });
  }, [currentUser, dispatch]);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>Search:</Language>
          <SearchContainer>
            <Input placeholder="Search ..." />
            <Search style={{ color: 'gray', fontSize: '16px' }} />
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
            <Logo>...</Logo>
          </Link>
        </Center>
        {!currentUser ? (
          <Right>
            <Link
              to="/register"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <MenuItem>REGISTER</MenuItem>
            </Link>
            <Link
              to="/login"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <MenuItem>LOGIN</MenuItem>
            </Link>
            <MenuItem
              onClick={() => {
                window.location.href = '/cart';
              }}
            >
              <ShoppingCartOutlined />
            </MenuItem>
          </Right>
        ) : (
          <Right>
            <MenuItem>
              <span>Welcome {currentUser.userInfo.name},</span>
            </MenuItem>
            <MenuItem
              onClick={() => {
                dispatch(logout());
                dispatch(changeCartItems([]));
                window.location.href = '/';
              }}
            >
              <ExitToAppOutlined />
            </MenuItem>
            <MenuItem
              onClick={() => {
                window.location.href = '/cart';
              }}
            >
              <Badge badgeContent={cartItems.length} color="error">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Right>
        )}
      </Wrapper>
      <AnnouncementContainer>
        tuan_la dep trai sieu cap vu tru
      </AnnouncementContainer>
    </Container>
  );
};

export default Navbar;
