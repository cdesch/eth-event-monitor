const express = require('express')
const ethers = require('ethers');
// const providerAddress = "http://localhost:22000";
const providerAddress = "http://127.0.0.1:8545";
// const provider = new ethers.providers.JsonRpcProvider(providerAddress);
const provider = new ethers.providers.getDefaultProvider(providerAddress);
// const Web3 = require('web3');
// const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
// const web3 = new Web3('ws://127.0.0.1:8545')


provider.on("block", async (block_number)=>{
  console.log("new block", block_number);
  // Process Block

  // const block = await provider.getBlock(block_number);
  // console.log("block", block)
  // block.transactions.map(async (tx_hash) => {
  //   const tx = await provider.getTransaction(tx_hash);
  //   console.log("tx", tx);
  // });

  // block.transactions.map(async (tx_hash) => {
  //   const tx = await provider.getTransactionReceipt(tx_hash);
  //   console.log("txr", tx);
  // })
  
  const block = await provider.getBlockWithTransactions(block_number);
  console.log("block", block);
  block.transactions.map(async (tx_hash) => {
    console.log("");
    const tx = await provider.getTransactionReceipt(tx_hash.hash);    
    console.log("tx", tx);
    const code = await provider.getCode(tx_hash.to);

    console.log("code", code);
    if (code == "0x"){
      console.log("normal transactions");
    } else {
      console.log("tis contract");
    }

  });
})


// Listen for Contract events
const contractAddress = ethers.utils.getAddress("0x5FbDB2315678afecb367f032d93F642f64180aa3")
const filter = {
  address: contractAddress,
  topics: [
      // the name of the event, parnetheses containing the data type of each event, no spaces
      ethers.utils.id("ValueChanged(uint256,uint256)")
  ]
}
provider.on(filter, () => {
  // do whatever you want here
  // I'm pretty sure this returns a promise, so don't forget to resolve it
  console.log("here");
})


const contractAddress2 = ethers.utils.getAddress("0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9")
const filter2 = {
  address: contractAddress2,
  topics: [
      // the name of the event, parnetheses containing the data type of each event, no spaces
      ethers.utils.id("ValueChanged(address,uint256,uint256)")
  ]
}

provider.on(filter2,  (log, event) => {
  // do whatever you want here
  // I'm pretty sure this returns a promise, so don't forget to resolve it
  // console.log("here2");
  // console.log(log);
  // console.log(event);
})




const app = express()
const port = 3555

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/listeners',(req, res) => {
  res.send('Hello World!');
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})