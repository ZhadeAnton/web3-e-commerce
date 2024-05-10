"use client";

import { useAccount, useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import CommerceABI from "../abis/Commerce.json";

function App() {
  const account = useAccount();
  const { disconnect } = useDisconnect();

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
