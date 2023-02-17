// Import the ABIs, see: https://docs.aave.com/developers/developing-on-aave/deployed-contract-instances
const LendingPoolAddressesProviderABI = require("./lending/lendingPool.json");
const LendingPoolReserveProviderABI = require("./lending/lendingReserve.json");
// Retrieve the LendingPool address
const lpAddressProviderAddress = "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9";
const lpReserveAddress = "0xC1eC30dfD855c287084Bf6e14ae2FDD0246Baf0d";
const userAddr = "0x159c1FCC4aa34ffcD0cb9e5a6D34051A82c119b0";
const asset = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

async function main() {
  try {
    let Web3 = require("web3");
    var web3 = new Web3(
      `https://mainnet.infura.io/v3/f02d07f5c1494736b277cbcc3bacf2ca`
    );

    console.log("===============  LENDING POOL USER DATA  ===============");
    const lendingPoolContract = await new web3.eth.Contract(
      LendingPoolAddressesProviderABI,
      lpAddressProviderAddress
    );
    // Get the latest LendingPool contract address
    const lpUserData = await lendingPoolContract.methods
      .getUserAccountData(userAddr)
      .call()
      .catch((e) => {
        throw Error(`Error getting lendingPool user data: ${e.message}`);
      });

    /** totalCollateralETH: the total collateral in ETH of the user
     * totalDebtETH: the total debt in ETH of the user
     * availableBorrowsETH: the borrowing power left of the user
     * currentLiquidationThreshold: the liquidation threshold of the user
     * ltv: the loan to value of the user
     * healthFactor: the current health factor of the user
     **/
    let lpUserDataObj = {
      "total Collateral ETH": web3.utils.fromWei(lpUserData[0], "ether"),
      "total Debt ETH": web3.utils.fromWei(lpUserData[1], "ether"),
      "available Borrows ETH": web3.utils.fromWei(lpUserData[2], "ether"),
      "current Liquidation Threshold": web3.utils.fromWei(
        lpUserData[3],
        "ether"
      ),
      "loan to value": web3.utils.fromWei(lpUserData[4], "ether"),
      "health Factor": web3.utils.fromWei(lpUserData[5], "ether"),
    };
    console.log(
      `Lending pool user data for ${userAddr} : ` +
        JSON.stringify(lpUserDataObj)
    );

    console.log(
      "===============  LENDING POOL USER RESERVE DATA  ==============="
    );

    const lendingPoolReserveContract = await new web3.eth.Contract(
      LendingPoolReserveProviderABI,
      lpReserveAddress
    );

    // Get the latest LendingPool contract address
    const lpUserReserveData = await lendingPoolReserveContract.methods
      .getUserReserveData(asset, userAddr)
      .call()
      .catch((e) => {
        throw Error(`Error getting lendingPool user data: ${e.message}`);
      });

    /** current AToken Balance: the current AToken balance of the user
     * current Borrow Balance: The current stable debt of the user
     * principal Borrow Balance: The principal stable debt of the user
     * borrow Rate Mode: The scaled variable debt of the user
     * borrowRate: The stable borrow rate of the user
     * liquidityRate: The liquidity rate of the reserve
     **/
    //  console.log("lpUserReserveData : " + JSON.stringify(lpUserReserveData));

    let lpUserReserveDataObj = {
      "current AToken Balance": web3.utils.fromWei(
        lpUserReserveData[0],
        "ether"
      ),
      "current Borrow Balance": web3.utils.fromWei(
        lpUserReserveData[1],
        "ether"
      ),
      "principal Borrow Balance": web3.utils.fromWei(
        lpUserReserveData[2],
        "ether"
      ),
      "borrow Rate Mode": web3.utils.fromWei(lpUserReserveData[3], "ether"),
      "borrow Rate": web3.utils.fromWei(lpUserReserveData[4], "ether"),
      "liquidity Rate": web3.utils.fromWei(lpUserReserveData[5], "ether"),
    };
    console.log(
      `Lending pool user reserve data for ${userAddr} : ` +
        JSON.stringify(lpUserReserveDataObj)
    );
  } catch (err) {
    console.log("Error in lending: " + err);
  }
}
main();
