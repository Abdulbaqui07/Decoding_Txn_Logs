const Web3 = require('web3');

const web3 = new Web3(
    "https://mainnet.infura.io/v3/a6cb9ec392304a8990d3dbd8502adbf6"
);


async function getlogsOfTxn(tx){
    let result = await web3.eth.getTransaction(tx)
    let result2 = await web3.eth.getTransactionReceipt(tx)
    // console.log(result2)
    // console.log(result2.logs[0].topics)

    return result2;
}

function filterTxn(txnObj){
    console.log(txnObj.logs)
    let result = ""
    let contractsAddress = []
    let logs = txnObj.logs

    logs.forEach((log) => {
        contractsAddress.push(log.address)
        let txtype = transactionType(log.topics)
        result += txtype+" "
    })

    console.log(result)
    console.log(contractsAddress)
}

function transactionType(log){
    let string = ""


    let transferEvent = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
	let approvalEvent = "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925";
	let depositEvent = "0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c";
	let withdrawelEvent = "0x7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65";
    let swap = "0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822"

    if (log[0].toLowerCase() == transferEvent) {
		return "transferEvent"
	} else if (log[0].toLowerCase() == approvalEvent) {
		return "approvalEvent"
	} else if (log[0].toLowerCase() == depositEvent) {
		return "depositEvent";
	} else if (log[0].toLowerCase() == withdrawelEvent) {
		return "withdrawelEvent";
	}
    else if (log[0].toLowerCase() == swap) {
		return "swapEvent";
	} 
    else {
        return "unknown"
    }
}

async function main() {
    const data = await getlogsOfTxn('0x606bc694c3599fafe05d00497a779adb158cb9d7612ca7bd17529ca18aa4f2b8')
    // console.log(data)
    filterTxn(data)
}

main()


