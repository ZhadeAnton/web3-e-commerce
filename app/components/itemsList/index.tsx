import { IItem } from "@/types/itemTypes";
import useReadContractFunction from "@/app/hooks/useReadContractFunction";
import Item from "../item";

const ItemsList = () => {
  const { data, isLoading, error } = useReadContractFunction("getListItems");
  const listItems = data as IItem[];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ul className="flex flex-wrap gap-5">
      {listItems.map((item) => (
        <li key={item.id}>
          <Item {...item} />
        </li>
      ))}
    </ul>
  );
};

export default ItemsList;
