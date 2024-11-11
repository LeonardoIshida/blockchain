// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EcoCert {
    struct Certificate {
        uint256 id;
        string companyName;
        string description;
        address issuer;
        address owner;
        uint256 issueDate;
        uint256 expireDate;
        string location;
        string batch;
        string documentURL;
    }

    // storing id in the contract, not using any libraries
    uint256 public nextId;
    mapping(uint256 => Certificate) public certificates;

    // events to be trigerred after some functions calls
    event CertificateIssued(uint256 id, address indexed issuer, address indexed owner);
    event CertificateUpdated(uint256 id, address indexed issuer);
    event CertificateExpiryExtended(uint256 id, address indexed issuer, uint256 newExpireDate);

    function issueCertificate(
        string memory companyName,
        string memory description,
        address owner,
        string memory location,
        string memory batch,
        string memory docURL
    ) public {
        certificates[nextId] = Certificate(
            nextId,
            companyName,
            description,
            msg.sender,
            owner,
            block.timestamp,
            block.timestamp + 365 days, // valid for 1 year
            location,
            batch,
            docURL
        );
        emit CertificateIssued(nextId, msg.sender, owner);
        nextId++;
    }

    function getCertificate(uint256 id) public view returns (Certificate memory) {
        require(id < nextId);
        return certificates[id];
    }

    function isCertificateValid(uint256 id) public view returns (bool) {
        require(id < nextId);
        Certificate memory cert = certificates[id];
        return block.timestamp <= cert.expireDate;
    }

    function updateCertificate(
        uint256 id,
        string memory companyName,
        string memory description,
        string memory location,
        string memory batch,
        string memory docURL
    ) public {
        require(id < nextId);
        require(certificates[id].issuer == msg.sender, "Only the issuer can update the certificate");
        Certificate storage cert = certificates[id];
        cert.companyName = companyName;
        cert.description = description;
        cert.location = location;
        cert.batch = batch;
        cert.documentURL = docURL;
        emit CertificateUpdated(id, msg.sender);
    }

    function extendCertificateExpiry(uint256 id, uint256 additionalTime) public {
        require(id < nextId);
        require(certificates[id].issuer == msg.sender, "Only the issuer can extend the expiry date");
        require(additionalTime > 0, "You can't decrement the contract life span");

        Certificate storage cert = certificates[id];
        cert.expireDate += additionalTime;

        emit CertificateExpiryExtended(id, msg.sender, cert.expireDate);
    }

    function listCertificatesByOwner(address owner) public view returns (Certificate[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < nextId; i++) {
            if (certificates[i].owner == owner) {
                count++;
            }
        }

        Certificate[] memory result = new Certificate[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < nextId; i++) {
            if (certificates[i].owner == owner) {
                result[index] = certificates[i];
                index++;
            }
        }
        return result;
    }

    function getCertificatesByCompany(string memory companyName) public view returns (Certificate[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < nextId; i++) {
            if (keccak256(abi.encodePacked(certificates[i].companyName)) == keccak256(abi.encodePacked(companyName))) {
                count++;
            }
        }

        Certificate[] memory result = new Certificate[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < nextId; i++) {
            if (keccak256(abi.encodePacked(certificates[i].companyName)) == keccak256(abi.encodePacked(companyName))) {
                result[index] = certificates[i];
                index++;
            }
        }
        return result;
    }
}