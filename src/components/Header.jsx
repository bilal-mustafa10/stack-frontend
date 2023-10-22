import React from 'react';
import {Flex, Box, Text, Button} from '@blockstack/ui';
import {authenticate, getPerson, getUserData, userSession} from '../auth';
import { Link } from 'react-router-dom';
import { Logo } from './icons/logo';

import { useHistory } from 'react-router-dom';

const Auth = () => {
    const history = useHistory();  // Get the history object

    if (!userSession.isUserSignedIn()) {
        return null;
    }

    const Avatar = () => {
        const person = getPerson();

        if (person.avatarUrl()) {
            return (
                <Box
                    borderRadius="50%"
                    width="24px"
                    height="24px"
                    display="inline-block"
                    overflow="hidden"
                    mr={2}
                    style={{ position: 'relative', top: '6px' }}
                >
                    <Box as="img" src={person.avatarUrl()} maxWidth="100%" minHeight="24px" minWidth="24px" />
                </Box>
            );
        }
        return null;
    };

    return (
        <Box>
            <Avatar />
            <Text fontWeight="500">{getUserData().username}</Text>
            <Button style={{backgroundColor: '#6B41E8', borderRadius: 20}} onClick={() => {
                userSession.signUserOut();
                history.push('/');  // Redirect to home page using React Router's useHistory
            }}>
                Sign out
            </Button>
        </Box>
    );
};


export const Header = () => {
    return (
        <Flex width="100%" justifyContent="space-between" px={4} py={3}>
            <Box display="flex" alignItems={"center"} justifyContent="center" cursor="pointer">
                <Link to="/">
                    <Logo style={{ position: 'relative'}} />
                    <Text ml={2} display="inline-block" fontWeight="700" fontSize={24} fontFamily={"Rajdhani"} alignSelf={"center"}>
                        BlockCraft
                    </Text>
                </Link>
            </Box>
            <Auth />
        </Flex>
    );
};
