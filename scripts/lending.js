// Import the ABIs, see: https://docs.aave.com/developers/developing-on-aave/deployed-contract-instances
const LendingPoolAddressesProviderABI = require("../abi/lending.json");
// Retrieve the LendingPool address
const lpAddressProviderAddress = "0x24a42fD28C976A61Df5D00D0599C34c4f90748c8"; // mainnet address, for other addresses: https://docs.aave.com/developers/developing-on-aave/deployed-contract-instances
async function main() {
  try {
    let Web3 = require("web3");
    var web3 = new Web3(
      `https://mainnet.infura.io/v3/f02d07f5c1494736b277cbcc3bacf2ca`
    );

    const lpAddressProviderContract = await new web3.eth.Contract(
      LendingPoolAddressesProviderABI,
      lpAddressProviderAddress
    );
    // Get the latest LendingPool contract address
    const lpAddress = await lpAddressProviderContract.methods
      .getLendingPool()
      .call()
      .catch((e) => {
        throw Error(`Error getting lendingPool address: ${e.message}`);
      });

    console.log("lpAddresss : " + lpAddress);
  } catch (err) {
    console.log("Error in lending: " + err);
  }
}
main();
