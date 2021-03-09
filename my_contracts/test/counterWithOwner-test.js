const { expect } = require("chai");

describe("CounterWithOwner", function() {
  it("Should increment the values", async function() {
    const Counter = await ethers.getContractFactory("CounterWithOwner");
    const counter = await Counter.deploy();

    await counter.deployed();
    expect(await counter.getCount()).to.equal(0);
    
    // The way to increment without observing the event
    // const receipt = await counter.increment();

    // Increment while observing the event
    await expect(counter.increment())
      .to.emit(counter, 'ValueChanged')
      .withArgs(ethers.utils.getAddress("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"), 0, 1);

    expect(await counter.getCount()).to.equal(1);

  });
});