node  scripts/counter-deploy.js 

contract ID : 0x5FbDB2315678afecb367f032d93F642f64180aa3


// node  scripts/counterWithOwner-deploy.js

Contract ID: 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9
npx hardhat run --network localhost scripts/counter-deploy.js 
npx hardhat run --network localhost scripts/counterWithOwner-deploy.js
npx hardhat run --network localhost scripts/counter-increment.js
npx hardhat run --network localhost scripts/counterWithOwner-increment.js
npx hardhat run --network localhost scripts/send-transaction.js

cd my_contracts 
npx hardhat node