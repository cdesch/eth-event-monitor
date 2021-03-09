const express = require('express')
const ethers = require('ethers');
// const providerAddress = "http://localhost:22000";
const providerAddress = "http://127.0.0.1:8545";
// const provider = new ethers.providers.JsonRpcProvider(providerAddress);
const provider = new ethers.providers.getDefaultProvider(providerAddress);
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
// const web3 = new Web3('ws://127.0.0.1:8545')



provider.on("block", (block)=>{
  console.log("new block", block)
})

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


// let topic = ethers.utils.id("ValueChanged(address,uint256,uint256)")
// // console.log(ethers.version);


// let filter = {
//     address: contractAddress,
//     topics: [ topic ]
// }

// provider.on(filter, (log, event) => {
//     console.log(log);
//     console.log(event);
// });

// topicSets = [
//   ethers.utils.id("ValueChanged(uint256,uint256)"),
//   null,
//   [
//       "0x5fbdb2315678afecb367f032d93f642f64180aa3"
//   ]
// ]
// provider.on(topicSets, (log, event) => {
//   console.log(log);
//   console.log(event);
// })

// console.log(provider.listeners);

var subscription = web3.eth.subscribe('logs', {
  address: contractAddress,
  // topics: ['0x12345...']
}, function(error, result){
  if (!error)
      console.log(result);
}).on("data", function(log){
  console.log(log);
  console.log("data");
})
.on("changed", function(log){
  console.log("CHANGED");

});


const app = express()
const port = 3555


let privateKey = '0x7654db6d31136215a6559874d1707a1f65893c2291f512acf469709f35688b6a';

// The Contract interface
let abi = [{"inputs":[{"internalType":"string","name":"_greeting","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"greet","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"greeting","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_greeting","type":"string"}],"name":"setGreeting","outputs":[],"stateMutability":"nonpayable","type":"function"}];

// The bytecode from Solidity, compiling the above source
let bytecode =  "0x608060405234801561001057600080fd5b50604051610a1c380380610a1c8339818101604052602081101561003357600080fd5b810190808051604051939291908464010000000082111561005357600080fd5b90830190602082018581111561006857600080fd5b825164010000000081118282018810171561008257600080fd5b82525081516020918201929091019080838360005b838110156100af578181015183820152602001610097565b50505050905090810190601f1680156100dc5780820380516001836020036101000a031916815260200191505b5060608101604052602280825261010b945090925090506109fa60208301398261012560201b61058e1760201c565b805161011e90600090602084019061025c565b50506102f7565b6102378282604051602401808060200180602001838103835285818151815260200191508051906020019080838360005b8381101561016e578181015183820152602001610156565b50505050905090810190601f16801561019b5780820380516001836020036101000a031916815260200191505b50838103825284518152845160209182019186019080838360005b838110156101ce5781810151838201526020016101b6565b50505050905090810190601f1680156101fb5780820380516001836020036101000a031916815260200191505b5060408051601f198184030181529190526020810180516001600160e01b03908116634b5c427760e01b1790915290955061023b169350505050565b5050565b80516a636f6e736f6c652e6c6f67602083016000808483855afa5050505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061029d57805160ff19168380011785556102ca565b828001600101855582156102ca579182015b828111156102ca5782518255916020019190600101906102af565b506102d69291506102da565b5090565b6102f491905b808211156102d657600081556001016102e0565b90565b6106f4806103066000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063a413686214610046578063cfae3217146100ee578063ef690cc01461016b575b600080fd5b6100ec6004803603602081101561005c57600080fd5b81019060208101813564010000000081111561007757600080fd5b82018360208201111561008957600080fd5b803590602001918460018302840111640100000000831117156100ab57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610173945050505050565b005b6100f6610237565b6040805160208082528351818301528351919283929083019185019080838360005b83811015610130578181015183820152602001610118565b50505050905090810190601f16801561015d5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6100f66102ce565b61022060405180606001604052806023815260200161069c602391396000805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156102155780601f106101ea57610100808354040283529160200191610215565b820191906000526020600020905b8154815290600101906020018083116101f857829003601f168201915b50505050508361035c565b80516102339060009060208401906104f6565b5050565b60008054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156102c35780601f10610298576101008083540402835291602001916102c3565b820191906000526020600020905b8154815290600101906020018083116102a657829003601f168201915b505050505090505b90565b6000805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156103545780601f1061032957610100808354040283529160200191610354565b820191906000526020600020905b81548152906001019060200180831161033757829003601f168201915b505050505081565b6104d083838360405160240180806020018060200180602001848103845287818151815260200191508051906020019080838360005b838110156103aa578181015183820152602001610392565b50505050905090810190601f1680156103d75780820380516001836020036101000a031916815260200191505b50848103835286518152865160209182019188019080838360005b8381101561040a5781810151838201526020016103f2565b50505050905090810190601f1680156104375780820380516001836020036101000a031916815260200191505b50848103825285518152855160209182019187019080838360005b8381101561046a578181015183820152602001610452565b50505050905090810190601f1680156104975780820380516001836020036101000a031916815260200191505b5060408051601f198184030181529190526020810180516001600160e01b0316632ced7cef60e01b17905296506104d595505050505050565b505050565b80516a636f6e736f6c652e6c6f67602083016000808483855afa5050505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061053757805160ff1916838001178555610564565b82800160010185558215610564579182015b82811115610564578251825591602001919060010190610549565b50610570929150610574565b5090565b6102cb91905b80821115610570576000815560010161057a565b6102338282604051602401808060200180602001838103835285818151815260200191508051906020019080838360005b838110156105d75781810151838201526020016105bf565b50505050905090810190601f1680156106045780820380516001836020036101000a031916815260200191505b50838103825284518152845160209182019186019080838360005b8381101561063757818101518382015260200161061f565b50505050905090810190601f1680156106645780820380516001836020036101000a031916815260200191505b5060408051601f198184030181529190526020810180516001600160e01b0316634b5c427760e01b17905294506104d5935050505056fe4368616e67696e67206772656574696e672066726f6d202725732720746f2027257327a2646970667358221220bdf207c18cce4e71f8041d2e4a6739d275015887fd7b73c6b602997f26089a5764736f6c634300060700334465706c6f79696e67206120477265657465722077697468206772656574696e673a";

