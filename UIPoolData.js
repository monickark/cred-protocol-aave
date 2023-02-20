// Import the ABIs, see: https://docs.aave.com/developers/developing-on-aave/deployed-contract-instances
const LendingPoolAddressesProviderABI = require("./lending/lendingPool.json");
const LendingPoolReserveProviderABI = require("./lending/lendingReserve.json");
const UIPoolDataProviderContractABI = require("./lending/UIPoolDataProviderV3.json");
// Retrieve the LendingPool address
const lpAddressProviderAddress = "0x398eC7346DcD622eDc5ae82352F02bE94C62d119";
const lpReserveAddress = "0xC1eC30dfD855c287084Bf6e14ae2FDD0246Baf0d";
const userAddr = "0x159c1FCC4aa34ffcD0cb9e5a6D34051A82c119b0";
const asset = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const UIPoolDataProviderContract = "0x91c0eA31b49B69Ea18607702c5d9aC360bf3dE7d";
const IPoolAddressesProvider = "0x2f39d218133AFaB8F2B819B1066c7E434Ad94E9e";

async function main() {
  try {
    let Web3 = require("web3");
    var web3 = new Web3(
      `https://mainnet.infura.io/v3/4d461d5e7587469ab541796d232b6a6f`
    );

    console.log("===============  GET RESERVE LISTS  ===============");
    const UIPoolContract = await new web3.eth.Contract(
      UIPoolDataProviderContractABI,
      UIPoolDataProviderContract
    );
    // Get the latest LendingPool contract address
    const lpReserveList = await UIPoolContract.methods
      .getReservesList(IPoolAddressesProvider)
      .call()
      .catch((e) => {
        throw Error(`Error getting lendingPool user data: ${e.message}`);
      });
    console.log(lpReserveList);
    console.log(`UIPool Reserves List : ` + JSON.stringify(lpReserveList));

    console.log("===============  RESERVES DATA  ===============");

    //Returns BaseCurrencyInfo of the Pool and AggregatedReserveData[] for all the initialised reserves in the Pool associated with the given provider.

    // Get the Pool Reserves Data
    const UIPoolDataReserves = await UIPoolContract.methods
      .getReservesData(IPoolAddressesProvider)
      .call()
      .catch((e) => {
        throw Error(`Error getting lendingPool user data: ${e.message}`);
      });
    console.log(UIPoolDataReserves);

    /** AggregatedReserveData[]
     * underlying Asset: Address of the underlying asset supplied/borrowed
     * name: Asset Name
     * symbol: Asset Symbol
     * decimals
     * baseLTVasCollateral
     * reserveLiquidationThreshold
     * reserveLiquidationBonus
     * reserveFactor
     * usageAsCollateralEnabled
     * borrowingEnabled
     * stableBorrowRateEnabled
     * isActive
     * isFrozen
     * liquidityIndex
     * variableBorrowIndex
     * liquidityRate
     * variableBorrowRate
     * stableBorrowRate
     * lastUpdateTimestamp
     * aTokenAddress
     * stableDebtTokenAddress
     * variableDebtTokenAddress
     * interestRateStrategyAddress
     * availableLiquidity
     * totalPrincipalStableDebt
     * averageStableRate
     * stableDebtLastUpdateTimestamp
     * totalScaledVariableDebt
     * priceInMarketReferenceCurrency
     * priceOracle
     * variableRateSlope1
     * variableRateSlope2
     * stableRateSlope1
     * stableRateSlope2
     * baseStableBorrowRate
     * baseVariableBorrowRate
     * optimalUsageRatio
     * isPaused
     * isSiloedBorrowing
     * accruedToTreasury
     * unbacked
     * isolationModeTotalDebt
     * flashLoanEnabled
     * debtCeiling
     * debtCeilingDecimals
     * eModeCategoryId
     * borrowCap
     * supplyCap
     * eModeLtv
     * eModeLiquidationThreshold
     * eModeLiquidationBonus
     * eModePriceSource
     * eModeLabel
     * borrowableInIsolation
     * _______________________
     * _______________________
     * Base Currency Info
     * -----------------------
     * marketReferenceCurrencyUnit
     * marketReferenceCurrencyPriceInUsd
     * networkBaseTokenPriceInUsd
     * networkBaseTokenPriceDecimals
     **/
    console.log("UIPoolReserveData : " + JSON.stringify(UIPoolDataReserves));

    console.log("=============== USER RESERVES DATA  ===============");

    //Returns UserReserveData[] for all user reserves in the Pool associated with the given provider.

    const UIPoolUserDataUserReserves = await UIPoolContract.methods
      .getUserReservesData(
        IPoolAddressesProvider,
        "0xEE56e2B3D491590B5b31738cC34d5232F378a8D5"
      )
      .call()
      .catch((e) => {
        throw Error(`Error getting lendingPool user data: ${e.message}`);
      });
    console.log(UIPoolUserDataUserReserves);

    /**
     * underlyingAsset : Address of the underlying asset supplied/borrowed
     * scaledATokenBalance:scaled balance of aToken(scaledBalance = balance/liquidityIndex)
     * usageAsCollateralEnabledOnUser:true if supplied asset is enabled to be used as collateral
     * stableBorrowRate: Stable rate at which underlying asset is borrowed by the user. 0 ⇒ no debt
     * scaledVariableDebt : scaled balance of vToken(scaledBalance = balance/liquidityIndex)
     * principalStableDebt : Principal amount borrowed at stable rate
     * stableBorrowLastUpdateTimestamp : unix timestamp of last update on user’s stable borrow position.
     */
  } catch (err) {
    console.log("Error in lending: " + err);
  }
}
main();
