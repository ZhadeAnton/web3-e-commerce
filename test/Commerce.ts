import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import { ethers } from "ethers";
import hre from "hardhat";

const tokens = (n: number) => {
  return ethers.parseUnits(n.toString(), "ether");
};

const ID = BigInt(1);
const NAME = "Shoes";
const CATEGORY = "Clothing";
const IMAGE =
  "https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HuBNgNfSZBx5Msztg/shoes.jpg";
const COST = tokens(1);
const RATING = BigInt(4);
const STOCK = BigInt(5);

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
  it("shouldn't set buyer as a owner ", async () => {
    const { commerce, buyer } = await loadFixture(deployCommerceFixture);
    expect(await commerce.read.owner()).not.to.equal(buyer);
  });
});

describe("Listing", () => {
  it("returns item attributes", async () => {
    const { commerce, publicClient } = await loadFixture(deployCommerceFixture);

    const hash = await commerce.write.list([
      ID,
      NAME,
      CATEGORY,
      IMAGE,
      COST,
      RATING,
      STOCK
    ]);
    await publicClient.waitForTransactionReceipt({ hash });

    const item = await commerce.read.getListItemById([ID]);
    expect(item.id).to.equal(ID);
    expect(item.name).to.equal(NAME);
    expect(item.category).to.equal(CATEGORY);
    expect(item.image).to.equal(IMAGE);
    expect(item.cost).to.equal(COST);
    expect(item.rating).to.equal(RATING);
    expect(item.stock).to.equal(STOCK);
  });
});
