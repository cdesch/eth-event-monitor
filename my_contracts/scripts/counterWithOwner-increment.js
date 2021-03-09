// node  scripts/counter-increment.js
//https://www.preciouschicken.com/blog/posts/avoiding-call-revert-exception-error-ethers-ganache-node/
const hre = require("hardhat");
const ethers = hre.ethers;


function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}   
async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile 
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
const blocknumber = await provider.getBlockNumber()
console.log("blocknumber", blocknumber.toString());


filter = {
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

const senderPrivateKey = "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a";
// const senderPrivateKey = "0x348f40e0b3c3d55b626ec085c115fc25578a10a76b9afcd27d4c48094d707348";

const wallet = new ethers.Wallet(senderPrivateKey, provider);


  const Counter = await ethers.getContractFactory("Counter");
//   console.log("Counter", Counter);
//   const counter = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", Counter.interface, provider);
  const counter = new ethers.Contract(contractAddress, Counter.interface, wallet);

counter.on("ValueChanged", (author, oldValue, newValue, event) => {
    // Called when anyone changes the value
    console.log("here Value Changed Value with owner");
    console.log(author);
    // "0x14791697260E4c9A71f18484C9f997B308e59325"

    console.log(oldValue);
    // "Hello World"

    console.log(newValue);
    // "Ilike turtles."

    // See Event Emitter below for all properties on Event
    // console.log(event.blockNumber);
    // 4115004
});

// let filter = contract.filters.ValueChanged(wallet.address);

// contract.on(filter, (author, oldValue, newValue, event) => {
//     // Called ONLY when your account changes the value
// });

let overrides = {

    // The maximum units of gas for the transaction to use
    gasLimit: 50000,

    // The price (in wei) per unit of gas
    gasPrice: ethers.utils.parseUnits('9.0', 'gwei'),

    // // The nonce to use in the transaction
    // nonce: 123,

    // // The amount to send with the transaction (i.e. msg.value)
    // value: ethers.utils.parseEther('1.0'),


};
  console.log("counter.address", counter.address);
//   console.log("Counter", counter);
  const gasEstimate = await counter.estimateGas.getCount();
  console.log("gasEstimate", gasEstimate.toString());
//   const count = await counter.getCount();
//   console.log("count", count);
//   counter.on()
  const result = await counter.increment(overrides);
  console.log("result", result);
  
    await sleep(5000);

//   console.log("Counter Address:", counte.address)
//   const counter = await Counter.deploy();

//   await counter.deployed();

//   console.log("Counter deployed to:", counter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
