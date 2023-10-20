// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const inr2wei = (inr) => {
    return 619 * inr;
}

export const deployChitFundOperator = async ({ memberCount, chitValue }) => {
    const operator = await hre.ethers.deployContract(
        'OperatorContract',
        [memberCount, chitValue]
    );
    console.log(`ChitFundOperator deployed to address: ${operator.target}`)
    console.log(`\tChitValue:${chitValue} wei\n\tMonths:${memberCount}`)
}

async function main() {
    await deployChitFundOperator({
        memberCount: 3,
        chitValue: inr2wei(7_000)
    });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
