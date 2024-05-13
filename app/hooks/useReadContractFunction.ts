import { useReadContract } from "wagmi";
import commerceABI from "../../artifacts/contracts/Commerce.sol/Commerce.json";

const useReadContractFunction = (functionName: string) => {
  const result = useReadContract({
    ...commerceABI,
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    functionName
  });

  return { ...result };
};

export default useReadContractFunction;
