import { http, createConfig } from "wagmi";
import { hardhat } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const config = createConfig({
  chains: [hardhat],
  connectors: [injected()],
  ssr: true,
  transports: {
    [hardhat.id]: http()
  }
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
