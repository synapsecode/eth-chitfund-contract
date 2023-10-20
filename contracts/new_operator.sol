// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

 contract OperatorContract {
    address public contractOwner;
    uint memberSize;
    uint poolSize;
    address payable public beneficiary;
    uint chitAmount;

    //Store whoever sent money
    address payable[] public paidMembersList;
    mapping(address => bool) public paidMembers;

    constructor(uint _memberSize, uint _chitAmount) {
        contractOwner = msg.sender;
        memberSize = _memberSize;
        poolSize = _memberSize * _chitAmount;
        chitAmount = _chitAmount;
    }

    function setBeneficiary(address payable _beneficiary) public {
        beneficiary = _beneficiary;
    }

    function sendMoneyToOperator() public payable {
        require(paidMembersList.length < memberSize, "MAX_MEMBERS_REACHED");
        require(msg.value > 0 wei, "ZERO_DEPOSIT");
        require(msg.value <= chitAmount, "EXCEEDED_CHIT_VALUE");
        // require(paidMembers[msg.sender] = false, "REPEAT_DEPOSIT");
        paidMembers[msg.sender] = true;
        paidMembersList.push(payable(msg.sender));        
    }

    function getBalance() public view returns(uint){
        return address(this).balance;
    }

    function withdraw() public {
        uint bal = address(this).balance;
        beneficiary.transfer(bal);
    }

 }
