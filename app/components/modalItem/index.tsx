import { useItemsListContext } from "@/app/context/itemsContext";
import { parseBigInt } from "@/utils/price";
import Image from "next/image";
import {
  useSendTransaction,
  useWaitForTransactionReceipt,
  type BaseError
} from "wagmi";

const ModalItem = () => {
  const { selectedItem } = useItemsListContext();
  const {
    data: hash,
    error,
    isPending,
    sendTransaction
  } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash
    });

  if (!selectedItem) return <div>Error</div>;

  const { image, name, cost } = selectedItem;

  const handleBuy = async () => {
    sendTransaction({
      to: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      value: BigInt(cost)
    });
  };

  return (
    <div className="flex gap-2">
      <div className="basis-1/2 bg-[#f59e0b]">
        <Image
          src={image}
          width={500}
          height={500}
          alt={name}
          priority={false}
        />
      </div>
      <div className="flex basis-1/2 flex-col justify-between h-full">
        <div className="basis-1/2 grow">
          <p>name: {name}</p>
          <p>price: {parseBigInt(cost)} ETH</p>
        </div>
        <div className="basis-1/2">
          <button
            className="btn btn-secondary"
            disabled={isPending}
            onClick={handleBuy}
          >
            {isPending ? "Confirming..." : "Buy"}
          </button>
        </div>
      </div>
      <div>
        {hash && <div>Transaction Hash: {hash}</div>}
        {isConfirming && <div>Waiting for confirmation...</div>}
        {isConfirmed && <div>Transaction confirmed.</div>}
        {error && (
          <div>Error: {(error as BaseError).shortMessage || error.message}</div>
        )}
      </div>
    </div>
  );
};

export default ModalItem;
