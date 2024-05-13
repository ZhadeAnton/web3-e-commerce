import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState
} from "react";

interface IItemsListProvider {
  isSelected: boolean;
  selectedItemId: number | null;
  selectItem: (id: number) => void;
  handleClearSelectedItem: () => void;
}

const ItemsListProviderContext = createContext<IItemsListProvider>({
  isSelected: false,
  selectedItemId: null,
  selectItem: () => {},
  handleClearSelectedItem: () => {}
});

export function ItemsListProvider({ children }: PropsWithChildren) {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const handleClearSelectedItem = useCallback(() => {
    setSelectedItemId(null);
  }, []);

  return (
    <ItemsListProviderContext.Provider
      value={{
        isSelected: !!selectedItemId,
        selectedItemId,
        selectItem: setSelectedItemId,
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
