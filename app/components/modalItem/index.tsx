import { useItemsListContext } from "@/app/context/itemsContext";

const ModalItem = () => {
  const { selectedItem } = useItemsListContext();

  if (!selectedItem) return <div>Error</div>;

  return <div>{selectedItem.name}</div>;
};

export default ModalItem;
