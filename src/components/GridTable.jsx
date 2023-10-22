import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Text, Box } from '@blockstack/ui';
import styled from 'styled-components';

const StyledGrid = styled(Grid)`
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  border-radius: 14px;
  border: 1px solid #6B41E8; // Changed color to match button
  overflow: hidden;
`;

const StyledHeaderBox = styled(Box)`
  background-color: #6B41E8; // Changed color to match button
  padding: 12px;
  font-weight: 700;
  color: white; // Added for better readability on darker background
  font-size: 16px;
  font-family: 'Rajdhani';
  text-align: left;
`;

const StyledRowBox = styled(Box)`
  padding: 16px;
  background-color: ${(props) => (props.even ? 'white' : '#FAFAFB')};
  border-bottom-width: ${(props) => (props.isLast ? '0' : '0.5px')};
  border-bottom-color: #E0E0E2;
  transition: background-color 0.3s ease, transform 0.2s ease;
  &:hover {
    background-color: #F1F1F3;
    transform: scale(1.01);
  }
  display: flex;
  align-items: center;
`;

export const GridTable = ({ data }) => {
    const columns = ['contractName', 'contractDescription', 'contractAddress'];

    const formatColumn = (column) => {
        return column.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
    }

    return (
        <StyledGrid>
            {columns.map((col, index) => (
                <StyledHeaderBox key={index}>
                    <Text fontSize="sm" color="white">  {/* Changed color to white for better readability */}
                        {formatColumn(col)}
                    </Text>
                </StyledHeaderBox>
            ))}
            {data.map((row, rowIndex) => (
                columns.map((col, colIndex) => (
                    <StyledRowBox
                        key={`${rowIndex}-${colIndex}`}
                        even={rowIndex % 2 === 0}
                        isLast={rowIndex === data.length - 1}
                    >
                        <Text fontSize="sm" fontWeight={colIndex === 0 ? '600' : '500'} fontFamily="Rajdhani">
                            {row[col]}
                        </Text>
                    </StyledRowBox>
                ))
            ))}
        </StyledGrid>
    );
};

GridTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
