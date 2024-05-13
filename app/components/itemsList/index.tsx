import { useReadContract } from "wagmi";
import Item from "../item";
import commerceABI from "../../../artifacts/contracts/Commerce.sol/Commerce.json";
import { IItem } from "@/types/itemTypes";

const ItemsList = () => {
  const { data, isLoading, error } = useReadContract({
    ...commerceABI,
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    functionName: "getListItems"
  });

  const listItems = data as IItem[];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ul>
      {listItems.map((item) => (
        <li key={item.id}>
          <Item {...item} />
        </li>
      ))}
    </ul>
  );
};

export default ItemsList;
