import { useDisclosure } from "@chakra-ui/react";
import React, {
  useContext,
  createContext,
  useReducer,
  useMemo,
  useEffect,
} from "react";
import { event } from "../utils/ga";
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
          const price = calculatePrice(name, action.params.years);
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
        const price = calculatePrice(params.name, params.years);
        event("add_to_cart", {
          currency: "USD",
          value: price,
          items: {
            item_name: `${params.name.toLowerCase()}.koin`,
            price: price / params.years,
            quantity: params.years,
          },
        });
        dispatch({ type: ActionTypes.UPSERT, params });
      },
      removeItem: (params: RemoveParams) => {
        const item = state.items[params.name.toLowerCase()];
        event("remove_from_cart", {
          currency: "USD",
          value: item.price,
          items: {
            item_name: `${params.name.toLowerCase()}.koin`,
            value: item.price / item.years,
            quantity: item.years,
          },
        });
        dispatch({ type: ActionTypes.REMOVE, params });
      },
      clearItems: () => {
        dispatch({ type: ActionTypes.CLEAR });
      },
    }),
    [dispatch]
  );

  useLocalStorage("CART", state, actions.loadState);

  useEffect(() => {
    if (isCartOpen) {
      event("view_cart", {
        currency: "USD",
        value: state.totalPrice,
        items: Object.keys(state.items).map((name) => ({
          item_name: `${name}.koin`,
          price: state.items[name].price / state.items[name].years,
          quantity: state.items[name].years,
        })),
      });
    }
  }, [isCartOpen]);

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

export const calculatePrice = (name: string, years = 1) => {
  const encoder = new TextEncoder();
  const length = encoder.encode(name).length;
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
