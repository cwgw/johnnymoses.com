import React from "react";
import { List as SanityList } from "part:@sanity/components/lists/default";
import Spinner from "part:@sanity/components/loading/spinner";
import IntentButton from "part:@sanity/components/buttons/intent";

import styles from "./styles.css";
import Item from "./item";
import useSubscription from "./useSubscription";

const query = "*[_type==$type]";
const params = { type: "calendar" };

const defaultProps = {
  title: "Calendar Notification Channels",
};

const List = ({ title }) => {
  const { items, error } = useSubscription(query, params);

  // loading
  let content = <Spinner center message="Loading..." />;

  // error
  if (error) {
    content = <div>{error.message}</div>;
  }

  if (items) {
    if (items.length > 0) {
      content = (
        <SanityList>
          {items.map(item => (
            <Item key={item._id} item={item} />
          ))}
        </SanityList>
      );
    } else {
      content = <div>Couldn't fetch any calendars</div>;
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
      </header>
      <div className={styles.content}>{content}</div>
      <div className={styles.footer}>
        <IntentButton
          bleed
          color="primary"
          kind="simple"
          intent="create"
          params={params}
        >
          Create new calendar
        </IntentButton>
      </div>
    </div>
  );
};

List.defaultProps = defaultProps;

export default List;
