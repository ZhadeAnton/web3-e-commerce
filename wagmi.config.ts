import { defineConfig } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import { erc20Abi } from "viem";
import { abi } from "./artifacts/contracts/Commerce.sol/Commerce";

export default defineConfig({
  out: "abis/generated.ts",
  contracts: [
    {
      name: "erc20",
      abi: erc20Abi
    },
    {
      name: "commerce",
      abi
    }
  ],
  plugins: [react()]
});
