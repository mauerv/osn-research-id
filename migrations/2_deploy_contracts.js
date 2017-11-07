var Ownable = artifacts.require("./zeppelin/ownership/Ownable.sol");
var Killable = artifacts.require("./zeppelin/lifecycle/Killable.sol");
var Authentication = artifacts.require("./Authentication.sol");
var Registry = artifacts.require("./Registry.sol");

module.exports = function(deployer) {
  deployer.deploy(Ownable);
  deployer.link(Ownable, Killable);
  deployer.deploy(Killable);
  deployer.link(Killable, Authentication);
  deployer.deploy(Authentication);
  deployer.deploy(Registry,
    [ web3.eth.accounts[1], web3.eth.accounts[2], web3.eth.accounts[3] ],
    [ web3.eth.accounts[4], web3.eth.accounts[5], web3.eth.accounts[6] ]);
};
