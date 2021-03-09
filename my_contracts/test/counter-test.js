const { expect } = require("chai");

describe("Counter", function() {
  it("Should increment the values", async function() {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();

    await counter.deployed();
    expect(await counter.getCount()).to.equal(0);
    
    // The way to increment without observing the event
    // const receipt = await counter.increment();

    // Increment while observing the event
    await expect(counter.increment())
      .to.emit(counter, 'ValueChanged')
      .withArgs(0, 1);

    expect(await counter.getCount()).to.equal(1);

  });
});