//SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Roles {
    struct Admin {
        mapping(address => bool) bearer;
    }

    struct Doctor {
        mapping(address => bool) bearer;
    }

    struct Patient {
        mapping(address => bool) bearer;
        bytes32[] files; // array to store file CIDs
    }

    address public adminAddress;
    Admin private admins; // Define an Admin struct to manage admins

    constructor() {
        adminAddress = msg.sender; // Initialize the admin's address
        admins.bearer[msg.sender] = true; // Make the contract deployer the initial admin
    }

    function addAdmin(address newAdmin) public onlyAdmin() {
        admins.bearer[newAdmin] = true; // Add a new address as an admin
        adminAddress = newAdmin; // Update the adminAddress to the new admin
    }

    function addPatient(Patient storage patient, address account) internal {
        require(
            !isPatient(patient, account),
            "Roles: account already has role"
        );
        patient.bearer[account] = true;
    }

    function addDoctor(Doctor storage doctor, address account) internal {
        require(!isDoctor(doctor, account), "Roles: account already has role");
        doctor.bearer[account] = true;
    }

    function removePatient(Patient storage patient, address account) internal onlyAdmin() {
        require(
            isPatient(patient, account),
            "Roles: account does not have the role"
        );
        patient.bearer[account] = false;
    }

    function removeDoctor(Patient storage patient, address account) internal onlyAdmin() {
        require(
            isPatient(patient, account),
            "Roles: account does not have the role"
        );
        patient.bearer[account] = false;
    }

    function isPatient(
        Patient storage patient,
        address account
    ) internal view returns (bool) {
        require(account != address(0), "Roles: account has the zero address");
        return patient.bearer[account];
    }

    function isDoctor(
        Doctor storage doctor,
        address account
    ) internal view returns (bool) {
        require(account != address(0), "Roles: account has the zero address");
        return doctor.bearer[account];
    }

    function isAdmin(
        Admin storage admin,
        address account
    ) internal view returns (bool) {
        require(account != address(0), "Roles: account has the zero address");
        return admin.bearer[account];
    }

    modifier onlyAdmin() {
        require(msg.sender == adminAddress, "Roles: caller is not an admin");
        _;
    }
}
