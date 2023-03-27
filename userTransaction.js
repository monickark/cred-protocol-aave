const axios = require("axios");

const res = async () => {
  try {
    const result = await axios.post(
      "https://api.thegraph.com/subgraphs/name/aave/protocol-v2",
      {
        query: `
        { 
            user(id: "0x39a64e2cc9cd2a04d35db91ca575ea3ec7e50ced") {
                id
                borrowHistory {
                  id
                  action
                  borrowRate
                  borrowRateMode
                  caller{
                    id
                  }
                  reserve
                  {
                    id
                    symbol
                  }
                  stableTokenDebt
                  timestamp
                  
                }
                borrowedReservesCount
                repayHistory {
                  action
                  amount
                  assetPriceUSD
                  id
                  
              }
                 lifetimeRewards
                liquidationCallHistory{
                  id 
                  borrowAssetPriceUSD
                  principalAmount
                  action
                }
                
                swapHistory{
                  id
                  action
                  borrowRateModeTo
                }
                
                unclaimedRewards
                redeemUnderlyingHistory {
                  id
                  action
                  amount
                  assetPriceUSD
                  pool {
                  active
                  }
                }
               
              
            } 
              } 
        `,
      }
    );

    console.log(JSON.stringify(result.data.data.user, null, " "));
  } catch (error) {
    console.error(error);
  }
};

const userReserves = async () => {
  try {
    const result = await axios.post(
      "https://api.thegraph.com/subgraphs/name/aave/protocol-v2",
      {
        query: `
        { 
          userReserves(where: { user: "0x00e286b5256aa6cf252d5a8a5a7b8c20ec3bc4d5"}) {
            id
            reserve{
              id
              symbol
            }
            user {
              id
            }
            borrowHistory {
              id
            }
            swapHistory {
              id
            }
            repayHistory {
              id
            }
            liquidationCallHistory {
              id
            }
            
          }
              } 
        `,
      }
    );

    console.log(JSON.stringify(result.data.data.userReserves, null, " "));
  } catch (error) {
    console.error(error);
  }
};

//res();

//userReserves();
