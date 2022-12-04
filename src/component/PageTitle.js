import React from 'react';
import { Box, Text } from '@chakra-ui/react'
import PageTitleBg from '../assets/images/title-bg.jpg'

const PageTitle = ({ title, info }) => {
    return (
        <Box
            bgImage={PageTitleBg}
            w="100%"
            bgRepeat="repeat-y"
            bgSize="100%"
            h={{ base: '741px' }}
            position="relative"
        >
            <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
            >
                <Text fontSize={{ base: '60px' }} fontWeight={600} w="100%" color="#fff">{title}</Text>
                <Text fontSize={{ base: '20px' }} fontWeight={600} color="#fff">{info}</Text>
            </Box>
        </Box >
    );
}

export default PageTitle;