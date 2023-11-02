//SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

import "./Roles.sol";

contract Contract {
    using Roles for Roles.Role;

    Roles.Role private admin;
    Roles.Role private doctor;
    Roles.Role private patient;

    constructor() public {
        admin.add(msg.sender);
    }

    modifier onlyAdmin() {
        require(admin.has(msg.sender));
        _;
    }
    modifier onlyDoctororAdmin() {
        require(
            doctor.has(msg.sender) || admin.has(msg.sender),
            "caller is not an admin or doctor"
        );
        _;
    }
    modifier onlyPatientorAdmin() {
        require(
            patient.has(msg.sender) || admin.has(msg.sender),
            "caller is not an admin or patient"
        );
        _;
    }

    function isPatient() public view returns (bool) {
        return patient.has(msg.sender);
    }

    function isDoctor() public view returns (bool) {
        return doctor.has(msg.sender);
    }

    function isAdmin() public view returns (bool) {
        return admin.has(msg.sender);
    }

    function removePatient(address patientAddress) public onlyAdmin {
        return patient.remove(patientAddress);
    }

    function removeDoctor(address doctorAddress) public onlyAdmin {
        return doctor.remove(doctorAddress);
    }

    function registerAsPatient() public {
        require(
            !patient.has(msg.sender),
            "Account already registered as a patient"
        );
        patient.add(msg.sender);
    }

    function registerAsAdmin() public onlyAdmin {
        require(
            !admin.has(msg.sender),
            "Account already registered as an Admin"
        );
        admin.add(msg.sender);
    }

    function registerAsDoctor() public {
        require(
            !doctor.has(msg.sender),
            "Account already registered as an Doctor"
        );
        doctor.add(msg.sender);
    }

    function addPatientFiles(
        address patientAddress,
        string memory CID
    ) public onlyDoctororAdmin {
        require(patient.has(patientAddress), "patient not found");
        patient.files[patientAddress].push(CID);
    }

    // function grantAccess(address doctorAddress) public onlyPatientorAdmin(){}

    // function revokeAccess(address doctorAddress) public onlyDoctororAdmin(){}

    function getPatientFiles(
        address patientAddress
    ) public view returns (string[] memory) {
        require(patient.has(patientAddress), "patient not found");
        return patient.files[patientAddress];
    }
}
