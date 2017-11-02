pragma solidity ^0.4.15;

import Ownable from './zeppelin/ownership/Ownable.sol';

contract ResearchID is Ownable {
    mapping (address => bool) researchers;
    address[] waitingApproval;

    function getID() {
        waitingApproval.push(msg.sender);
    }

    function approveID onlyOwner(address id) {
        for (uint i = 0; i < waitingApproval.length - 1; i++) {
            if (waitingApproval[i] == id) {
                researchers[id] = true;
                delete waitingApproval[i];
            }
        }
    }

    function revokeID onlyOwner(address id) {
        require(researchers[id] == true);
        researchers[id] == false;
    }
}
