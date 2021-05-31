
const {writeFile}=require('fs/promises');
const routerAddr=require('../addresses/routerAddresses.json');
const path=require('path');
exports.getPriceFeedData= (pricefeed)=>{
        let pairSymbols=Object.keys(pricefeed);
        pairSymbols = pairSymbols.map((symbols)=>{
            return symbols.split('/');
        })
        const pairAddresses=Object.values(pricefeed);
        return {
           pairSymbols,
           pairAddresses
        }

}
exports.saveAddresses=async (network,address)=>{
    const data=JSON.stringify({
        ...routerAddr,
        [network]:`${address}`
        });
  
    await writeFile(path.join(__dirname+ '../../addresses/routerAddresses.json'),data);  
}