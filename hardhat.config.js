require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      accounts: {
        count: 4,
        // accountsBalance: 10000000000000000000000, // default value is 10000ETH in wei
      },
    },
    sepolia: {
      url: 'https://sepolia.infura.io/v3/780328900b614f06a7c9a42fd61d87bc',
      accounts: ['0xb8cbe34e8672ddd7d97320f10282d314a182023b91537d922bda9f726941ff1f']
    }
  },
};