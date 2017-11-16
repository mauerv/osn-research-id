pragma solidity ^0.4.13;

import './zeppelin/lifecycle/Killable.sol';

contract ResearcherRegistry is Killable {
  struct Researcher {
    bytes32 name;
    bytes32 email;
  }

  mapping (address => Researcher) public researchers;
  mapping (address => Researcher) public pendingResearchers;
  address[] public researcherIndex;
  address[] public pendingIndex;

  event LogApprovalRequest(address indexed researcher, bytes32 name, bytes32 email);
  event LogApproveID(address indexed researcher, bytes32 name, bytes32 email);
  event LogRejectID(address indexed researcher, bytes32 name, bytes32 email);
  event LogRevokeID(address indexed researcher, bytes32 name, bytes32 email);

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

  function getID(bytes32 name, bytes32 email)
  payable
  onlyValidName(name)
  returns (bytes32) {
    require(pendingResearchers[msg.sender].name == 0x0);
    if (researchers[msg.sender].name == 0x0)
    {
        pendingResearchers[msg.sender].name = name;
        pendingResearchers[msg.sender].email = email;
        pendingIndex.push(msg.sender);
        LogApprovalRequest(msg.sender, name, email);
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
    bytes32 name = pendingResearchers[id].name;
    bytes32 email = pendingResearchers[id].email;
    researchers[id].name = name;
    researchers[id].email = email;
    researcherIndex.push(id);
    // Remove from pending mapping and index array.
    pendingResearchers[id].name = 0x0;
    pendingResearchers[id].email = 0x0;
    for (uint i = 0; i < pendingIndex.length; i++) {
        if (pendingIndex[i] == id) {
            delete pendingIndex[i];
        }
    }
    LogApproveID(id, name, email);
  }

  function rejectID(address id) onlyOwner() public {
    require(pendingResearchers[id].name != 0x0);
    bytes32 name = pendingResearchers[id].name;
    bytes32 email = pendingResearchers[id].email;

    pendingResearchers[id].name = 0x0;
    pendingResearchers[id].email = 0x0;
    for (uint i = 0; i < pendingIndex.length; i++) {
        if (pendingIndex[i] == id) {
            delete pendingIndex[i];
        }
    }
    LogRejectID(id, name, email);
  }

  function revokeID(address id) onlyOwner() public {
    // Validate that it's a valid researcher ID.
    require(researchers[id].name != 0x0);
    bytes32 name = researchers[id].name;
    bytes32 email = researchers[id].email;
    // Remove ID from researcher and researcherIndex.
    researchers[id].name = 0x0;
    researchers[id].email = 0x0;
    for (uint i = 0; i < researcherIndex.length; i++) {
        if (researcherIndex[i] == id) {
            delete researcherIndex[i];
        }
    }
    LogRevokeID(id, name, email);
  }
}
