
const { expect } = require("chai");
const { ethers } = require("hardhat");
describe("Chainlink Pricefeed Router",function() {
    let chainlinkPriceFeedRouter;
    let addresses=[];
  
    beforeEach(async()=>{
      try{
        const addrs =await ethers.getSigners();
        addresses =[...addrs];
        const ChainLinkRouter=await ethers.getContractFactory('ChainlinkPriceFeedRouter');
        chainlinkPriceFeedRouter=await ChainLinkRouter.deploy()
        await chainlinkPriceFeedRouter.deployed();
      }
      catch(e){
        console.log(e);
      }
   
  
 
   })
    it("check if deployer owns contract", async function() {
      const [owner]=addresses;
      expect(await chainlinkPriceFeedRouter.owner()).to.equal(owner.address);
     
    });
    it("check for price of a pair", async function() {
      expect(await chainlinkPriceFeedRouter.getPriceForPair('ETH','BTC')).to.equal(0);
      expect(await chainlinkPriceFeedRouter.getPriceForPair('TSLA','USD')).to.equal(0);
     
    });
    it('should return address of pair contract',async()=>{
     
      expect(await chainlinkPriceFeedRouter.getPriceFeedAddress('ETH','BTC')).to.be.equal('0x0000000000000000000000000000000000000000')
      
    })
    it('should fail to Re-register pair',async()=>{
      await chainlinkPriceFeedRouter.registerPair("AAVE","ETH","0xd04647B7CB523bb9f26730E9B6dE1174db7591Ad");
     await expect(chainlinkPriceFeedRouter.registerPair("AAVE","ETH","0xd04647B7CB523bb9f26730E9B6dE1174db7591Ad")).to.be.revertedWith("price feed already exist");
    })
    it("should fail to register if called by a non owner",async()=>{
      const [owner,addr1]=addresses;
      await expect(chainlinkPriceFeedRouter.connect(addr1).registerPair("AAVE","ETH","0xd04647B7CB523bb9f26730E9B6dE1174db7591Ad")).to.be.revertedWith("Ownable: caller is not the owner");

    })
    it('should register new pair address',async()=>{
      await expect(chainlinkPriceFeedRouter.registerPair("AAVE","ETH","0xd04647B7CB523bb9f26730E9B6dE1174db7591Ad"))
      .to.emit(chainlinkPriceFeedRouter,'PairRegistered')
    })
  });
