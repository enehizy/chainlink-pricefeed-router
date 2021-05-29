pragma solidity ^0.8.0;
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
contract ChainlinkPriceFeedRouter is Ownable{
    
    mapping(bytes4 => address) private pricefeed;
    
    constructor() Ownable(){

    }
    function getPriceForPair(string memory firstTokenName ,string memory secondTokenName) external view returns(int){
          address _pricefeed=getPriceFeedAddress(firstTokenName,secondTokenName);
          if(_pricefeed == address(0)){
            return 0;
            }
         int price= getThePrice(_pricefeed);
         return price;
    
    }

    function getPriceFeedAddress(string memory firstTokenName, string memory secondTokenName) public view returns(address) {
             bytes4 _id =_pointer(firstTokenName,secondTokenName);
             return  pricefeed[_id];
    } 

    function registerPair(string calldata firstTokenName, string calldata secondTokenName,address pricefeedAddress) onlyOwner()  external returns(bytes4){
          require(pricefeedAddress != address(0),"Invalid feed address");
          require(getPriceFeedAddress(firstTokenName,secondTokenName) == address(0),"price feed already exist");
          bytes4 _id=_pointer(firstTokenName,secondTokenName);
          pricefeed[_id] = pricefeedAddress;
          return _id;
    }

   function _pointer(string memory firstTokenName ,string memory secondTokenName) private view returns(bytes4){
     return bytes4(keccak256(abi.encodePacked(firstTokenName,secondTokenName)));
   }
   function getThePrice(address pricefeedAddress) private view returns (int) {

        (
            uint80 roundID, 
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = AggregatorV3Interface(pricefeedAddress).latestRoundData();
        return price;
    }



    
}