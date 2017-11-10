pragma solidity ^0.4.15;

import './zeppelin/ownership/Ownable.sol';

contract Registry is Ownable {
    address[] public researchers;
    address[] public waitingApproval;

    function Registry(address[] _researchers, address[] pending) {
      for (uint i = 0; i < _researchers.length; i++) {
        researchers.push(_researchers[i]);
      }
      for (uint j = 0; j < pending.length; j++) {
        waitingApproval.push(pending[j]);
      }
    }

    function getResearchers() constant returns(address[]) {
        return researchers;
    }

    function getPending() constant returns(address[]) {
      return waitingApproval;
    }

    function getID() public {
        // Check that the address is not already pending
        for (uint i = 0; i < waitingApproval.length; i++) {
          require(waitingApproval[i] != msg.sender);
        }
        waitingApproval.push(msg.sender);
    }

    function approveID(address id) onlyOwner() public {
        for (uint i = 0; i < waitingApproval.length - 1; i++) {
            if (waitingApproval[i] == id) {
                researchers.push(msg.sender);
                delete waitingApproval[i];
            }
        }
    }

    function revokeID(address id) onlyOwner() public {
      for (uint i = 0; i < researchers.length - 1; i++) {
          if (researchers[i] == id) {
              delete researchers[i];
          }
      }
    }
}
