pragma solidity ^0.4.11;

contract StateMachine {
    uint public openingTime;
    uint public daysToFund = 30;

    enum Stages {
        funding,
        active,
        published,
        rejected
    }

    Stages public stage = Stages.funding;

    modifier atStage(Stages _stage) {
        require(stage == _stage);
        _;
    }

    modifier transitionNext() {
        _;
        nextStage();
    }

    modifier timedTrasitions() {
        if (stage == Stages.closed && now > closingTime + closingTimeLimit) {
            stage = Stages.paying;
        }
        if (stage == Stages.inArbitration && now > arbitrationTime + arbitrationTimeLimit) {
            stage = Stages.paying;
        }
        _;
    }

    function nextStage() internal {
        stage = Stages(uint(stage) + 1);
    }

}
