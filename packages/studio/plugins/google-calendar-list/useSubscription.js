import React from "react";
import client from "part:@sanity/base/client";

const useSubscription = (query, params) => {
  const [state, dispatch] = React.useReducer(reducer, { items: null, error: null });

  React.useEffect(
    () => {
      const options = {
        events: ['welcome', 'mutation'],
        includeResult: true,
        visibility: 'query'
      };

      const subscription = client
        .listen(query, params, options)
        .subscribe({
          next: handleUpdate,
          error: error => dispatch([ 'ERROR', error ])
        });

      async function handleUpdate({ type, ...update }) {
        if (type === 'welcome') {
          try {
            const items = await client.fetch(query, params);
            return dispatch([ 'MUTATION', items ]);
          } catch (error) {
            console.error("Couldn't fetch documents:", error);
          }
        }

        if (type === 'mutation') {
          let items = []
          if (update.result) {
            items = Array.isArray(update.result) ? update.result : [ update.result ];
          }
          return dispatch([ 'MUTATION', items ]);
        }

        console.log(`Unhandled subscription event: "${type}"`, update);
      }

      return () => {
        subscription.unsubscribe();
      }
    },
    [query, params]
  );

  return state;
}

function reducer(state, [type, payload]) {
  switch (type) {
    case 'MUTATION': {
      return { ...state, items: payload }
    }
    case 'ERROR': {
      return { ...state, error: payload }
    }
    default: {
      return state;
    }
  }
}

export default useSubscription;
