import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

async function deployCommerceFixture() {
  const [owner] = await hre.viem.getWalletClients();
  const publicClient = await hre.viem.getPublicClient();
  const [deployer, buyer] = await owner.getAddresses();
  const commerce = await hre.viem.deployContract("Commerce");

  return {
    deployer,
    buyer,
    commerce,
    owner,
    publicClient
  };
}

describe("Deploy", () => {
  it("sets the owner", async () => {
    const { commerce, deployer } = await loadFixture(deployCommerceFixture);
    expect(await commerce.read.owner()).to.equal(deployer);
  });
});
