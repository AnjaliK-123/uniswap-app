"use client";

import React, { useState, useEffect } from 'react';
import { useWalletClient, usePublicClient } from 'wagmi';
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { parseEther } from "viem";

interface LiquidityManagerProps {
    routerAddress: string;
    tokenAAddress: string;
    tokenBAddress: string;
}



const LiquidityManager: React.FC<LiquidityManagerProps> = ({ tokenAAddress, tokenBAddress, routerAddress }) => {
    const [tokenAAmount, setTokenAAmount] = useState('');
    const [tokenBAmount, setTokenBAmount] = useState('');
    const [minAmountA, setMinAmountA] = useState('');
    const [minAmountB, setMinAmountB] = useState('');
    const { data: walletClient } = useWalletClient();


    
    const { writeContractAsync: writeRouterContractAsync } = useScaffoldWriteContract({ contractName:"ZuniswapV2Router", });

    const { writeContractAsync: writeTokenContractAsync } = useScaffoldWriteContract({ contractName: "ERC20Mintable" });


    
    useEffect(() => {
        console.log('Received props:', {
            routerAddress,
            tokenAAddress,
            tokenBAddress
        });
    }, [routerAddress, tokenAAddress, tokenBAddress]);

    const validateAddresses = () => {
        if (!routerAddress || !tokenAAddress || !tokenBAddress) {
            console.error('Missing required addresses:', {
                routerAddress: routerAddress || 'undefined',
                tokenAAddress: tokenAAddress || 'undefined',
                tokenBAddress: tokenBAddress || 'undefined'
            });
            return false;
        }
        return true;
    };


    const handleAddLiquidity = async () => {
        if (!walletClient) {
            console.error('Wallet client is not connected');
            return;
        }

        if (!validateAddresses()) {
            return;
        }

        const amountADesired = parseEther(tokenAAmount);
        const amountBDesired = parseEther(tokenBAmount);
        const amountAMin = parseEther(minAmountA);
        const amountBMin = parseEther(minAmountB);

        console.log('Adding liquidity with the following details:');
        console.log('Token A Address:', tokenAAddress);
        console.log('Token B Address:', tokenBAddress);
        console.log('Amount A Desired:', amountADesired.toString());
        console.log('Amount B Desired:', amountBDesired.toString());
        console.log('Minimum Amount A:', amountAMin.toString());
        console.log('Minimum Amount B:', amountBMin.toString());
        console.log('Recipient Address:', walletClient.account.address);

        try {
            // // First, approve the router to spend the tokens
            const approveTokenA = await writeTokenContractAsync({
                functionName: "approve",
                args: [
                    routerAddress,
                    amountADesired
                ],
              //  address: tokenAAddress
            });

            const approveTokenB = await writeTokenContractAsync({
                functionName: "approve",
                args: [
                    routerAddress,
                    amountBDesired
                ],
               // address: tokenBAddress
            });

            // Then add liquidity
            const tx = await writeRouterContractAsync({
                functionName: "addLiquidity",
                args: [
                    tokenAAddress,
                    tokenBAddress,
                    amountADesired,
                    amountBDesired,
                    amountAMin,
                    amountBMin,
                    walletClient.account.address
                ]
            });
    
            if (tx) {
                console.log('Liquidity added successfully');
            } else {
                console.error('Transaction was not returned.');
            }
        } catch (error) {
            console.error('Error adding liquidity:', error);
        }
    };
    return (
        <div>
            <h2>Add Liquidity</h2>
            <input
                type="text"
                value={tokenAAmount}
                onChange={(e) => setTokenAAmount(e.target.value)}
                placeholder="Amount of Token A"
            />
            <input
                type="text"
                value={tokenBAmount}
                onChange={(e) => setTokenBAmount(e.target.value)}
                placeholder="Amount of Token B"
            />
            <input
                type="text"
                value={minAmountA}
                onChange={(e) => setMinAmountA(e.target.value)}
                placeholder="Minimum Amount of Token A"
            />
            <input
                type="text"
                value={minAmountB}
                onChange={(e) => setMinAmountB(e.target.value)}
                placeholder="Minimum Amount of Token B"
            />
            <button onClick={handleAddLiquidity}>Add Liquidity</button>
        </div>
    );
};

export default LiquidityManager;