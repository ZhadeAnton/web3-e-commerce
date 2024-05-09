import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

async function deployCommerceFixture() {
  const [owner, otherAccount] = await hre.viem.getWalletClients();
  const publicClient = await hre.viem.getPublicClient();
  const commerce = await hre.viem.deployContract("Commerce");

  return {
    commerce,
    owner,
    otherAccount,
    publicClient
  };
}

describe("Deploy", () => {
  it("should has a name", async () => {
    const { commerce } = await loadFixture(deployCommerceFixture);
    expect(await commerce.read.name()).to.equal("E-Commerce");
  });
});
