import { useItemsListContext } from "@/app/context/itemsContext";
import { parseBigInt } from "@/utils/price";
import Image from "next/image";
import { useBuyTransactionContext } from "@/app/context/transactionContext";
import Transaction from "../transaction";

const ModalItem = () => {
  const { selectedItem } = useItemsListContext();
  const { hash, isPending, isConfirming, isConfirmed, handleTransaction } =
    useBuyTransactionContext();

  if (!selectedItem) return <div>Error</div>;

  const { image, name, cost } = selectedItem;

  const handleBuy = () => {
    handleTransaction(cost);
  };

  if (isConfirmed) {
    return (
      <div className="flex flex-col ">
        <Transaction hash={hash} isConfirmed={isConfirmed} />
      </div>
    );
  }

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
    </div>
  );
};

export default ModalItem;
