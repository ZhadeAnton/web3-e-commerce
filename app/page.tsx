"use client";

import { useAccount, useDisconnect, useReadContract } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import commerceABI from "../abis/commerceABI.json";

function App() {
  const account = useAccount();
  const { disconnect } = useDisconnect();

  const result = useReadContract({
    ...commerceABI,
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    functionName: "getName"
  });

  console.log("result", result.data);

  return (
    <>
      <div>
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <div className="indicator">
              {account.isConnected && (
                <span className="indicator-item badge badge-primary"></span>
              )}
              <a className="h2 text-xl">Damazon</a>
            </div>
          </div>
          <div className="flex-none">
            <ConnectButton showBalance={false} accountStatus="full" />
            {account.isConnected && (
              <button
                type="button"
                className="btn btn-primary ml-4"
                onClick={() => disconnect()}
              >
                Disconnect
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
