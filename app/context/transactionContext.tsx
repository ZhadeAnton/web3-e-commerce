import { SendTransactionErrorType } from "@wagmi/core";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext
} from "react";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";

interface ITransactionProvider {
  hash: `0x${string}` | undefined;
  isPending: boolean;
  isConfirming: boolean;
  isConfirmed: boolean;
  error: SendTransactionErrorType | null;
  handleTransaction: (cost: string) => void;
  handleClearTransactionError: () => void;
}

const TransactionContext = createContext<ITransactionProvider>({
  hash: undefined,
  isPending: false,
  isConfirming: false,
  isConfirmed: false,
  error: null,
  handleTransaction: () => {},
  handleClearTransactionError: () => {}
});

export function TransactionProvider({ children }: PropsWithChildren) {
  const reciever = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

  const {
    data: hash,
    error,
    isPending,
    sendTransaction,
    reset
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash
    });

  const handleTransaction = useCallback(
    (cost: string) => {
      sendTransaction({
        to: reciever,
        value: BigInt(cost)
      });
    },
    [sendTransaction]
  );

  const handleClearTransactionError = useCallback(() => {
    reset();
  }, [reset]);

  return (
    <TransactionContext.Provider
      value={{
        hash,
        isConfirming,
        isConfirmed,
        isPending,
        error,
        handleTransaction,
        handleClearTransactionError
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useBuyTransactionContext() {
  return { ...useContext(TransactionContext) };
}
