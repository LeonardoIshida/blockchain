async function main() {
    const ecoCertAddress = "0xb9A219631Aed55eBC3D998f17C3840B7eC39C0cc"; // Contract address
    const certificateId = 0;
    const companyName = "Loja de peixes do leozera monster";
    const description = "Vende-se bragres";
    const location = "Sao carlos/SP";
    const batch = "11/2024";
    const docURL = "aindanaosei.com";

    if (!ecoCertAddress || !companyName || !description || !location || !batch || !docURL) {
        console.error("Please provide all required arguments: <contractAddress> <certificateId> <companyName> <description> <location> <batch> <docURL>");
        process.exit(1);
    }

    const EcoCert = await ethers.getContractFactory("EcoCert");
    const ecoCert = EcoCert.attach(ecoCertAddress);

    const tx = await ecoCert.updateCertificate(certificateId, companyName, description, location, batch, docURL);
    await tx.wait();
    console.log("Certificate updated successfully");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });