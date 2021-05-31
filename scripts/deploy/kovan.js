const {ethers}=require("hardhat");
const {writeFileSync}=require('fs');
let pricefeeds=require('../../addresses/pricefeed.json');
const {getPriceFeedData,saveAddresses}=require('../utils');
(async function(){
const ChainLinkRouter=await ethers.getContractFactory('ChainlinkPriceFeedRouter');
const router=await ChainLinkRouter.deploy();
await router.deployed();
const data=getPriceFeedData(pricefeeds.kovan);
const pairSymbols=data.pairSymbols;
const pairAddresses=data.pairAddresses;
let newAddr;
// await saveAddresses('kovan',router.address);

// tokenA=pairSymbols[num][0];
// tokenB=pairSymbols[num][1];
// addr =pairAddresses[num];
// await router.registerPair(tokenA,tokenB,addr);

for(let i=0;i< pairSymbols.length;i++){
let tokenA;
let tokenB;
let addr;
tokenA=pairSymbols[i][0];
tokenB=pairSymbols[i][1];
addr =pairAddresses[i];
await router.registerPair(tokenA,tokenB,addr);
}

await saveAddresses('kovan',router.address);








})().then(()=>{
    process.exit(0);
})
.catch((error)=>{
    console.log(error);
    process.exit(1);
})