import React from 'react';
import { Box, Text, Image, Flex } from '@chakra-ui/react'
import PageTitleBg from '../assets/images/title-bg.jpg'
import SuiNFTImg from '../assets/images/nft.png'

const SuiResult = ({ title, info }) => {
    return (
        <Box
            bgImage={PageTitleBg}
            w="100%"
            bgRepeat="repeat-y"
            bgSize="100%"
            h={{ base: '885px' }}
            position="relative"
        >
            <Flex
                w="70%"
                justify="space-around"
                align="center"
                h="100%"
                m="0 auto"
            >
                <Box>
                    Right...
                    <Image src={SuiNFTImg} />
                </Box>
                <Box>
                    <Text fontSize={{ base: '60px' }} fontWeight={600} w="100%" color="#fff">Grandma</Text>
                    <Text fontSize={{ base: '20px' }} fontWeight={600} color="#fff">you are alive!!</Text>
                </Box>
            </Flex>
        </Box >
    );
}

export default SuiResult;