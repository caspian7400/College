//SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Roles.sol";

contract Contract {
    using Roles for Roles.Role;

    Roles.Role private admin;
    Roles.Role private doctor;
    Roles.Role private patient;

    modifier onlyAdmin() {
        require(admin.has(msg.sender));
        _;
    }
    modifier onlyDoctororAdmin() {
        require(doctor.has(msg.sender) || admin.has(msg.sender),"caller is not an admin or doctor");
        _;
    }
    modifier onlyPatientorAdmin() {
        require(patient.has(msg.sender) || admin.has(msg.sender),"caller is not an admin or patient");
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

    function registerAsPatient() public {
        require(
            !patient.has(msg.sender),
            "Account already registered as a patient"
        );
        patient.add(msg.sender);
    }
    
    function registerAsAdmin() public {
        require(!admin.has(msg.sender), "Account already registered as an Admin");
        admin.add(msg.sender);
    }
    
    function registerAsDoctor() public {
        require(!doctor.has(msg.sender), "Account already registered as an Doctor");
        doctor.add(msg.sender);
    }

    function addFiles(address patientAddress,bytes32 CID) public onlyDoctororAdmin(){
        require(patient.has(patientAddress), "patient not found");
        patient.files.push(CID);
    }

    function grantAccess(address doctorAddress) public onlyPatientorAdmin(){}

    function revokeAccess(address doctorAddress) public onlyDoctororAdmin(){}

    function getFiles(address patientAddress) public view returns (bytes32[] memory){
        require(patient.has(patientAddress), "patient not found");
        return patient.files;
    }

}
