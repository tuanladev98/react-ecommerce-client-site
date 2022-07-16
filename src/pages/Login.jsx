import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import authApis from '../api/auth.api';
import { loginFailure, loginStart, loginSuccess } from '../redux/user_slice';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url('https://images.pexels.com/photos/847371/pexels-photo-847371.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;

  &:disabled {
    background-color: lightgray;
    color: white;
    cursor: not-allowed;
  }
`;

const Error = styled.span`
  color: red;
`;

const Link = styled.a`
  margin: 10px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loginErrorMessage, setLoginErrorMessage] = useState(
    'Something went wrong...'
  );
  const dispatch = useDispatch();
  const { isFetching, isError } = useSelector((state) => state.user);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) toast('Please input email!');
    else if (!password) toast('Please input password!');
    else {
      // login
      const login = async (dispatch, email, password) => {
        dispatch(loginStart());
        try {
          const loginResult = await authApis.login(email, password);
          dispatch(loginSuccess(loginResult.data));
          window.location.href = '/';
        } catch (error) {
          const { statusCode, message } = error.response.data;
          if (statusCode < 500) setLoginErrorMessage(message);
          dispatch(loginFailure());
        }
      };
      login(dispatch, email, password);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <ButtonContainer>
            <Button onClick={handleLogin} disabled={isFetching}>
              LOGIN
            </Button>
          </ButtonContainer>
          {isError && <Error>{loginErrorMessage}</Error>}
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link>CREATE A NEW ACCOUNT?</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
