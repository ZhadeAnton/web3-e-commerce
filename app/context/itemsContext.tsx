import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from "react";
import useReadContractFunction from "../hooks/useReadContractFunction";
import { IItem } from "@/types/itemTypes";
import { ReadContractErrorType } from "viem";

interface IItemsListProvider {
  listItems: IItem[];
  isSelected: boolean;
  isLoading: boolean;
  error: ReadContractErrorType | null;
  selectedItem: IItem | null | undefined;
  handleSelectItem: (id: number) => void;
  handleClearSelectedItem: () => void;
}

const ItemsListProviderContext = createContext<IItemsListProvider>({
  listItems: [],
  isSelected: false,
  isLoading: false,
  error: null,
  selectedItem: null,
  handleSelectItem: () => {},
  handleClearSelectedItem: () => {}
});

export function ItemsListProvider({ children }: PropsWithChildren) {
  const [selectedItem, setSelectedItemId] = useState<IItem | undefined>(
    undefined
  );
  const { data, ...rest } = useReadContractFunction("getListItems");

  const listItems = useMemo(() => {
    return data as IItem[];
  }, [data]);

  const handleSelectItem = useCallback(
    (id: number) => {
      const itemById = listItems?.find((item) => item.id === id);
      setSelectedItemId(itemById);
    },
    [listItems]
  );

  const handleClearSelectedItem = useCallback(() => {
    setSelectedItemId(undefined);
  }, []);

  return (
    <ItemsListProviderContext.Provider
      value={{
        ...rest,
        listItems,
        selectedItem,
        isSelected: !!selectedItem,
        handleSelectItem,
        handleClearSelectedItem
      }}
    >
      {children}
    </ItemsListProviderContext.Provider>
  );
}

export function useItemsListContext() {
  return { ...useContext(ItemsListProviderContext) };
}
