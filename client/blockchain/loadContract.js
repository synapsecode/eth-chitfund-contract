
import { ethers } from 'ethers';

export const loadContract = (deployedAddress) => {
    const contract = require("./abi/OperatorContract.json");
    const infuraProvider = new ethers.providers.InfuraProvider("sepolia", '780328900b614f06a7c9a42fd61d87bc');
    const signer = new ethers.Wallet('0xb8cbe34e8672ddd7d97320f10282d314a182023b91537d922bda9f726941ff1f', infuraProvider);
    const operatorContract = new ethers.Contract(deployedAddress, contract.abi, signer);
    return operatorContract
}