app.use(express.json());

function runCommand(){
  console.log("run command");
}

function getContracts(){

}

function deployContracts(){
  console.log("deployContracts run command");

}

app.get('/', (req, res) => {
  res.send('Hello World!');
  myfunc();
})

app.get('/api/v1/run', (req, res) => {
  console.log("Run")
  runCommand();
  res.send('Run');
})


app.get('/api/v1/faucet/:address', async (req, res) => {
  const address = req.params.address;
  console.log(`faucet for ${address}`);
  if (ethers.utils.isAddress(address)){
    const balance = await provider.getBalance(address);
    console.log("balance", balance.toString(), "ETH");
  } else {
    console.log("invalid address");
  }
  
  res.send(`Faucet  for ${address} is ${balance.toString()} ETH ` );
})

//Create Wallet
// http://localhost:3555/api/v1/wallet/new
app.get('/api/v1/wallet/new', async (req, res) => {
  console.log("create new wallet");
  
  const password = "password";
  // const json = await createAccount(password);
  // console.log("json", json)

  const wallet = ethers.Wallet.createRandom();
  console.log("walleet", wallet);
  const json = await wallet.encrypt(password);
  console.log("json", json);

  res.send(`create new wallet  ${wallet.address} ${wallet.publicKey} - ${wallet.privateKey}`);
})

// Simple Wire
// curl   -H "Accept: application/json" -H "Content-type: application/json"  -d '{"contract": {"name": "22"}}' -X POST http://localhost:3555/api/v1/wire
// app.post('/api/v1/wire',  async function (req, res) {
//   console.log("wire money contracts");
//   console.log("body", req.body);
//   ethers.Signersigner.sendTransaction
//   res.send('POST request to the homepage')
// })



// create new wallet 0x3cAe93B13860b07A83E2c1d9d65335f8029b7484 0x04d1b8b83d46ae9f405743cd829686dd7bfac2795f8156f315f02688b8727dc111fccd112278237a67a3db15a03e22a00c864d02b961eae0bfef585eb3c99281b0 - 0x4d3020995132bee76237b1b145349c5b5763c7715f20124683dc63e57871a352


// http://localhost:3555/api/v1/transactions/0x869d33e6e92b039222929f579fbe3e7be72983303143f82a85755d1f08ac462c
app.get('/api/v1/transactions/:hash', async (req, res) => {
  const hash = req.params.hash;
  console.log("tx hash", hash);
  const transaction = await provider.getTransaction(hash);
  console.log("tx", transaction);
  
  res.send(`tx blockhash ${transaction.blockHash}`);
})


// http://localhost:3555/api/v1/accounts/0xed9d02e382b34818e88B88a309c7fe71E65f419d/balance
// http://localhost:3555/api/v1/accounts/0x3cAe93B13860b07A83E2c1d9d65335f8029b7484/balance
app.get('/api/v1/accounts/:address/balance', async (req, res) => {
  const address = req.params.address;
  console.log(`account balance for ${address}`);
  if (ethers.utils.isAddress(address)){
    const balance = await provider.getBalance(address);
    console.log("balance", balance.toString(), "ETH");
    res.send(`account balance for ${address} is ${balance.toString()} ETH ` );
  } else {
    console.log("invalid address");
    res.send("invalid address");

  }
  
  
})


app.get('/api/v1/get_contracts', (req, res) => {
  console.log("get_contracts")
  runCommand();
  res.send('get_contracts');
})

// app.get('/api/v1/deploy_contract', (req, res) => {
//   console.log("deploy_contract")
//   deployContracts();
//   res.send('deploy_contract');
// })

// curl   -H "Accept: application/json" -H "Content-type: application/json"  -d '{"contract": {"name": "22"}}' -X POST http://localhost:3555/api/v1/deploy_contract

//curl --header "Content-Type: application/json" --request POST --data '{"username":"xyz","password":"xyz"}' http://localhost:3555/api/v1/deploy_contract
app.post('/api/v1/deploy_contract',  async function (req, res) {
  console.log("deploy contracts");
  console.log("body", req.body);
  await deployContract("greeter2", privateKey, abi, bytecode, "noparams");
  res.send('POST request to the homepage')
})




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})