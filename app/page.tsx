"use client";

import { useAccount, useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import ItemsList from "./components/itemsList";
import Modal from "./components/modal";
import { useItemsListContext } from "./context/itemsContext";
import ModalItem from "./components/modalItem";
import Toast from "./components/toast";
import { useBuyTransactionContext } from "./context/transactionContext";

function App() {
  const account = useAccount();
  const { disconnect } = useDisconnect();
  const { isSelected, handleClearSelectedItem } = useItemsListContext();
  const { error } = useBuyTransactionContext();

  return (
    <div className="container mx-auto">
      <Modal open={isSelected} onClose={handleClearSelectedItem}>
        <ModalItem />
      </Modal>

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
      <div>
        <div className="flex-none">
          <ItemsList />
        </div>
      </div>

      {error && isSelected && <Toast text={error?.message} />}
    </div>
  );
}

export default App;
