import { useDisclosure } from "@chakra-ui/react";
import React, { useContext, createContext, useReducer, useMemo } from "react";
import useLocalStorage from "./useLocalStorage";

type State = {
  items: { [key: string]: { years: number; price: number } };
  totalPrice: number;
};

enum ActionTypes {
  LOAD = "load",
  UPSERT = "upsert",
  REMOVE = "remove",
  CLEAR = "clear",
}
type UpsertParams = { name: string; years: number };
type RemoveParams = { name: string };
type Action =
  | { type: ActionTypes.LOAD; state: State }
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
        case ActionTypes.LOAD: {
          return action.state;
        }
        case ActionTypes.UPSERT: {
          const name = action.params.name.toLowerCase();
          const price = calculatePrice(
            name.length,
            action.params.years
          );
          return {
            items: {
              ...state.items,
              [name]: {
                years: action.params.years,
                price,
              },
            },
            totalPrice:
              state.totalPrice - (state.items[name]?.price || 0) + price,
          };
        }
        case ActionTypes.REMOVE: {
          const name = action.params.name.toLowerCase();
          const { [name]: removed, ...items } = state.items;
          return { items, totalPrice: state.totalPrice - removed.price };
        }
        case ActionTypes.CLEAR: {
          return { items: {}, totalPrice: 0 };
        }
      }
    },
    { items: {}, totalPrice: 0 }
  );

  const actions = useMemo(
    () => ({
      loadState: (state: State) => {
        dispatch({ type: ActionTypes.LOAD, state });
      },
      upsertItem: (params: UpsertParams) => {
        dispatch({ type: ActionTypes.UPSERT, params });
      },
      removeItem: (params: RemoveParams) => {
        dispatch({ type: ActionTypes.REMOVE, params });
      },
      clearItems: () => {
        dispatch({ type: ActionTypes.CLEAR });
      },
    }),
    [dispatch]
  );

  useLocalStorage("CART", state, actions.loadState);

  return (
    <CartContext.Provider
      value={{
        state,
        upsertItem: actions.upsertItem,
        removeItem: actions.removeItem,
        clearItems: actions.clearItems,
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
