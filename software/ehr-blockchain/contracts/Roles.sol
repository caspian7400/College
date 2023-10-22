//SPDX-License-Identifier: MIT 
pragma solidity >=0.4.22 <0.9.0;

library Roles{
    struct Role {
        mapping (address => bool) bearer;
        bytes32[] files;
    }

    function add(Role storage role, address account) internal {
        require(!has(role, account), 'Roles: account already has role');
        role.bearer[account] = true;
    }

    function remove(Role storage role, address account) internal {
        require(has(role, account), 'Roles: account does not have the role');
        role.bearer[account] = false;
    }

    function has(Role storage role, address account) internal view returns (bool) {
        require(account != address(0), 'Roles: account has the zero address');
        return role.bearer[account];
    }
}