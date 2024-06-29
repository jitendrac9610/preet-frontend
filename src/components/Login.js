import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    background-color: ${(props) => props.theme.bodyBackgroundColor};
    color: ${(props) => props.theme.textColor};
  }
`;

const lightTheme = {
  bodyBackgroundColor: '#f0f2f5',
  formBackgroundColor: '#ffffff',
  textColor: '#333333',
  buttonBackgroundColor: '#007bff',
  buttonHoverColor: '#0056b3',
  inputBorderColor: '#cccccc',
};

const darkTheme = {
  bodyBackgroundColor: '#121212',
  formBackgroundColor: '#1e1e1e',
  textColor: '#ffffff',
  buttonBackgroundColor: '#bb86fc',
  buttonHoverColor: '#3700b3',
  inputBorderColor: '#444444',
};

const ToggleContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
  font-size: 1.5rem;
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginForm = styled.form`
  background: ${(props) => props.theme.formBackgroundColor};
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: ${(props) => props.theme.textColor};
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.textColor};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${(props) => props.theme.inputBorderColor};
  border-radius: 5px;
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  color: ${(props) => props.theme.textColor};
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: ${(props) => props.theme.buttonBackgroundColor};
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.buttonHoverColor};
  }
`;

const Error = styled.p`
  color: red;
  margin-top: 1rem;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://preet-backend-jf6icdzrj-jitendra-choudharys-projects.vercel.app/api/login', { email, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard'); // Redirect to the dashboard or any other page
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <ToggleContainer>
        <ToggleButton onClick={toggleTheme}>
          {theme === 'light' ? <BsFillMoonStarsFill /> : <BsFillSunFill />}
        </ToggleButton>
      </ToggleContainer>
      <LoginContainer>
        <LoginForm onSubmit={handleLogin}>
          <Title>Login</Title>
          <InputGroup>
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>
          {error && <Error>{error}</Error>}
          <Button type="submit">Login</Button>
        </LoginForm>
      </LoginContainer>
    </ThemeProvider>
  );
};

export default Login;
