import React from "react";
import ShopifyClient from "shopify-buy";
import cookie from "js-cookie";

import formatPrice from '../utils/formatPrice'

const SHOPIFY_CHECKOUT_STORAGE_KEY = "shopify_checkout_id";

const client = ShopifyClient.buildClient({
  storefrontAccessToken: process.env.GATSBY_SHOPIFY_TOKEN,
  domain: process.env.GATSBY_SHOPIFY_STORE,
});

const initialStoreState = {
  client,
  isAdding: false,
  cartIsOpen: false,
  page: undefined,
  customerEmail: undefined,
  customerName: undefined,
  customerToken: undefined,
  orders: [],
  navIsOpen: false,
  checkout: {
    lineItems: [],
  },
};

const StoreContext = React.createContext({
  store: initialStoreState,
  setStore: () => null,
});

const createNewCheckout = store => {
  return store.client.checkout.create();
};

const fetchCheckout = (store, id) => {
  return store.client.checkout.fetch(id);
};

const setCheckoutInState = (checkout, setStore) => {
  const isBrowser = typeof window !== "undefined";
  if (isBrowser) {
    localStorage.setItem(SHOPIFY_CHECKOUT_STORAGE_KEY, checkout.id);
  }

  setStore(prevState => {
    return { ...prevState, checkout };
  });
};

const initCustomer = setStore => {
  const customerEmail = cookie.get("customer_email");
  const customerToken = cookie.get("customer_token");
  const customerName = cookie.get("customer_firstName");

  if (customerEmail && customerToken && customerName) {
    setStore(prevState => {
      return { ...prevState, customerEmail, customerToken, customerName };
    });
  }
};

const StoreContextProvider = ({ children }) => {
  const [store, setStore] = React.useState(initialStoreState);
  const [isInitialized, setInitialized] = React.useState(false);

  React.useEffect(() => {
    if (isInitialized === false) {
      const initializeCheckout = async () => {
        // Check for an existing cart.
        const isBrowser = typeof window !== "undefined";
        const existingCheckoutId = isBrowser
          ? localStorage.getItem(SHOPIFY_CHECKOUT_STORAGE_KEY)
          : null;

        if (existingCheckoutId) {
          try {
            const checkout = await fetchCheckout(store, existingCheckoutId);
            if (!checkout.completedAt) {
              return setCheckoutInState(checkout, setStore);
            }
          } catch (e) {
            localStorage.setItem(SHOPIFY_CHECKOUT_STORAGE_KEY, null);
          }
        }

        const newCheckout = await createNewCheckout(store);
        return setCheckoutInState(newCheckout, setStore);
      };
      initCustomer(setStore);
      initializeCheckout().then(setInitialized(true));
    }
  }, [store, setStore, store.client.checkout, isInitialized]);

  console.log("StoreContextProvider render");

  return (
    <StoreContext.Provider
      value={{
        store,
        setStore,
        isInitialized,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

function useStore() {
  const { store } = React.useContext(StoreContext);
  return store;
}

function useCartCount() {
  const {
    store: { checkout },
  } = React.useContext(StoreContext);

  let count = 0;
  if (checkout.lineItems) {
    count = checkout.lineItems.reduce(
      (runningTotal, item) => item.quantity + runningTotal,
      0
    );
  }

  return count;
}

const useSetCustomerInState = () => {
  const { setStore } = React.useContext(StoreContext);

  async function updateCustomerInState() {
    const customerEmail = cookie.get("customer_email");
    const customerToken = cookie.get("customer_token");
    const customerName = cookie.get("customer_firstName");
    setStore(prevState => {
      return { ...prevState, customerEmail, customerToken, customerName };
    });
  }

  return updateCustomerInState;
};

function useCartTotals() {
  const {
    store: { checkout },
  } = React.useContext(StoreContext);

  const { subtotalPriceV2, totalTaxV2, totalPriceV2 } = checkout

  const totals = {
    subtotal: subtotalPriceV2 ? formatPrice(subtotalPriceV2) : '-',
    tax: totalTaxV2 ? formatPrice(totalTaxV2) : '-',
    total: totalPriceV2 ? formatPrice(totalPriceV2) : '-',
  }

  return totals;
}

function useCartItems() {
  const {
    store: { checkout },
  } = React.useContext(StoreContext);

  return checkout.lineItems;
}

function useCustomer() {
  const {
    store: { customerEmail, customerName, customerToken },
  } = React.useContext(StoreContext);

  return { customerEmail, customerName, customerToken };
}

function useAddItemToCart() {
  const {
    store: { checkout, client },
    setStore,
  } = React.useContext(StoreContext);

  async function addItemToCart(variantId, quantity, attributes) {
    if (variantId === "" || !quantity) {
      console.error("Both an id and quantity are required.");
      return;
    }

    setStore(prevState => {
      return { ...prevState, isAdding: true };
    });

    const checkoutId = checkout.id;
    const lineItemsToAdd = [
      { variantId, quantity, customAttributes: attributes },
    ];

    const newCheckout = await client.checkout.addLineItems(
      checkoutId,
      lineItemsToAdd
    );

    setStore(prevState => {
      return {
        ...prevState,
        checkout: newCheckout,
        cartIsOpen: true,
        isAdding: false,
      };
    });
  }

  return addItemToCart;
}

function useRemoveItemFromCart() {
  const {
    store: { checkout },
    setStore,
  } = React.useContext(StoreContext);

  async function removeItemFromCart(itemId) {
    const newCheckout = await client.checkout.removeLineItems(checkout.id, [
      itemId,
    ]);

    setStore(prevState => {
      return { ...prevState, checkout: newCheckout };
    });
  }

  return removeItemFromCart;
}

function useUpdateItemsFromCart() {
  const {
    store: { checkout },
    setStore,
  } = React.useContext(StoreContext);

  async function updateItemsFromCart(items) {
    items = [].concat(items);
    const newCheckout = await client.checkout.updateLineItems(
      checkout.id,
      items
    );

    setStore(prevState => {
      return { ...prevState, checkout: newCheckout };
    });
  }

  return updateItemsFromCart;
}

function useCheckout() {
  const {
    store: { checkout },
  } = React.useContext(StoreContext);

  return () => {
    window.open(checkout.webUrl);
  };
}

function useSetPage() {
  const { setStore } = React.useContext(StoreContext);
  async function setPage(page) {
    setStore(prevState => {
      return { ...prevState, page };
    });
  }
  return setPage;
}

function useToggleCart() {
  const {
    store: { cartIsOpen },
    setStore,
  } = React.useContext(StoreContext);

  async function toggleCart() {
    setStore(prevState => {
      return { ...prevState, cartIsOpen: !cartIsOpen };
    });
  }

  return toggleCart;
}

function useCheckoutStatus() {
  const { isInitialized } = React.useContext(StoreContext);

  return {
    isInitialized
  };
}

export {
  client,
  StoreContextProvider,
  useSetCustomerInState,
  useAddItemToCart,
  useStore,
  useCustomer,
  useCartCount,
  useCartItems,
  useCartTotals,
  useSetPage,
  useRemoveItemFromCart,
  useUpdateItemsFromCart,
  useCheckout,
  useCheckoutStatus,
  useToggleCart,
};
