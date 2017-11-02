pragma solidity ^0.4.15;

import SafeMath from './SafeMath';

contract ResearchUnit is SafeMath {
    // Minimum funds to pass funding round.
    uint public minFunds;
    // Total balance of ethers that this research has.
    uint public balance;
    // Hash pointing to IPFS file with experiment description.
    bytes public description;
    // Address pointing to this particular research ERC20 token.
    address public researchToken;
    // Maps people who donated with their donation ammounts in case they want to cancel a donation.
    mapping (address => uint) public funders;
    // Array of IPFS file addresses cointaining research contributions ('posts').
    bytes[] contributions;
    // Array of IPFS file addresses containing commercial contracts for this research.
    bytes[] licenses;

    // Constructor, begins research cycle at the pre-registration stage.
    function ResearchUnit(uint _minFunds, bytes _description) {
        minFunds = _minFunds;
        description = _description;
    }

    // Functions relating to research funding
    function giveGrant() payable atStage(Stages.funding) {
        safeAdd(funders[msg.sender], msg.amount);
        safeAdd(balance, msg.amount);
    }

    function withdrawGrant() atStage(Stages.funding) {
        uint amount = funders[msg.sender];
        safeSub(balance, amount);
        safeSub(funders[msg.sender], amount);
        assert(msg.sender.send(amount));
    }

    // Starts the collaborative researcb process if the funding conditions are met.
    function startResearch() atStage(Stages.funding) transitionNext() {
        require(balance >= minFunds);
    }

    // Allows researchers to contribute with knowledge
    function makeContribution(bytes contribution) atStage(Stages.active) {
        contributions.push(contribution);
    }

    // Publishes research, need to think and add validation.
    function publishResearch() atStage(Stages.active) transitionNext() {
    }

    // Lets peer reviewers evaluate a piece of research.
    function reviewResearch() atStage(Stages.published) {

    }

    // Licenses the research, need to think and add validation.
    function licenseResearch(bytes license) atStage(Stages.published) {
        licenses.push(bytes license);
    }
}
