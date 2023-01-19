import React, { useState } from 'react';
import { Box, Flex, Button, Image, useToast } from '@chakra-ui/react'
// import {
//     BloctoWalletName,
//     useWallet,
// } from '@manahippo/aptos-wallet-adapter';
import { useWallet } from '../hooks/useWallet';
import LobbyBg from '../assets/images/bg2.jpg';
import DoorImg from '../assets/images/door.png';
import TombstoneImg from '../assets/images/tombstone.png';
import ShovelImg from '../assets/images/shovel.png';
import UrnImg from '../assets/images/urn.png';
import PumpkinOneImg from '../assets/images/pumpkin-1.png';
import PumpkinTwoImg from '../assets/images/pumpkin-2.png';
import PumpkinThreeImg from '../assets/images/pumpkin-3.png';



const Lobby = () => {

    const { connect, disconnect, connected, signAndSubmitTransaction } = useWallet();
    const toast = useToast()
    const [isLoading, setLoading] = useState(false);


    const signAndSubmitTransactionFnc = async (payload) => {
        try {
            setLoading(true);
            console.log('payload ', payload);
            const { hash } = await signAndSubmitTransaction(payload);
            if (hash) {
                return hash
            }
        } catch (error) {
            toast({
                title: "Error",
                description: JSON.stringify(error),
                status: "error",
                duration: 3000,
                isClosable: true,
            })
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    const handleDig = async () => {
        if (isLoading) return null
        const dig = {
            arguments: [],
            function: '0x495947c96cf56b18480d03603be8c53bfdc74b17221431debe0f4472672da99d::graveyard::dig',
            type: 'entry_function_payload',
            type_arguments: [],
        };
        const hash = await signAndSubmitTransactionFnc(dig);
        if (hash) {
            toast({
                title: "Success",
                description: hash,
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        }
    }
    const handleClaimShovel = async () => {
        if (isLoading) return null
        const shovel = {
            arguments: [],
            function: '0x495947c96cf56b18480d03603be8c53bfdc74b17221431debe0f4472672da99d::shovel::mint',
            type: 'entry_function_payload',
            type_arguments: [],
        };
        const hash = await signAndSubmitTransactionFnc(shovel);
        if (hash) {
            toast({
                title: "Success",
                description: hash,
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        }
    }

    const handleMintUrn = async () => {
        if (isLoading) return null
        const urn = {
            arguments: [],
            function: '0x495947c96cf56b18480d03603be8c53bfdc74b17221431debe0f4472672da99d::urn::mint',
            type: 'entry_function_payload',
            type_arguments: [],
        };
        const hash = await signAndSubmitTransactionFnc(urn);
        if (hash) {
            toast({
                title: "Success",
                description: hash,
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        }
    }





    return (
        <Box
            bgImage={LobbyBg}
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
                    onClick={() => !connected ? connect() : disconnect()}
                    borderRadius={{ base: '100px' }}
                >
                    {!connected ? "Connect to Petra Wallet" : "Disconnect"}

                </Button>
            </Flex>
            {/* Bottom */}
            <Flex
                justify="space-between"
                align="flex-end"
                position="absolute"
                bottom="8%"
                left="2%"
                w="100%"
            >
                {/* Left */}
                <Flex
                    bgImage={DoorImg}
                    bgRepeat="no-repeat"
                    bgSize="100%"
                >
                    <Flex ml={{ base: '5%' }} position="relative">
                        <Image src={TombstoneImg} />
                        <Box
                            position="absolute"
                            left="24%"
                            top="65%"
                        >
                            <Button
                                disabled={!connected || isLoading}
                                onClick={handleDig}
                            >
                                {isLoading ? 'Loading…' : 'Click to dig'}
                            </Button>
                        </Box>
                    </Flex>
                    <Flex position="relative">
                        <Image src={ShovelImg} />
                        <Box
                            position="absolute"
                            left="5%"
                            bottom="-15%"
                        >

                            <Button
                                disabled={!connected || isLoading}
                                onClick={handleClaimShovel}
                            >
                                {isLoading ? 'Claiming…' : 'claim a shovel'}
                            </Button>
                        </Box>
                    </Flex>
                </Flex>
                {/* Right */}
                <Flex
                    position="absolute"
                    right="7%"
                    align="flex-end"
                    bottom="0"
                >
                    <Image w="128px" h="107px" src={PumpkinOneImg} />
                    <Box position="relative">
                        <Image w="240px" h="345px" src={UrnImg} />
                        <Button
                            disabled={!connected || isLoading}
                            onClick={handleMintUrn}
                            position="absolute"
                            bottom="-14%"
                            left="28%"
                        >
                            {isLoading ? 'Loading…' : 'Mint an urn'}
                        </Button>
                    </Box>
                    <Image
                        position="absolute"
                        right="0px"
                        top="45%"
                        w="89px"
                        h="91px"
                        src={PumpkinTwoImg}
                    />
                    <Image w="86px" h="80px" src={PumpkinThreeImg} />
                </Flex>
            </Flex>
        </Box >
    )
}

export default Lobby;