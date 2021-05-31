const {ethers}=require("hardhat");
let pricefeeds=require('../../addresses/pricefeed.json');
const {getPriceFeedData,saveAddresses}=require('../utils');
(async function(){

const ChainLinkRouter=await ethers.getContractFactory('ChainlinkPriceFeedRouter');
const router=await ChainLinkRouter.deploy();
await router.deployed();

const data=getPriceFeedData(pricefeeds.rinkeby);
const pairSymbols=data.pairSymbols;
const pairAddresses=data.pairAddresses;

for(let i=0;i< pairSymbols.length;i++){
    let tokenA;
    let tokenB;
    let addr;
    tokenA=pairSymbols[i][0];
    tokenB=pairSymbols[i][1];
    addr =pairAddresses[i];
    await router.registerPair(tokenA,tokenB,addr);
        
       
    }
    await saveAddresses('rinkeby',router.address);
})().then(()=>{
    process.exit(0);
})
.catch((error)=>{
    console.log(error);
    process.exit(1);
})