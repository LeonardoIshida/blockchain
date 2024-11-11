async function main() {
    const EcoCert = await ethers.deployContract("EcoCert");
    await EcoCert.waitForDeployment();

    console.log("EcoCert deployed to:", EcoCert.target);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });