const Web3 = require("web3");
const InputDataDecoder = require('ethereum-input-data-decoder');
const web3 = new Web3(
  "https://mainnet.infura.io/v3/a6cb9ec392304a8990d3dbd8502adbf6"
);

const contractAddress = "0x1111111254eeb25477b68fb85ed929f73a960582"; // the address of your contract
const contractABI = require("./abi.json");
// const log = require("etherscan-api/lib/log");
// const decoder = new InputDataDecoder(contractABI);
const contract = new web3.eth.Contract(contractABI, contractAddress);

web3.eth.getBlockNumber().then((blockNumber) => {
  console.log("blockNumber", blockNumber);
  contract.getPastEvents(
    "allEvents",
    {
      fromBlock: blockNumber - 1,
      toBlock: "latest",
    },
//     function(error, events) {
//         console.log(events);
//     }).then(function(events){
//         console.log(events);
//     });
// });
    (error, events) => {
      if (error) {
        console.log(error);
        return;
      }
      events.forEach((event) => {
    
    const transferEvent = web3.eth.abi.decodeLog(
        //     // [
        //     //     {
        //     //         type: "address",
        //     //         name: "dst",
        //     //         indexed: true,
        //     //     },
        //     //     {
        //     //         type: "uint256",
        //     //         name: "wad",
        //     //     },
        //     // ] 
            contractABI,
            event.raw["data"],
            event.returnValues['0'],
            );
            console.log(transferEvent);
        console.log(event.returnValues['0']);
        console.log(topics)
      });
    }
  );
});