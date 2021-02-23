const ContractKit = require("@celo/contractkit");
const Web3 = require("web3");

require("dotenv").config();

const main = async () => {
  // Create connection to DataHub Celo Network node
  const web3 = new Web3(process.env.REST_URL);
  const client = ContractKit.newKitFromWeb3(web3);

  // Initialize account from our private key
  const account = web3.eth.accounts.privateKeyToAccount(
    process.env.PRIVATE_KEY
  );

  // 1. Query account balances
  const accountBalances = await client
    .getTotalBalance(account.address)
    .catch((err) => {
      throw new Error(`Could not fetch account: ${err}`);
    });

  // 2. Query node info
  const nodeInfo = await web3.eth.getNodeInfo().catch((err) => {
    throw new Error(`Could not fetch node info: ${err}`);
  });
  console.log("Node Info: ", nodeInfo);

  console.log("CELO balance: ", accountBalances.CELO.toString(10));
  console.log("cUSD balance: ", accountBalances.cUSD.toString(10));
  console.log("Locked CELO balance: ", accountBalances.lockedCELO.toString(10));
  console.log("Pending balance: ", accountBalances.pending.toString(10));

  // 2. Query node info

  // 3.1 Query latest block

  // 3.2 Block by number, defaults to latest, lets get block 3263105

  // 4. eth_getTransactionCount

  // 5.eth_estimateGas
};

main().catch((err) => {
  console.error(err);
});
