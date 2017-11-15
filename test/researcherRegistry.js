var ResearcherRegistry = artifacts.require("./ResearcherRegistry");

contract('ResearcherRegistry', function(accounts) {
  let registry

  it("Should add a pending researcher.", async () => {
    registry = await ResearcherRegistry.deployed()
    await registry.signup('testuser', {from: accounts[1]})
    let pendingResearcher = await registry.pendingIndex(0)
    let pendingResearcherNameHex = await registry.pendingResearchers(accounts[1])
    let pendingResearcherName = web3.toUtf8(String(pendingResearcherNameHex))
    assert.equal(accounts[1], pendingResearcher, "The user was not added to pendingIndex.");
    assert.equal('testuser', pendingResearcherName, "The name was not added to pendingResearcher")
  });

});
