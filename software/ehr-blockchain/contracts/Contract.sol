//SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Roles.sol";

contract Contract {
    using Roles for Roles.Role;

    Roles.Role private admin;
    Roles.Role private doctor;
    Roles.Role private patient;

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
}
