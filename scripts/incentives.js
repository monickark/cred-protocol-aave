const incentiveABI = require("../abi/incentives.json");
const incentiveAddress = "0x929EC64c34a17401F460460D4B9390518E5B473e"; // v2 contracts
const userAddr = "0xFF40b156a428758e2d37d95BBC3D1e185a394A66";
const asset = "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9"; // AAVE asset mentioned in v2

async function main() {
  try {
    let Web3 = require("web3");
    var web3 = new Web3(
      `https://mainnet.infura.io/v3/f02d07f5c1494736b277cbcc3bacf2ca`
    );

    const incentiveContract = await new web3.eth.Contract(
      incentiveABI,
      incentiveAddress
    );

    const userIncentives = await incentiveContract.methods
      .getClaimer(userAddr)
      .call()
      .catch((e) => {
        throw Error(`Error getting incentives: ${e.message}`);
      });

    console.log("Incentives details : " + JSON.stringify(userIncentives));
  } catch (err) {
    console.log("Error in incentives: " + err);
  }
}
main();
