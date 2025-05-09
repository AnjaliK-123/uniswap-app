// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../contracts/ZuniswapV2Factory.sol";
import "../contracts/ZuniswapV2Router.sol";
import "../contracts/mocks/ERC20Mintable.sol";
import "./DeployHelpers.s.sol";

contract Deploy is ScaffoldETHDeploy {
    function run() external ScaffoldEthDeployerRunner {
        // Start broadcasting transactions
        // vm.startBroadcast();

        // Deploy the factory
        ZuniswapV2Factory factory = new ZuniswapV2Factory();
        console.log("Factory deployed to:", address(factory));

        // Deploy the router
        ZuniswapV2Router router = new ZuniswapV2Router(address(factory));
        console.log("Router deployed to:", address(router));

        // Deploy Token A
        ERC20Mintable tokenA = new ERC20Mintable("Token A", "TKA");
        console.log("Token A deployed to:", address(tokenA));

        // Deploy Token B
        ERC20Mintable tokenB = new ERC20Mintable("Token B", "TKB");
        console.log("Token B deployed to:", address(tokenB));

        // Mint tokens to the deployer
        uint256 tokensToMint = 100 * 10 ** 18;
        tokenA.mint(tokensToMint, deployer);
        console.log("Minted Token A to:", deployer);

        tokenB.mint(tokensToMint, deployer);
        console.log("Minted Token B to:", deployer);

        // Create a pair for Token A and Token B
        factory.createPair(address(tokenA), address(tokenB));
        console.log("Pair (Pool) created for Token A and Token B");

        // Stop broadcasting transactions
        // vm.stopBroadcast();
    }
}
