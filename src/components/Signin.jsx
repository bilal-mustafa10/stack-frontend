import React from 'react';
import { Box, Text, Button } from '@blockstack/ui';
import { authenticate } from '../auth';

export const Signin = () => {
  return (
    <Box width="100%" textAlign="center">
      <Box maxWidth="800px" mx="auto" mt={[6, '100px']}>
        <Text fontWeight="700" fontSize={['36px', '50px']} lineHeight={1} display="block" fontFamily={"Rajdhani"} >
          Seamless Smart Contracts on Bitcoin, Tailored Just for You
        </Text>
        <Box mt={[5, '60px']}>
          <Box width={"100%"} display={"flex"} justifyContent={"center"} mb={20}>
            <img src={require("../assets/images/bitcoin-image.png")} style={{width: 360, height: 360}} alt={"bitcoin image"}/>
          </Box>
          <Button style={{backgroundColor: '#6B41E8', borderRadius: 20, fontWeight: 700, fontFamily: 'Rajdhani'}} fontSize={32} onClick={() => authenticate()} size={"lg"}>Get Started</Button>
        </Box>
      </Box>
    </Box>
  );
};
