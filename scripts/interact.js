async function main() {
    const contract = await loadContract('0xDB86c56d71f53B1126c59ea7a515Ea98F5D790Af')
    const bal = await contract.getBalance();
    console.log("The balance is: " + bal);
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
