// Import the ABIs, see: https://docs.aave.com/developers/developing-on-aave/deployed-contract-instances
const poolProviderABI = require("./lending/pool.json");
// Retrieve the LendingPool address
const poolProviderAddress = "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2"; // mainnet address, for other addresses: https://docs.aave.com/developers/developing-on-aave/deployed-contract-instances
const userAddr = "0xade58Ee3b3e0ABC11b2b84A6221B64726Ea7d7fb";

async function main() {
  try {
    let Web3 = require("web3");
    var web3 = new Web3(
      `https://mainnet.infura.io/v3/f02d07f5c1494736b277cbcc3bacf2ca`
    );

    const lpAddressProviderContract = await new web3.eth.Contract(
      poolProviderABI,
      poolProviderAddress
    );
    // Get the latest LendingPool contract address
    const poolObj = await lpAddressProviderContract.methods
      .getUserAccountData(userAddr)
      .call()
      .catch((e) => {
        throw Error(`Error getting lendingPool address: ${e.message}`);
      });

    let poolObjData = {
      "total Collateral Base": web3.utils.fromWei(poolObj[0], "ether"),
      "total Debt Base": web3.utils.fromWei(poolObj[1], "ether"),
      "available Borrows Base": web3.utils.fromWei(poolObj[2], "ether"),
      "current Liquidation Threshold": web3.utils.fromWei(poolObj[3], "ether"),
      "loan to value": web3.utils.fromWei(poolObj[4], "ether"),
      "health Factor": web3.utils.fromWei(poolObj[5], "ether"),
    };

    console.log("lpAddresss : " + JSON.stringify(poolObjData));
  } catch (err) {
    console.log("Error in lending: " + err);
  }
}
main();
