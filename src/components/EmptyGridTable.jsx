import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Text, Box, Button, Flex } from '@blockstack/ui';
import styled from 'styled-components';

// Styled components
const StyledGrid = styled(Grid)`
  width: 100%;
  height: 400px;
  border-radius: 12px;
  border: 1px solid #E0E0E2;
  overflow: hidden;
  align-items: center;
  justify-items: center;
  padding: 6px;
  background-color: #FAFAFB;
`;

const StyledFlex = styled(Flex)`
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 20px;
  font-family: Rajdhani;
  border-radius: 10px;
`;

const StyledButton = styled(Button)`
  background-color: #6B41E8;
  border-radius: 25px;
  padding: 12px 30px;
  font-weight: bold;
  font-size: 18px;
`;

// Main Component
export const EmptyGridTable = () => {
    const navigateToSmartContractCreation = () => {
        // Add logic to navigate to smart contract creation page
    };

    return (
        <StyledGrid>
            <StyledFlex>
                <Text as="span" fontSize="4xl" mb={2}>
                    📜
                </Text>
                <Text color="#777" mb={2} fontSize="xl" fontWeight="bold">
                    No smart contracts yet!
                </Text>
                <Text mb={4} fontSize="lg">
                    Ready to create your first smart contract?
                </Text>
                <StyledButton onClick={navigateToSmartContractCreation}>
                    Create Smart Contract
                </StyledButton>
            </StyledFlex>
        </StyledGrid>
    );
};

// PropTypes and DefaultProps (Optional but Recommended)
EmptyGridTable.propTypes = {
    // Define prop types if any
};

EmptyGridTable.defaultProps = {
    // Define default props if any
};
