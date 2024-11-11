async function main() {
    const ecoCertAddress = "0xb9A219631Aed55eBC3D998f17C3840B7eC39C0cc"; // Contract address
    const certificateId = 1;

    if (!ecoCertAddress) {
        console.error("Please provide all required arguments: <contractAddress> <certificateId>");
        process.exit(1);
    }

    const EcoCert = await ethers.getContractFactory("EcoCert");
    const ecoCert = EcoCert.attach(ecoCertAddress);

    const isValid = await ecoCert.isCertificateValid(certificateId);
    console.log(`Certificate validity: ${isValid}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });