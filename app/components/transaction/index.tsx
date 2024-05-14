import { ITransactionProps } from "./types";

const Transaction = ({ hash, isConfirmed }: ITransactionProps) => {
  return (
    <div className="flex flex-col">
      {hash && <div>Transaction Hash: {hash.substring(0, 30)}...</div>}
      {isConfirmed && <div>Transaction confirmed.</div>}
      <div>
        <button className="btn btn-neutral">Close</button>
      </div>
    </div>
  );
};

export default Transaction;
