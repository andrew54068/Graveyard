import React from 'react'
import { Box, Flex, Button, Text, useToast } from '@chakra-ui/react'
import BridgeBg from '../assets/images/bridge-bg.jpg'


const Bridge = () => {
    const toast = useToast()

    const getApi = async () => {
        const obj = {
            "transactionHash": "0xe48e91f5e7cf8f0e85699bf464de7fce58b6b92929818d57d0be12925801e9e3",
            "suiAddress": "0x63917af8c547d3cd983ef9954d87a0804b7d1a2c"
        }
        fetch('http://urn.outplays.xyz:8080/notif', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }).then(response => response.json())
            .then(json => {
                if (json.message === 'ok') {
                    toast({
                        title: "Success",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                    })
                }
            });
    }

    return (
        <Box
            bgImage={BridgeBg}
            w="100%"
            bgRepeat="no-repeat"
            bgSize="100%"
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
                    Reincarnation
                </Text>
                <Button
                    onClick={getApi}
                >
                    Reborn
                </Button>
            </Box>
        </Box >
    )
}

export default Bridge