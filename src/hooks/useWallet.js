import React, { useState } from 'react';
import { AptosClient } from 'aptos';
import { useToast } from '@chakra-ui/react'

const isPetraInstalled = window.aptos;

export const useWallet = () => {
    const toast = useToast()
    const [connected, setConnected] = useState(false);
    const [address, setAddress] = useState(null);
    const [publicKey, setPublicKey] = useState(null);

    const getAptosWallet = () => {
        if ('aptos' in window) {
            return window.aptos;
        } else {
            window.open('https://petra.app/', `_blank`);
        }
    };

    const connect = async () => {
        if (!isPetraInstalled) {
            return toast({
                title: "Error",
                description: JSON.stringify('Please Install Petra Wallet'),
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
        try {
            const wallet = getAptosWallet();
            await wallet.connect();
            const account = await wallet.account();
            setConnected(true);
            setAddress(account.address);
            setPublicKey(account.publicKey);
        } catch (error) {
            toast({
                title: "Error",
                description: JSON.stringify(error),
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
    }

    const disconnect = async () => {
        try {
            await getAptosWallet().disconnect();
            setConnected(false);
            setAddress(null);
            setPublicKey(null);
        } catch (error) {
            console.log('error: ', error);
        }
    }

    const signAndSubmitTransaction = async (transaction) => {
        // const transaction = {
        //     arguments: [address, '717'],
        //     function: '0x1::coin::transfer',
        //     type: 'entry_function_payload',
        //     type_arguments: ['0x1::aptos_coin::AptosCoin'],
        //   };
        try {
            const pendingTransaction = await window?.aptos.signAndSubmitTransaction(transaction);

            // In most cases a dApp will want to wait for the transaction, in these cases you can use the typescript sdk
            const client = new AptosClient('https://testnet.aptoslabs.com');
            const txn = await client.waitForTransactionWithResult(
                pendingTransaction.hash,
            );
            return txn
        } catch (error) {
            console.log('error: ', error);
            // see "Errors"
        }
    }



    return {
        address,
        publicKey,
        connect,
        disconnect,
        connected,
        signAndSubmitTransaction
    }
}