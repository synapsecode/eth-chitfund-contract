const { expect } = require("chai");
const { ethers, providers } = require("hardhat");

const inr2wei = (inr) => {
    return 619 * inr;
}

describe("Operator Contract (NEW)", function () {

    let contractInstance;
    let monthlyDeposit = 10000;
    let beneficiary;


    /*Logic:
    Manas, Koushik, Somu each put 10K rupees into the chitfund for 3 months and hence, the pool is worth 30K
    */

    it('Should be Deployed', async () => {
        const [owner, manas, koushik, somu] = await ethers.getSigners();
        beneficiary = somu.address;

        const OperatorContractFactory = await ethers.getContractFactory('OperatorContract');
        const operatorContract = await OperatorContractFactory.deploy(
            3,
            inr2wei(30_000),
            beneficiary
        );
        contractInstance = operatorContract;
        console.info('Contract Instantiated!');
    })

    it(`Manas, Koushik & Somnath send ${monthlyDeposit} INR Each`, async () => {

        const [owner, manas, koushik, somu] = await ethers.getSigners();

        console.info(`\tManas Sends ${monthlyDeposit} INR to Operator`);
        await contractInstance.connect(manas).sendMoneyToOperator({
            value: inr2wei(monthlyDeposit).toString()
        });
        expect(await contractInstance.getBalance()).to.equal(inr2wei(monthlyDeposit));

        console.info(`\tKoushik Sends ${monthlyDeposit} INR to Operator`);
        await contractInstance.connect(koushik).sendMoneyToOperator({
            value: inr2wei(monthlyDeposit).toString()
        });
        expect(await contractInstance.getBalance()).to.equal(2 * inr2wei(monthlyDeposit));

        console.info(`\tSomnath Sends ${monthlyDeposit} INR to Operator`);
        await contractInstance.connect(somu).sendMoneyToOperator({
            value: inr2wei(monthlyDeposit).toString()
        });
        expect(await contractInstance.getBalance()).to.equal(3 * inr2wei(monthlyDeposit));

        // console.log('\tBalances');
        // console.log(await ethers.provider.getBalance(owner.address));
        // console.log(await ethers.provider.getBalance(manas.address));
        // console.log(await ethers.provider.getBalance(koushik.address));
        // console.log(await ethers.provider.getBalance(somu.address));
    });

    it('Beneficiary is able to withdraw funds', async () => {
        const originalBalance = await ethers.provider.getBalance(beneficiary);
        await contractInstance.withdraw();
        const finalBalance = await ethers.provider.getBalance(beneficiary);
        expect(originalBalance).to.lessThan(finalBalance);
        expect(await contractInstance.getBalance()).to.equal(0);
    });
});