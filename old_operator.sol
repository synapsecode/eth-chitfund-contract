// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract OperatorContract {
    address public contractOwner;
    uint memberSize;
    uint duration;
    uint monthlyAmount;

    //Store whoever sent money
    address payable[] public paidMembersList;
    mapping(address => bool) public paidMembers;

    constructor(uint _memberSize) payable {
        contractOwner = msg.sender;
        memberSize = _memberSize;
        duration = _memberSize;
        monthlyAmount = msg.value;
    }

    function sendMoneyToOperator() public payable {
        require(paidMembersList.length < memberSize, "MAX_MEMBERS_REACHED");
        require(msg.value > 0 wei, "ZERO_DEPOSIT");
        paidMembers[msg.sender] = true;
        // paidMembersList.push(msg.sender);
        paidMembersList.push(payable(msg.sender));
    }

    function getBalance() public view returns(uint){
        return address(this).balance;
    }

    function auction() public {
        
    }

    function withdrawFraction(address payable member, uint amount) public {
          uint amt = (1 ether) * amount;
        //Require check if member is in map
        require(paidMembers[member] == true, "NON_MEMBER_WITHDRAW");
        require(amt <= address(this).balance, "MAX_AMT_REACHED");
        // uint bal = address(this).balance;
        // uint diff = bal - amount;
        //if amount is zero, distribute to everyone
        member.transfer(amt);
        if(amount == 0 ether){
             distributeBalanceToEveryone(member, false);
        } else{
            distributeBalanceToEveryone(member, true);
        }
        
    }

    function distributeBalanceToEveryone(address excludedMember, bool considerExclusion) internal {
        uint8 subv = 0;
        if(considerExclusion) subv = 1;
        uint amt =  address(this).balance / (paidMembersList.length - subv );
        for (uint i=0; i<paidMembersList.length; i++) {
            address payable member = paidMembersList[i];
            if(member == excludedMember && considerExclusion) continue;
            member.transfer(amt);
        }
    }
}