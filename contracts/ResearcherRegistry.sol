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
  }

  modifier onlyExistingResearcher {
    // Check if researcher exists or terminate

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

  function getID(bytes32 name)
  payable
  onlyValidName(name)
  returns (bytes32) {
    require(pendingResearchers[msg.sender].name == 0x0);
    if (researchers[msg.sender].name == 0x0)
    {
        pendingResearchers[msg.sender].name = name;
        pendingIndex.push(msg.sender);
        return pendingResearchers[msg.sender].name;
    }
    return researchers[msg.sender].name;
  }

  function updateID(bytes32 name)
  payable
  onlyValidName(name)
  onlyExistingResearcher
  returns (bytes32) {

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
    // Validate that it's pending approval and it's not a valid researcher already.
    require(pendingResearchers[id].name != 0x0);
    require(researchers[id].name == 0x0);
    // Add researcher to mapping and index array.
    researchers[id].name = pendingResearchers[id].name;
    researcherIndex.push(id);
    // Remove from pending mapping and index array.
    pendingResearchers[id].name = 0x0;
    for (uint i = 0; i < pendingIndex.length; i++) {
        if (pendingIndex[i] == id) {
            delete pendingIndex[i];
        }
    }
  }

  function rejectID(address id) onlyOwner() public {
    require(pendingResearchers[id].name != 0x0);

    pendingResearchers[id].name = 0x0;
    for (uint i = 0; i < pendingIndex.length; i++) {
        if (pendingIndex[i] == id) {
            delete pendingIndex[i];
        }
    }
  }

  function revokeID(address id) onlyOwner() public {
    // Validate that it's a valid researcher ID.
    require(researchers[id].name != 0x0);
    // Remove ID from researcher and researcherIndex.
    researchers[id].name = 0x0;
    for (uint i = 0; i < researcherIndex.length; i++) {
        if (researcherIndex[i] == id) {
            delete researcherIndex[i];
        }
    }
  }
}
