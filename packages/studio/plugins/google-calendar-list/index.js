import React from "react";
import client from "part:@sanity/base/client";
import Button from "part:@sanity/components/buttons/default";
import { List, Item } from "part:@sanity/components/lists/default";

import styles from "./styles.css";

const appToken = process.env.SANITY_STUDIO_APP_TOKEN;

const Widget = ({ displayProperties }) => {
  const [calendars, setCalendars] = React.useState([]);

  React.useEffect(() => {
    const query = "*[_type==$type]";
    const params = { type: "calendar" };

    client.fetch(query, params).then(setCalendars).catch(console.error);

    const subscription = client.listen(query, params).subscribe(update => {
      setCalendars(update.result);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setCalendars]);

  const registerNotificationChannel = obj => {
    fetch(
      "https://johnnymoses.netlify.app/.netlify/functions/google-calendar/create-notification-channel",
      {
        method: "POST",
        headers: {
          "X-Johnnymoses-App-Token": appToken,
        },
        body: JSON.serialize(obj),
      }
    )
      .then(response => {
        console.log(response);
      })
      .catch(console.error);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>Calendars</h2>
      </header>
      <div className={styles.content}>
        <List>
          {calendars.map(obj => (
            <Item key={obj._id}>
              <div>{obj.calendarId}</div>
              <pre>
                <code>
                  {displayProperties
                    .map(prop => `${prop}: ${obj[prop]}`)
                    .join(`\n`)}
                </code>
              </pre>

              <Button>Create notification channel</Button>
            </Item>
          ))}
        </List>
      </div>
      <div className={styles.footer}></div>
    </div>
  );
};

export default {
  name: "google-calendar-list",
  component: Widget,
};
