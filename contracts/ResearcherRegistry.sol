pragma solidity ^0.4.13;

import './zeppelin/lifecycle/Killable.sol';

contract ResearcherRegistry is Killable {
  struct Researcher {
    bytes32 name;
  }

  mapping (address => Researcher) public researchers;
  mapping (address => Researcher) public pendingResearchers;
  address[] public researcherIndex;
  address[] public pendingIndex;

  function ResearcherRegistry() {
    researcherIndex.push(owner);
    researchers[owner].name = 'Mauro';

    pendingIndex.push(0x606976cf33acda58510584db484356ea7d30adb3);
    pendingResearchers[0x606976cf33acda58510584db484356ea7d30adb3].name = 'Emi';

    pendingIndex.push(0x2364ef79d6fb0d00c414d061df5cccc273393d8d);
    pendingResearchers[0x2364ef79d6fb0d00c414d061df5cccc273393d8d].name = 'Gabi';
  }

  modifier onlyExistingResearcher {
    // Check if user exists or terminate

    require(!(researchers[msg.sender].name == 0x0));
    _;
  }

  modifier onlyValidName(bytes32 name) {
    // Only valid names allowed

    require(!(name == 0x0));
    _;
  }

  function login() constant
  onlyExistingResearcher
  returns (bytes32) {
    return (researchers[msg.sender].name);
  }

  function signup(bytes32 name)
  payable
  onlyValidName(name)
  returns (bytes32) {
    // Check if user exists.
    // If yes, return user name.
    // If no, check if name was sent.
    // If yes, create and return user.

    if (researchers[msg.sender].name == 0x0)
    {
        pendingResearchers[msg.sender].name = name;
        pendingIndex.push(msg.sender);

        return (pendingResearchers[msg.sender].name);
    }

    return (researchers[msg.sender].name);
  }

  function update(bytes32 name)
  payable
  onlyValidName(name)
  onlyExistingResearcher
  returns (bytes32) {
    // Update user name.

    if (researchers[msg.sender].name != 0x0)
    {
        researchers[msg.sender].name = name;

        return (researchers[msg.sender].name);
    }
  }

  function getResearchers() constant returns(address[]) {
      return researcherIndex;
  }

  function getPending() constant returns(address[]) {
    return pendingIndex;
  }

  function approveID(address id) onlyOwner() public {
    // Validar que esta en pending y no sea un researcher ya.
    require(pendingResearchers[id].name != 0x0);
    require(researchers[id].name == 0x0);
    // Agregar a researcher y a researcherIndex.
    researchers[id].name = pendingResearchers[id].name;
    researcherIndex.push(id);
    // Sacar de pending y de pendingIndex
    pendingResearchers[id].name = 0x0;
    for (uint i = 0; i < pendingIndex.length - 1; i++) {
        if (pendingIndex[i] == id) {
            delete pendingIndex[i];
        }
    }
  }

  function rejectID(address id) onlyOwner() public {
    require(pendingResearchers[id].name != 0x0);

    pendingResearchers[id].name = 0x0;
    for (uint i = 0; i < pendingIndex.length - 1; i++) {
        if (pendingIndex[i] == id) {
            delete pendingIndex[i];
        }
    }
  }

  function revokeID(address id) onlyOwner() public {
    // Validar que todo este en orden
    require(researchers[id].name != 0x0);
    // Sacarlo de researcher y researcherIndex
    researchers[id].name = 0x0;
    for (uint i = 0; i < researcherIndex.length - 1; i++) {
        if (researcherIndex[i] == id) {
            delete researcherIndex[i];
        }
    }
  }
}
