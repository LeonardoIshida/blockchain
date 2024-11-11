async function main() {
    const ecoCertAddress = "0xb9A219631Aed55eBC3D998f17C3840B7eC39C0cc";
    const companyName = "Loja de peixes do leo"; // need the company name

    if (!ecoCertAddress || !companyName) {
        console.error("Please provide all required arguments: <contractAddress> <companyName>");
        process.exit(1);
    }

    const EcoCert = await ethers.getContractFactory("EcoCert");
    const ecoCert = EcoCert.attach(ecoCertAddress);

    // getting the certificates
    const certificates = await ecoCert.getCertificatesByCompany(companyName);

    // function to solve bigint cast
    function replacer(key, value) {
        return typeof value === 'bigint' ? value.toString() : value;
    }

    // printing in a json-like way
    console.log(`Certificates for company ${companyName}:`);
    console.log(JSON.stringify(certificates, replacer, 2));
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });