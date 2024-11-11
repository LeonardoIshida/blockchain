async function main() {
    const ecoCertAddress = "0xb9A219631Aed55eBC3D998f17C3840B7eC39C0cc";
    const description = "Bolos de chocolate de reservas organicas";
    const ownerAddress = "0xca9c2dfa62f4589827c0dd7dcf48259aa29f22f5";
    const companyName = "Casa de bolos Sao carlos";
    const location = "Brasil";
    const batch = "12/2024";
    const docURL = "naosei2.com";

    if (!ecoCertAddress || !companyName || !description || !ownerAddress || !location || !batch || !docURL) {
        console.error("Please provide all required arguments: <contractAddress> <companyName> <description> <ownerAddress> <location> <batch> <docURL>");
        process.exit(1);
    }

    const EcoCert = await ethers.getContractFactory("EcoCert");
    const ecoCert = EcoCert.attach(ecoCertAddress);

    const tx = await ecoCert.issueCertificate(companyName, description, ownerAddress, location, batch, docURL);
    await tx.wait();
    console.log("Certificate issued successfully");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });