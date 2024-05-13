import { ethers } from "ethers";

export const tokens = (n: string | number) => {
  return ethers.parseUnits(n.toString(), "ether");
};

export const formatToEther = (n: string | number) => {
  return ethers.formatUnits(n.toString(), "ether");
};

export const parseBigInt = (n: string | number) => {
  return parseInt(String(n));
};
 