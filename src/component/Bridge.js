import React from 'react'
import { Box, Flex, Button, Image, Text } from '@chakra-ui/react'
import BridgeBg from '../assets/images/bridge-bg.jpg'


const Bridge = () => {
    return (
        <Box
            bgImage={BridgeBg}
            w="100%"
            bgRepeat="no-repeat"
            bgSize="cover"
            minH={{ base: '1085px' }}
            position="relative"
        >
            <Flex
                justify="flex-end"
                p="70px"
            >
                <Button
                    borderRadius={{ base: '100px' }}
                >
                    Connect Wallet
                </Button>
            </Flex>
            <Box
                position="absolute"
                top="22%"
                left="50%"
                transform="translate(-50%, -50%)"
            >
                <Text
                    fontSize={{ base: '60px' }}
                    fontWeight={600} w="100%"
                    color="#fff"
                >
                    Titltltltltlt
                </Text>
                <Button>
                    Button
                </Button>
            </Box>
        </Box >
    )
}

export default Bridge