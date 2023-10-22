import React, { useState, useEffect } from 'react';
import { Flex, Box, Text, Button } from '@blockstack/ui';
import { userSession } from '../auth';
import { fetchContracts } from '../storage';
import exportFromJSON from 'export-from-json';
import {GridTable} from './GridTable';
import {EmptyGridTable} from './EmptyGridTable';
import styled from 'styled-components';
import { FaFileCsv, FaPlus } from 'react-icons/fa';
import {useHistory} from "react-router-dom";

// Constants
const HEADER_FONT_FAMILY = 'Rajdhani';
const HEADER_FONT_WEIGHT = '600';

// Styled components
const Container = styled(Flex)`
  max-width: 1400px;
  width: 100%;
  margin: 75px auto 75px auto;
  flex-wrap: wrap;
`;

const Header = styled(Text)`
  font-size: 48px;
  font-family: ${HEADER_FONT_FAMILY};
  font-weight: ${HEADER_FONT_WEIGHT};
  margin-bottom: 20px;
`;

const ButtonContainer = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

const StyledButton = styled(Button)`
  margin-left: 10px;
  padding: 8px 16px;
  border-radius: 20px;
`;

const SmartContractList = () => {
  const history = useHistory();
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPublic, setIsPublic] = useState(false);
  const [username, setUsername] = useState('');
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const userData = userSession.loadUserData();
    console.log('User Data:', userData);
  }, []);

  useEffect(() => {
    const initializeData = async () => {
      const usernameFromPath = document.location.pathname.split('/')[2];
      if (usernameFromPath) setUsername(usernameFromPath);

      const response = await fetchContracts(userSession, username);
      setContracts(response?.contracts ?? []);
      setIsPublic(Boolean(response?.public));
      setLoading(false);
      setNotFound(response?.contracts === null);
    };

    initializeData();
  }, [username]);

  const exportData = () => exportFromJSON({ data: contracts, fileName: 'smart-contracts', exportType: 'csv' });

  const getHeader = () => {
    if (notFound) return '404. No smart contracts found here.';
    return isPublic ? 'Smart contracts' : 'Smart contracts are private';
  };

  return (
      <Container>
        <Box mb={4} width="100%">
          <Header>
            {getHeader()}
          </Header>
        </Box>
        <ButtonContainer>
          <StyledButton style={{ borderColor: '#6B41E8', backgroundColor: 'white', color: '#6B41E8', borderWidth: 2 }} onClick={exportData}>
            <FaFileCsv style={{ marginRight: 8 }} /> Export as CSV
          </StyledButton>
          <StyledButton style={{ backgroundColor: '#6B41E8' }} onClick={() => {history.push('/new-contract');}}>
            <FaPlus style={{ marginRight: 8 }} /> New Contract
          </StyledButton>
        </ButtonContainer>
        {loading ? (
            <Text>Loading...</Text>
        ) : contracts.length === 0 ? (
            <EmptyGridTable />
        ) : (
            <GridTable data={contracts} />
        )}
      </Container>
  );
};

export default SmartContractList;
