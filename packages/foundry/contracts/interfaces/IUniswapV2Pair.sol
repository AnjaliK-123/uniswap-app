pragma solidity ^0.8.10;

interface IUniswapV2Pair{

    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Transfer(address indexed from, address indexed to, uint256 value);
    
    function name() external pure returns(string memory);
    function symbol() external pure returns(string memory);
    function decimals() external pure returns(uint8);
    function totalSupply() external view returns(uint256);
    function balanceOf(address owner) external view returns(uint256);
    function allowance(address owner, address spender) external view returns(uint256);

    function approve(address spender, uint256 amount) external returns(bool);
    function transfer(address to, uint256 amount) external returns(bool);
    function transferFrom(address from, address to, uint256 amount) external returns(bool);

    function nonces(address owner) external view returns(uint256);

    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, unit amount1, address indexed to);
    event Swap(address indexed sender, uint amount0In, uint amount1In, uint amount0Out, uint amount1Out, address indexed to);
    event Sync(uint112 reserve0, uint112 reserve1);

    function MINIMUM_LIQUIDITY() external pure returns(uint256);
    function factory() external view returns(address);
    function token0() external view returns(address);
    function token1() external view returns(address);
    function getReserves() external view returns(uint112 reserv0, uint112 reserve1, uint32 blockTimestampLast);

    function mint(address to) external returns(uint256 liquidity);
    function burn(address to) external returns(uint256 amount0, uint256 amount1);
    function swap(uint256 amount0, uint256 amount1, address to, bytes calldata data) external;
    function sync() external;
}