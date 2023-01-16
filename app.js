const { getlogsOfTxn, filterTxn, transactionType } = require('./index');

const Web3 = require("web3");
const web3 = new Web3(
  "https://mainnet.infura.io/v3/a6cb9ec392304a8990d3dbd8502adbf6"
);

const contractAddress = "0x1111111254eeb25477b68fb85ed929f73a960582"; // the address of your contract
const contractABI = require("./abi.json");

const contract = new web3.eth.Contract(contractABI, contractAddress);

web3.eth.getBlockNumber().then((blockNumber) => {
    console.log("blockNumber", blockNumber);
    contract.getPastEvents(
      "allEvents",
      {
        fromBlock: blockNumber - 100,
        toBlock: "latest",
      },
      (error, events) => {
        if (error) {
          console.log(error);
          return;
        }
        events.forEach((event) => {
          console.log(event);
        });
      }
    );
  });
