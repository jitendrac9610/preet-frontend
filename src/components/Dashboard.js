// src/components/Dashboard.js
import React from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const WelcomeMessage = styled.h1`
  color: #333;
`;

const Dashboard = () => {
  return (
    <DashboardContainer>
      <WelcomeMessage>Welcome to your Dashboard!</WelcomeMessage>
    </DashboardContainer>
  );
};

export default Dashboard;
