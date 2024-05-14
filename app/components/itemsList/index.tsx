import { useItemsListContext } from "@/app/context/itemsContext";
import Item from "../item";

const ItemsList = () => {
  const { listItems, isLoading, error } = useItemsListContext();

  if (isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
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
