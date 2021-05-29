



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