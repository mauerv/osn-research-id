var ResearcherRegistry = artifacts.require('./ResearcherRegistry');

contract('ResearcherRegistry', function(accounts) {
  let registry
  let owner = accounts[0]

  beforeEach(async () => {
    registry = await ResearcherRegistry.new()
    await registry.signup('testuser', {from: accounts[1]})
  })

  it('Should add a pending researcher.', async () => {
    let pendingResearcher = await registry.pendingIndex(0)
    let pendingResearcherNameHex = await registry.pendingResearchers(accounts[1])
    let pendingResearcherName = web3.toUtf8(String(pendingResearcherNameHex))
    assert.equal(accounts[1], pendingResearcher, 'The user was not added to pendingIndex.');
    assert.equal('testuser', pendingResearcherName, 'The name was not added to pendingResearchers.')
  })

  it('Should login a researcher with valid ID', async () => {
    // The owner is initialized as a researcher in the contract constructor.
    let ownerNameHex = await registry.login({from: owner})
    let ownerName = web3.toUtf8(String(ownerNameHex))
    assert.equal('Mauro', ownerName, 'The owner should be able to login after contract initialitiation.')
  })

  it('Owner should be able to approve a researcher ID.', async () => {
    // Aprove ID by owner
    await registry.approveID(accounts[1], {from: owner})
    // Check that it's now a researcher
    let researcher = await registry.researcherIndex(1)
    let researcherName = web3.toUtf8(String(await registry.researchers(accounts[1])))

    assert.equal(accounts[1], researcher, 'The user was not added to researcherIndex.');
    assert.equal('testuser', researcherName, 'The name was not added to researchers mapping.')
    // Check that it's no longer a pending researcher.
    let pendingResearcher = await registry.pendingIndex(0)
    let pendingName = await registry.pendingResearchers(accounts[1])

    assert.equal(0x0, pendingResearcher, 'The user should be removed from pendingIndex')
    assert.equal(0x0, pendingName, 'The user should be removed from pendingResearchers')
  })

  it('Owner should be able to reject a researcher ID.', async () => {
    await registry.rejectID(accounts[1], {from: owner})
    // Check that it's no longer a pending researcher
    let pendingResearcher = await registry.pendingIndex(0)
    let pendingName = await registry.pendingResearchers(accounts[1])

    assert.equal(0x0, pendingResearcher, 'The user should be removed from pendingIndex')
    assert.equal(0x0, pendingName, 'The user should be removed from pendingResearchers')
  })

  it('Owner should be able to revoke a researcher ID.', async () => {
    await registry.approveID(accounts[1], {from: owner})
    await registry.revokeID(accounts[1], {from: owner})
    // Check that it's no longer a researcher
    let researcher = await registry.researcherIndex(1)
    let researcherName = await registry.researchers(accounts[1])

    assert.equal(0x0, researcher, 'The user should be removed from researcherIndex')
    assert.equal(0x0, researcherName, 'The user should be removed from researcherResearchers')
  })
});
