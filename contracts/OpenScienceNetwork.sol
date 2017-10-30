pragma solidity ^0.4.15;

import ResearchUnit from './ResearchUnit.sol';

contract OpenScienceNetwork {
  address[] public contracts;

  function getContractCount()
    public
    constant
    returns(uint contractCount)
  {
    return contracts.length;
  }

  function newResearchUnit()
    public
    returns(address researchUnit)
  {
    ResearchUnit r = new ResearchUnit();
    contracts.push(r);
    return r;
  }

}
