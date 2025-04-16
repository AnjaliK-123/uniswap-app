// src/pages/index.tsx
"use client";
import React from 'react';
import LiquidityManager from '../components/LiquidityManager';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import deployedContracts from '../contracts/deployedContracts'

const Home = () => {
    const { isConnected } = useAccount();
    const routerAddress = deployedContracts[11155111].ZuniswapV2Factory.address;
    const tokenAAddress = deployedContracts[11155111].ERC20Mintable.address;
    const tokenBAddress = deployedContracts[11155111].ERC20Mintable.address;
    

    if (!isConnected) {
        return (
            <div>
                <h1>Please connect your wallet first</h1>
                <ConnectButton />
            </div>
        );
    }

    return (
        <div>
            <h1>Uniswap Liquidity Manager</h1>
            <LiquidityManager 
                routerAddress={routerAddress}
                tokenAAddress={tokenAAddress} 
                tokenBAddress={tokenBAddress} 
            />
        </div>
    );
};

export default Home;