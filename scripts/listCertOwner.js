async function main() {
    const ecoCertAddress = "0xb9A219631Aed55eBC3D998f17C3840B7eC39C0cc";
    const ownerAddress = "0x5A0b54D5dc17e0AadC383d2db43B0a0D3E029c4c"; // need owner address

    if (!ecoCertAddress || !ownerAddress) {
        console.error("Please provide all required arguments: <contractAddress> <ownerAddress>");
        process.exit(1);
    }

    const EcoCert = await ethers.getContractFactory("EcoCert");
    const ecoCert = EcoCert.attach(ecoCertAddress);

    const certificates = await ecoCert.listCertificatesByOwner(ownerAddress);

    // function to solve bigint cast
    function replacer(key, value) {
        return typeof value === 'bigint' ? value.toString() : value;
    }

    // printing in a json-like way
    console.log(`Certificates for Owner ${ownerAddress}:`);
    console.log(JSON.stringify(certificates, replacer, 2));
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });