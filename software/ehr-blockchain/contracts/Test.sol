// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Test {
    string public role;
    string public name;
    string public email;
    string private password;

    function setRole(string memory _role) public {
        role = _role;
    }
    function setName(string memory _name) public {
        name = _name;
    }
    function setEmail(string memory _email) public {
        email = _email;
    }
    function setPassword(string memory _password) public {
        password = _password;
    }

    function getName() public view returns (string memory) {
        return name;
    }
    function getEmail() public view returns (string memory) {
        return email;
    }
    function getRole() public view returns (string memory) {
        return role;
    }
}
