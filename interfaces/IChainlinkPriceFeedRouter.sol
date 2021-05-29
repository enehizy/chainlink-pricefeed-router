pragma solidity ^0.8.0;
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
contract IChainlinkPriceFeedRouter {
    function getPriceForPair(string memory firstTokenName ,string memory secondTokenName) external view returns(int);
    function getPriceFeedAddress(string memory firstTokenName, string memory secondTokenName) external view returns(address);
    function registerPair(string calldata firstTokenName, string calldata secondTokenName,address pricefeedAddress) external returns(bytes4);   
}