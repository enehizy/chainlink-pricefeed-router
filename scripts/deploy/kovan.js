const {ethers}=require("hardhat");
let pricefeeds=require('../../addresses/pricefeed.json');
const {getPriceFeedData}=require('../utils');
(async function(){

// const ChainLinkRouter=await ethers.getContractFactory('ChainlinkPriceFeedRouter');
// const router=await ChainLinkRouter.deploy();
// await router.deployed();
const data=getPriceFeedData(pricefeeds.kovan);
const pairSymbols=data.pairSymbols;
 const pairAddresses=data.pairAddresses;




})().then(()=>{
    process.exit(0);
})
.catch((error)=>{
    console.log(error);
    process.exit(1);
})