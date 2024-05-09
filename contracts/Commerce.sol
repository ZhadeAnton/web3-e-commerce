// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Commerce {
    string public name;
    address public owner;

    constructor() {
        name = "E-Commerce";
        owner = msg.sender;
    }
}
