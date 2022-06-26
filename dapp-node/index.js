const TronWeb = require('tronweb');
const fullNode = 'https://nile.trongrid.io';
const solidityNode = 'https://nile.trongrid.io';
const eventServer = 'https://nile.trongrid.io';
const privateKey = '85abe7044e1dca89edcb495199d6fc491ae6a1c8fa5b61c99c96179329dacff5';
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

async function listen() {
    const rillContractAddress = "TCcPwEQJTH4hkG5xTYmj7EpNdtqhHD3ZMT";
    let contract = await tronWeb.contract().at(rillContractAddress);

    try {
        await contract && contract.BountyPlaced().watch((err, event) => {
            if (err)
                return console.error('Error with "Message" event:', err);
    
            console.group('New event received');
            console.log('- Contract Address:', event.contract);
            console.log('- Event Name:', event.name);
            console.log('- Transaction:', event.transaction);
            console.log('- Block number:', event.block);
            console.log('- Result:', event.result, '\n');
            console.groupEnd();
        });
    } catch (e) {
        console.log(e);
    }
}

listen();