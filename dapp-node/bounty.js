const TronWeb = require('tronweb');
const fullNode = 'https://nile.trongrid.io';
const solidityNode = 'https://nile.trongrid.io';
const eventServer = 'https://nile.trongrid.io';
const privateKey = '85abe7044e1dca89edcb495199d6fc491ae6a1c8fa5b61c99c96179329dacff5';
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

async function collectBounty() {
    console.log(`Bounty will be collected`);

    const rillContractAddress = "TCcPwEQJTH4hkG5xTYmj7EpNdtqhHD3ZMT";
    let contract = await tronWeb.contract().at(rillContractAddress);

    const bountyId = 2;
    const collector = 'TXP7FFLRNJXthdB8PSehdNNTJpjMrkGNYK';

    const result = await contract.collectBounty(bountyId, collector).send({
        feeLimit: 100_000_000,
        callValue: 0,
        shouldPollResponse: true
    });

    console.log(`Bounty ${bountyId} collected by ${collector}`);

    return result;
}

// collectBounty();

module.exports = {
    collectBounty
}