import { useDisclosure } from "@chakra-ui/react";
import React, { useContext, createContext, useReducer } from "react";

type State = {
  items: { [key: string]: { years: number; price: number } };
  totalPrice: number;
};

enum ActionTypes {
  UPSERT = "upsert",
  REMOVE = "remove",
  CLEAR = "clear",
}
type UpsertParams = { name: string; years: number };
type RemoveParams = { name: string };
type Action =
  | { type: ActionTypes.UPSERT; params: UpsertParams }
  | { type: ActionTypes.REMOVE; params: RemoveParams }
  | { type: ActionTypes.CLEAR };

type CartContextType = {
  state: State;
  upsertItem: (params: UpsertParams) => void;
  removeItem: (params: RemoveParams) => void;
  clearItems: () => void;
  isCartOpen: boolean;
  onCartOpen: () => void;
  onCartClose: () => void;
};

export const CartContext = createContext<CartContextType>({
  state: { items: {}, totalPrice: 0 },
  upsertItem: () => {},
  removeItem: () => {},
  clearItems: () => {},
  isCartOpen: false,
  onCartOpen: () => {},
  onCartClose: () => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const {
    isOpen: isCartOpen,
    onOpen: onCartOpen,
    onClose: onCartClose,
  } = useDisclosure();
  const [state, dispatch] = useReducer(
    (state: State, action: Action) => {
      switch (action.type) {
        case ActionTypes.UPSERT:
          const price = calculatePrice(
            action.params.name.length,
            action.params.years
          );
          return {
            items: {
              ...state.items,
              [action.params.name]: {
                years: action.params.years,
                price,
              },
            },
            totalPrice:
              state.totalPrice - (state.items[action.params.name]?.price || 0) + price,
          };
        case ActionTypes.REMOVE:
          const { [action.params.name]: removed, ...items } = state.items;
          return { items, totalPrice: state.totalPrice - removed.price };
        case ActionTypes.CLEAR:
          return { items: {}, totalPrice: 0 };
      }
    },
    { items: {}, totalPrice: 0 }
  );

  const upsertItem = (params: UpsertParams) => {
    dispatch({ type: ActionTypes.UPSERT, params });
  };

  const removeItem = (params: RemoveParams) => {
    dispatch({ type: ActionTypes.REMOVE, params });
  };

  const clearItems = () => {
    dispatch({ type: ActionTypes.CLEAR });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        upsertItem,
        removeItem,
        clearItems,
        isCartOpen,
        onCartOpen,
        onCartClose,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const calculatePrice = (length: number, years = 1) => {
  if (length === 1) {
    return 1000 * years;
  }
  if (length < 4) {
    return 500 * years;
  }
  if (length < 7) {
    return 100 * years;
  }
  if (length < 11) {
    return 10 * years;
  }
  return 0;
};
