async function main() {
    const ecoCertAddress = "0xb9A219631Aed55eBC3D998f17C3840B7eC39C0cc"; // Contract address
    const certificateId = 0;
    const additionalTime = 17;

    if (!ecoCertAddress || !additionalTime) {
        console.error("Please provide all required arguments: <contractAddress> <certificateId> <additionalTime>");
        process.exit(1);
    }

    const EcoCert = await ethers.getContractFactory("EcoCert");
    const ecoCert = EcoCert.attach(ecoCertAddress);

    const tx = await ecoCert.extendCertificateExpiry(certificateId, additionalTime);
    await tx.wait();
    console.log("Certificate expiry extended successfully");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });